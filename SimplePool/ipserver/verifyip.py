# -*- coding: utf-8 -*-
# @date：2023/12/20 16:12
# @Author：LiuYiJie
# @file： verifyip
import aiohttp
import asyncio
from datetime import datetime, timedelta
from SimplePool.db.ipdb import ProxyMongo
import SimplePool.setting as setting
from SimplePool.log_code.log import logger
from typing import Union, List


class VerifyProxy:
    def __init__(self):
        self._db = ProxyMongo()
        self.concurrency = 10
        self.verify_counts = 0
        self.verify_success_counts = 0
        self.semaphore = asyncio.Semaphore(value=self.concurrency)

    async def fetch(self, proxies: dict):
        async with self.semaphore:
            proxy = proxies['ip_id']
            async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(ssl=False), trust_env=True) as session:
                try:
                    async with session.request('get', url=setting.VERIFY_BASE_URL, proxy='', timeout=3) as response:
                        res = await response.json()
                        ress = response.status
                        res = {'status': 200, 'host': '49.68.68.197', 'port': ''}
                except Exception as e:
                    logger.error(f'验证代理{proxy}失败, 失败原因为{e}')
                    res = {'status': 400, 'host': '', 'port': ''}
                finally:
                    return await self.parse(proxies, res)

    @staticmethod
    async def change_proxy_message(proxies, success: bool = True) -> dict:
        now_time = datetime.now()
        if success:
            proxies['verify_num'] = proxies['verify_num'] + 1
            proxies['verify_success_num'] = proxies['verify_success_num'] + 1
            proxies['verify_success_rate'] = float((proxies['verify_success_num'] / proxies['verify_num']) * 100)
            proxies['verify_time'] = now_time.strftime('%Y-%m-%d %H:%M:%S')
            proxies['next_verify_time'] = (now_time + timedelta(seconds=30)).strftime('%Y-%m-%d %H:%M:%S')
            return proxies
        else:
            proxies['verify_num'] = proxies['verify_num'] + 1
            proxies['verify_error_num'] = proxies['verify_error_num'] + 1
            proxies['verify_success_rate'] = float((proxies['verify_success_num'] / proxies['verify_num']) * 100)
            proxies['verify_time'] = now_time.strftime('%Y-%m-%d %H:%M:%S')
            proxies['next_verify_time'] = (now_time + timedelta(seconds=30)).strftime('%Y-%m-%d %H:%M:%S')
            return proxies

    async def parse(self, proxies, response):
        # 请求成功不代理ip可用，还需判断ip是否相同,ip相同验证成功
        if response.get('status', '') == 200:
            if response.get('host') in proxies['ip_id']:
                # 验证成功，更新次数
                ver_proxies = await self.change_proxy_message(proxies, success=True)
                res_score = await self._db.update_proxy(table=setting.MONGODB_COLL, value=ver_proxies)
                logger.info(f'{proxies}验证成功')
                self.verify_counts += 1
                self.verify_success_counts += 1
                return res_score
            else:
                # 验证失败，更新次数
                ver_proxies = await self.change_proxy_message(proxies, success=False)
                res_score = await self._db.update_proxy(table=setting.MONGODB_COLL, value=ver_proxies)
                logger.info(f'{proxies}验证error')
                self.verify_counts += 1
                return res_score
        else:
            # 验证失败，更新次数
            ver_proxies = await self.change_proxy_message(proxies, success=False)
            res_score = await self._db.update_proxy(table=setting.MONGODB_COLL, value=ver_proxies)
            logger.info(f'{proxies}验证error')
            self.verify_counts += 1
            return res_score

    async def init_run(self, proxies: Union[List[dict], dict]):
        """
        初始化获取代理进行验证,单个代理进行验证，不从库里取代理
        :return:
        """
        if isinstance(proxies, list):
            tasks = []
            for proxy in proxies:
                task = asyncio.create_task(self.fetch(proxy))
                tasks.append(task)
            await asyncio.gather(*tasks)
        else:
            await self.fetch(proxies)

    async def deal_over_proxy(self):
        """
        删除过期时间的代理
        :return:
        """
        now_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        condition = {"expire_time": {"$lte": now_time}}
        count = await self._db.delete_proxies(table=setting.MONGODB_COLL, condition=condition)
        return count

    async def run(self):
        """
        # 根据验证时间，验证所有代理
        :return:
        """
        logger.info('start verify proxy......')
        now_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        # 库里小于当前时间的代理,才开始验证
        condition = {"next_verify_time": {"$lte": now_time}}
        verify_proxies = await self._db.get_all_proxies(table=setting.MONGODB_COLL, condition=condition)
        tasks = []
        for proxy in verify_proxies:
            task = asyncio.create_task(self.fetch(proxy))
            tasks.append(task)
        await asyncio.gather(*tasks)
        delete_count = await self.deal_over_proxy()
        logger.info(f'本次验证{self.verify_counts}条代理, 成功{self.verify_success_counts}条, 本次删除{delete_count}条过期代理')