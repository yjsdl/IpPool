# -*- coding: utf-8 -*-
# @date：2023/12/20 11:28
# @Author：LiuYiJie
# @file： test_redis
import asyncio
from SimplePool.db.redisdb import AsyncRedisDB
from SimplePool.log_code.log import logger


async def test():
    c = AsyncRedisDB()
    # res = await c.zadd('IPss', ['4444','5555','6666'], scores=[100, 100, 100])
    res = await c.zrangebyscore('IPss', score_min=100, score_max=100, count=4)
    print(res)

asyncio.run(test())