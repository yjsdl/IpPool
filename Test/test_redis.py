# -*- coding: utf-8 -*-
# @date：2023/12/20 11:28
# @Author：LiuYiJie
# @file： test_redis
import asyncio
from SimplePool.db.ipdb import ProxyOperate
from SimplePool.log_code.log import logger


async def test():
    c = ProxyOperate()
    res = await c.reduce_proxy_score('IPss', ['4444','5555','6666'])
    res = await c.zrangebyscore('IPss', score_min=100, score_max=100, count=4)
    print(res)

asyncio.run(test())