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


class GetIp:
    def __init__(self):
        self._db = ProxyMongo()
        self.proxy_num = 0
        self.proxy_num_min = setting.PROXY_NUMBER_MIN

    async def ip_count(self):
        """
        判断库里的代理数量是否达到最小值,90分数以上
        :return:
        """
        condition = {"verify_success_rate": {"$gte": 90}}
        return True if await self._db.count_proxies(table=setting.MONGODB_COLL,
                                                    condition=condition) > self.proxy_num_min else False

    async def run(self):
        # 每次请求ip时,进行初始化验证
        logger.info(f'开始请求获取ip.....')
        # 获取当前所有代理商
        spiders = [cls() for cls in SpiderMeta.spiders]
        while True:
            available_count = await self.ip_count()
            if available_count:
                logger.info(f'当前库里分数90以上大于40，本次获取{self.proxy_num}条代理')
                break
            time.sleep(0.5)
            tasks = []
            for spider in spiders:
                task = asyncio.create_task(spider.run())
                tasks.append(task)
            results = await asyncio.gather(*tasks)
            for result in results:
                affect_count, inserted_ids, up_count = await self._db.add_proxy(table=setting.MONGODB_COLL, values=result)
                self.proxy_num += affect_count
