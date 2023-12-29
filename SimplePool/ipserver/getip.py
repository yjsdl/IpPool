# -*- coding: utf-8 -*-
# @date：2023/12/20 13:58
# @Author：LiuYiJie
# @file： getip
"""
请求ip,存入redis
"""
import aiohttp
import asyncio
import datetime
import time
import json
from SimplePool.log_code.log import logger
from SimplePool.db.ipdb import ProxyMongo
import SimplePool.setting as setting
from SimplePool.ipserver.agent_store import SpiderMeta
from SimplePool.ipserver.verifyip import VerifyProxy


class GetIp:
    def __init__(self):
        self._db = ProxyMongo()
        self.VerifyIp = VerifyProxy()
        self.proxy_num_min = setting.PROXY_NUMBER_MIN

    async def ip_count(self):
        """
        判断库里的代理数量是否达到最小值,90分数以上
        :return:
        """
        condition = {"verify_success_rate": {"$gt": 90}}
        return True if await self._db.count_proxies(coll_name='IPss', condition=condition) > self.proxy_num_min else False

    async def run(self):
        # 每次请求ip时,进行初始化验证

        logger.info(f'开始请求获取ip.....')
        # 获取当前所有代理商
        spiders = [cls() for cls in SpiderMeta.spiders]
        while True:
            time.sleep(0.5)
            tasks = []
            for spider in spiders:
                task = asyncio.create_task(spider.run())
                tasks.append(task)
            results = await asyncio.gather(*tasks)
            for result in results:
                # 验证代理
                await self.VerifyIp.init_run(result)
            if await self.ip_count():
                logger.info(f'本次验证{self.VerifyIp.verify_counts}条代理, 成功{self.VerifyIp.verify_success_counts}条')
                break


c = GetIp()
loog = asyncio.get_event_loop()
loog.run_until_complete(c.run())
