# -*- coding: utf-8 -*-
# @date：2023/12/29 10:16
# @Author：LiuYiJie
# @file： crawler
"""
请求代理，返回ip
"""
import aiohttp
import datetime
import asyncio
from SimplePool.log_code.log import logger


class Downloader:
    async def fetch(self, url):
        async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(ssl=False), trust_env=True) as session:
            try:
                async with session.request(method='get', url=url, proxy='', timeout=5) as response:
                    content = await response.read()
                    # content = '123456'
                    print(content)
            except Exception as e:
                logger.error(f'{url}请求出错, {e}')
                content = {'status': 1000, 'data': []}
            finally:
                return content

    async def download(self, url):
        content = await self.fetch(url)
        return content


downLoader = Downloader()
