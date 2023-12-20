# -*- coding: utf-8 -*-
# @date：2023/12/20 13:58
# @Author：LiuYiJie
# @file： getip
"""
请求ip,存入redis
"""
import aiohttp
import asyncio
from SimplePool.log_code.log import logger
from SimplePool.db.redisdb import AsyncRedisDB
import SimplePool.setting as setting


class GetIp:
    def __init__(self):
        self.conn = AsyncRedisDB()
        self.url = setting.IP_LINK or None
        self.ip_max_count = setting.PROXY_NUMBER_MAX

    async def fetch(self, url: str = None):
        async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(ssl=False), trust_env=True) as session:
            try:
                async with session.request(method='get', url=url) as response:
                    content = await response.json()
                    return content
            except:
                pass

    async def download(self):
        logger.info('开始请求ip, 请求地址为', self.url)
        if not self.url:
            logger.error('请在配置中填入ip代理商')
        res = await self.fetch(url=self.url)
        # 等待配置测试存入redis
        # self.conn.zadd()

    async def run(self):
        logger.info('start get ip from ip agent')
        count = self.conn.scard('IPs')
        logger.info('当前库里代理ip的数量为%s' % count)


