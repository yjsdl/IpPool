# -*- coding: utf-8 -*-
# @date：2023/12/28 17:41
# @Author：LiuYiJie
# @file： agent_store
"""
爬虫模块，用力增加代理商获取ip
"""
import random

from SimplePool.ipserver.crawler import downLoader
import datetime


class SpiderMeta(type):
    """
    爬虫元类，后续所有不同的代理都要继承此类
    """
    spiders = list()

    def __new__(mcs, *args, **kwargs):
        """
        子类构造
        :param args: args[0]=name. args[1]=bases, args[2]=attrs
        :param kwargs:
        """
        if not args[2].get('run', ''):
            raise ValueError(f'当前{args[0]}类无run方法， 请实现')
        new_cls = super().__new__(mcs, *args, **kwargs)
        SpiderMeta.spiders.append(new_cls)
        return new_cls


class ZhiMaSpider(metaclass=SpiderMeta):
    start_url = 'https://icanhazip.com/'
    source_name = '芝麻代理'

    async def run(self):
        content = await downLoader.download(self.start_url)
        proxies = list()
        data = [
            {
                "ip": "49.68.68.197",
                "port": random.randint(1111, 6000),
                "expire_time": "2019-05-24 08:58:31",
                "city": "徐州市",
                "isp": "电信"
            },
            {
                "ip": "58.218.201.108",
                "port": random.randint(1111, 6000),
                "expire_time": "2019-05-24 08:55:31",
                "city": "苏州市",
                "isp": "电信",
                "outip": "219.136.47.161",
            }
        ]
        # data = content['data']
        for one in data:
            proxy = f"{one['ip']}:{one['port']}"
            detail = {'_id': proxy, 'city': one.get('city', ''), 'isp': one.get('isp', ''), 'verify_num': 0,
                      'verify_success_rate': 0, 'verify_success_num': 0, 'verify_error_num': 0,
                      'create_time': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                      'verify_time': '', "next_verify_time": "", 'expire_time': one.get('expire_time', ''),
                      'proxy_source': self.source_name}
            proxies.append(detail)
        # 验证新获取的ip，然后入库
        return proxies


class Daili666Spider(metaclass=SpiderMeta):
    start_url = 'https://icanhazip.com/'
    source_name = '66代理'

    async def run(self):
        content = await downLoader.download(self.start_url)
        proxies = list()
        data = [
            {
                "ip": "49.68.68.197",
                "port": random.randint(1111, 6000),
                "expire_time": "2019-05-24 08:58:31",
                "city": "南京市",
                "isp": "电信"
            },
            {
                "ip": "58.218.201.108",
                "port": random.randint(1111, 6000),
                "expire_time": "2019-05-24 08:55:31",
                "city": "上海市",
                "isp": "移动",
                "outip": "219.136.47.161",
            }
        ]
        # data = content['data']
        for one in data:
            proxy = f"{one['ip']}:{one['port']}"
            detail = {'_id': proxy, 'city': one.get('city', ''), 'isp': one.get('isp', ''), 'verify_num': 0,
                      'verify_success_rate': 0, 'verify_success_num': 0, 'verify_error_num': 0,
                      'create_time': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                      'verify_time': '', "next_verify_time": "", 'expire_time': one.get('expire_time', ''),
                      'proxy_source': self.source_name}
            proxies.append(detail)
        # 验证新获取的ip，然后入库
        return proxies
#
#
# class KuaidailiSpider(metaclass=SpiderMeta):
#     start_url = 'http://www.kuaidaili.com/free/inha/{}/'
#
#     async def run(self, page_total=2):
#         # urls = [self.start_url.format(i)
#         #         for i in range(self._counter, self._counter + page_total)]
#         # self.increment(page_total)
#         ans = []
#         return self.start_url
#
#
# class XiciSpider(metaclass=SpiderMeta):
#     start_url = 'http://www.xicidaili.com/nn/{}'
#
#     async def run(self, page_total=2):
#         # urls = [self.start_url.format(i)
#         #         for i in range(self._counter, self._counter + page_total)]
#         # self.increment(page_total)
#         ans = []
#         return self.start_url


# spiders = [cls() for cls in SpiderMeta.spiders]
# for spider in spiders:
#     print(spider.run())
