# -*- coding: utf-8 -*-
# @date：2023/12/20 16:12
# @Author：LiuYiJie
# @file： verifyip
import aiohttp
import asyncio
import datetime
from SimplePool.db.ipdb import ProxyMongo
import SimplePool.setting as setting
from SimplePool.log_code.log import logger
from typing import Union, List


class VerifyProxy:
    def __init__(self):
        self._db = ProxyMongo()
        self.concurrency = 1
        self.semaphore = asyncio.Semaphore(value=self.concurrency)

    async def fetch(self, proxies: dict):
        async with self.semaphore:
            proxy = proxies['_id']
            async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(ssl=False), trust_env=True) as session:
                try:
                    async with session.request('get', url=setting.VERIFY_BASE_URL, proxy='', timeout=3) as response:
                        res = await response.read()
                        res = {'status': 200, 'host': '49.68.68.197', 'port': ''}
                except Exception as e:
                    logger.info(f'{proxy}, {e}')
                    res = {'status': 400, 'host': '', 'port': ''}
                finally:
                    return await self.parse(proxies, res)

    async def change_proxy_message(self, proxies, success: bool = True) -> dict:
        if success:
            proxies['verify_num'] = proxies['verify_num'] + 1
            proxies['verify_success_num'] = proxies['verify_success_num'] + 1
            proxies['verify_success_rate'] = (proxies['verify_success_num'] / proxies['verify_num']) * 100
            proxies['update_time'] = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            return proxies
        else:
            proxies['verify_num'] = proxies['verify_num'] + 1
            proxies['verify_error_num'] = proxies['verify_error_num'] + 1
            proxies['verify_success_rate'] = (proxies['verify_success_num'] / proxies['verify_num']) * 100
            proxies['update_time'] = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            return proxies

    async def parse(self, proxies, response):
        # 请求成功不代理ip可用，还需判断ip是否相同,ip相同验证成功
        if response.get('status', '') == 200:
            if response.get('host') in proxies['_id']:
                # 验证成功，更新次数
                ver_proxies = await self.change_proxy_message(proxies, success=True)
                res_score = await self._db.update_proxy(table='IPss', value=ver_proxies)
                logger.info(f'{proxies}验证成功')
                return res_score
            else:
                # 验证失败，更新次数
                ver_proxies = await self.change_proxy_message(proxies, success=False)
                res_score = await self._db.update_proxy(table='IPss', value=ver_proxies)
                logger.info(f'{proxies}验证error')
                return res_score
        else:
            # 验证失败，更新次数
            ver_proxies = await self.change_proxy_message(proxies, success=False)
            res_score = await self._db.update_proxy(table='IPss', value=ver_proxies)
            logger.info(f'{proxies}验证error')
            return res_score

    async def init_run(self, proxies: Union[List[dict], dict]):
        """
        初始化获取代理进行验证,单个代理进行验证，不从库里取代理
        :return:
        """
        loop = asyncio.get_event_loop()

        if isinstance(proxies, list):
            tasks = []
            for proxy in proxies:
                task = asyncio.create_task(self.fetch(proxy))
                tasks.append(task)
            loop.run_until_complete(asyncio.gather(*tasks))
        else:
            await self.fetch(proxies)

    async def run(self):
        # 验证所有代理
        logger.info('start verify proxy......')
        # 获取库里所有代理
        all_proxies = await self._db.get_proxies(table='IPss')
        tasks = []
        for proxy in all_proxies:
            task = asyncio.create_task(self.fetch(proxy))
            tasks.append(task)
        await asyncio.gather(*tasks)
        # 执行完成后，删除分数小于最小分数的代理
        # await self._db.clear_proxies(table='IPss')

    def main(self):
        loop = asyncio.get_event_loop()
        loop.run_until_complete(self.run())


VerifyIp = VerifyProxy()
# VerifyIp.main()
