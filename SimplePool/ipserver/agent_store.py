# -*- coding: utf-8 -*-
# @date：2023/12/28 17:41
# @Author：LiuYiJie
# @file： agent_store
"""
爬虫模块，用力增加代理商获取ip
"""
import random
import json
from SimplePool.ipserver.crawler import downLoader
from SimplePool.log_code.log import logger
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
    codes = {
        111: "提取链接请求太过频繁，超出限制,请在1秒后再次请求",
        113: "白名单未添加/白名单掉了,请设置为白名单！",
        114: "余额不足",
        115: "没有资源或没有符合条件的数据,请更换地区等条件重新生成api链接地址",
        116: "您的套餐今日已到达上限！",
        117: "您的套餐pack传参有误!请检测您现在的ip是否在套餐所在账户！",
        118: "您的账户异常，请联系客服！账户处于被禁用状态",
        121: "您的该套餐已经过期了！",
        401: "白名单错误/使用的IP已经过期",
        403: "客户目标网站异常，联系客服处理",
    }

    async def run(self):
        content = await downLoader.download(self.start_url)
        results_b = content.strip().decode('utf-8')
        results = json.loads(results_b)
        if results['code'] == 0:
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
            for oneIp in data:
                proxy = f"{oneIp['ip']}:{oneIp['port']}"
                detail = {'ip_id': proxy, 'city': oneIp.get('city', ''), 'isp': oneIp.get('isp', ''), 'verify_num': 0,
                          'verify_success_rate': 0, 'verify_success_num': 0, 'verify_error_num': 0,
                          'create_time': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                          'verify_time': '', "next_verify_time": "", 'expire_time': oneIp.get('expire_time', ''),
                          'proxy_source': self.source_name}
                proxies.append(detail)
            # 验证新获取的ip，然后入库
            return proxies
        else:
            logger.warning(f'提取{self.source_name}错误, 错误原因为{self.codes.get(results["code"])}')


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
            detail = {'ip_id': proxy, 'city': one.get('city', ''), 'isp': one.get('isp', ''), 'verify_num': 0,
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
