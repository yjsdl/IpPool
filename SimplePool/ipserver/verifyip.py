# -*- coding: utf-8 -*-
# @date：2023/12/20 16:12
# @Author：LiuYiJie
# @file： verifyip
import aiohttp
import asyncio
from SimplePool.db.redisdb import AsyncRedisDB
from asyncio import Queue


class VerifyProxy:
    def __init__(self):
        pass

    async def fetch(self, url: str):
        async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(ssl=False), trust_env=True) as session:
            try:
                async with session.request('get', url=url) as response:
                    res = await response.json()
                    return res
            except:
                pass

