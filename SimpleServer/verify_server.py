# -*- coding: utf-8 -*-
# @date：2024/1/19 16:13
# @Author：LiuYiJie
# @file： verify_server
import uvicorn
from fastapi import FastAPI, Request, Query


app = FastAPI()
app.debug = 'debug'


@app.get('/get/')
async def index(request: Request):
    host = request.client.host
    print(request.client)
    return {"status": 200, "host": host, "success": True}


if __name__ == '__main__':
    uvicorn.run('verify_server:app', host='0.0.0.0', port=8080)