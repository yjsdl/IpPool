# -*- coding: utf-8 -*-
# @date：2023/12/20 13:36
# @Author：LiuYiJie
# @file： ipapi
import uvicorn
from fastapi import FastAPI, Request
from SimplePool.db.redisdb import AsyncRedisDB

app = FastAPI()


def get_conn():
    _redis = AsyncRedisDB()
    return _redis


@app.get('/')
async def index():
    return "Welcome to SimplePool"


@app.get('/get_ip/{num}/')
async def get_ip(num: int):
    redis = get_conn()
    res = await redis.zrangebyscore('IPss', score_min=100, score_max=100, count=num)
    return res


if __name__ == '__main__':
    uvicorn.run('ipapi:app', host='127.0.0.1', port=8080)
