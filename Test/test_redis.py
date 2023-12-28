# -*- coding: utf-8 -*-
# @date：2023/12/20 11:28
# @Author：LiuYiJie
# @file： test_redis
import asyncio
import json

from SimplePool.db.ipdb import ProxyMongo
from SimplePool.log_code.log import logger
import datetime


async def test():
    c = ProxyMongo()
    proxies = list()

    response = {
        "code": 0,
        "success": True,
        "msg": "0",
        "data": [
            {
                "ip": "49.68.68.197",
                "port": 6666,
                "expire_time": "2019-05-24 08:58:31",
                "city": "徐州市",
                "isp": "电信"
            },
            {
                "ip": "58.218.201.108",
                "port": 6666,
                "expire_time": "2019-05-24 08:55:31",
                "city": "苏州市",
                "isp": "电信",
                "outip": "219.136.47.161",
            }
        ]
    }
    data = response['data']
    for one in data:
        proxy = f"{one['ip']}:{one['port']}"
        detail = {'_id': proxy, 'city': one.get('city', ''), 'isp': one.get('isp', ''), 'verify_num': 0,
                  'verify_success_rate': 0, 'verify_success_num': 0,'verify_error_num': 0,
                  'create_time': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                  'update_time': '',
                  'expire_time': one.get('expire_time', '')}
        res = await c.update_proxy('IPss', detail)
        # proxies.append(detail)
    # print(proxies)

    # res = await c.add_proxy('IPss', proxies)


    # res = await c.increase_proxy_score('IPss', ['4444','5555','6666'])
    # res = await c.update_batch('IPss', condition={'_id': '58.218.201.108:55556'}, datas=proxies[0])
    # res = await c.clear_proxies('IPss')
    # res = await c.count_score_proxies('IPss',score_min=96, score_max=96)
    # res = await c.get_proxies('IPss', limit=1)
    print(res)


#
loop = asyncio.get_event_loop()
loop.run_until_complete(test())

import aioredis  # 导入redis模块，通过python操作redis 也可以直接在redis主机的服务端操作缓存数据库

# r = aioredis.StrictRedis(host='localhost', port=6379, decode_responses=True)   # host是redis主机，需要redis服务端和客户端都启动 redis默认端口是6379

# data = {'city': '苏州市', 'isp': '电信', 'create_time': '2023-12-28 11:28:36', 'expire_time': '2019-05-24 08:55:31'}
# data = {'58.218.201.108:2690': {'city': '苏州市', 'isp': '电信', 'create_time': '2023-12-28 11:28:36', 'expire_time': '2019-05-24 08:55:31'}}
# data_str = json.dumps(data)


# await r.hset('data', '58.218.201.108:2690', data_str)
# print(r.hgetall('data').keys())
# print(type(r.hgetall('data').keys()))
# r.set('name', 'junxi')  # key是"foo" value是"bar" 将键值对存入redis缓存
# print(r['name'])
# print(r.get('name'))  # 取出键name对应的值
# print(type(r.get('name')))
