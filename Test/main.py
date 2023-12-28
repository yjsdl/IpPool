# -*- coding: utf-8 -*-
# @date：2023/10/17 10:01
# @Author：LiuYiJie
# @file： main
from typing import Union
import uvicorn
from fastapi import FastAPI, Request
from pydantic import BaseModel

app = FastAPI()


@app.get('/')
async def test(request: Request):
    print(request.client.host)
    return {"host": request.client.host, 'port': request.client.port}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": f"接口id：{q}"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
