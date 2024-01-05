# -*- coding: utf-8 -*-
# @date：2023/12/20 13:36
# @Author：LiuYiJie
# @file： ipapi
import uvicorn
import base64
from fastapi import FastAPI, Request, Query
from SimplePool.db.ipdb import ProxyMongo
from urllib.parse import quote


app = FastAPI()
app.debug = 'debug'



def get_conn():
    _db = ProxyMongo()
    return _db


@app.get('/')
async def index():
    return "Welcome to SimplePool"


@app.get('/getIp/v1/')
async def get_ip(num: int = 0):
    db = get_conn()
    display_name = {'_id': 1}
    res = await db.get_proxies('IPss', display_name=display_name, limit=num)
    res_ip = [ip['_id'] for ip in res]
    return res_ip


@app.get('/getAreaIp/v1/')
async def get_area(place: str = Query(...), num: int = 0):
    db = get_conn()
    condition = {'city': {"$regex": place}}
    display_name = {'_id': 1}
    res = await db.get_proxies('IPss', condition=condition, display_name=display_name, limit=num)
    res_ip = [ip['_id'] for ip in res]
    return res_ip


if __name__ == '__main__':
    uvicorn.run('ipapi:app', host='0.0.0.0', port=8080)
