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
import json
from SimplePool.log_code.log import logger
from SimplePool.db.ipdb import ProxyMongo
import SimplePool.setting as setting
from SimplePool.ipserver.verifyip import VerifyIp


class GetIp:
    def __init__(self):
        self._db = ProxyMongo()
        self.url = setting.IP_LINK or 'https://icanhazip.com/'

    async def fetch(self):
        async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(ssl=False), trust_env=True) as session:
            try:
                async with session.request(method='get', url=self.url, proxy='http://127.0.0.1:1080') as response:
                    # content = await response.json()
                    content = '123456'
                    return await self.parse(content)
            except Exception as e:
                pass

    async def parse(self, response):
        proxies = list()
        data = [
            {
                "ip": "49.68.68.197",
                "port": 33220,
                "expire_time": "2019-05-24 08:58:31",
                "city": "徐州市",
                "isp": "电信"
            },
            {
                "ip": "58.218.201.108",
                "port": 2690,
                "expire_time": "2019-05-24 08:55:31",
                "city": "苏州市",
                "isp": "电信",
                "outip": "219.136.47.161",
            }
        ]
        # data = response['data']
        for one in data:
            proxy = f"{one['ip']}:{one['port']}"
            detail = {'_id': proxy, 'city': one.get('city', ''), 'isp': one.get('isp', ''), 'verify_num': 0,
                      'verify_success_rate': 0, 'verify_success_num': 0, 'verify_error_num': 0,
                      'create_time': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                      'update_time': '', 'expire_time': one.get('expire_time', ''), 'proxy_source': '芝麻'}
            proxies.append(detail)
        # 验证新获取的ip，然后入库
        await VerifyIp.init_run(proxies)

    async def run(self):
        logger.info(f'开始请求获取ip, 请求地址为{self.url}')
        if not self.url:
            logger.error('请在配置中填入ip代理商')
            raise ValueError('请在配置中填入ip代理商')
        while True:
            ip_count = await self._db.count_proxies(coll_name='IPss')
            if ip_count < setting.PROXY_NUMBER_MIN:
                await self.fetch()
            else:
                break

c = GetIp()
loog = asyncio.get_event_loop()
loog.run_until_complete(c.run())