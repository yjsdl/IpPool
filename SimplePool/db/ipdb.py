# -*- coding: utf-8 -*-
# @date：2023/12/25 16:01
# @Author：LiuYiJie
# @file： ipdb
"""
对ip库里面的代理进行操作
"""
from SimplePool.db.redisdb import AsyncRedisDB
from SimplePool import setting


class ProxyOperate(AsyncRedisDB):
    def __init__(self):
        super(ProxyOperate, self).__init__()
        self._init_score = setting.PROXY_DETECTION_INIT
        self._max_score = setting.PROXY_DETECTION_MAX
        self._min_score = setting.PROXY_DETECTION_MIN

    async def add_proxy(self, table: str, proxy):
        """
        判断库里是否有当前ip，有，不增加，
        新增一个代理，并赋给一个初始化分数，防止获取代理后，不能使用，却还是获取了
        :param table: 表名
        :param proxy:代理ip
        :return:
        """
        return await self.zadd(table=table, values=proxy, scores=self._init_score)

    async def reduce_proxy_score(self, table, proxy):
        """
        验证库里的ip是否可用，可用加1
        :param table:
        :param proxy:
        :return:
        """
        # 判断分数是否操超过100，超过100不增加分数
        if isinstance(proxy, list):
            for one in proxy:
                score = await self.zscore()
        return await self.zincrby(table=table, values=proxy, scores=1)

    async def increase_proxy_score(self, table, proxy):
        """
        验证库里的ip是否可用，不可用减一
        :param table:
        :param proxy:
        :return:
        """
        return await self.zincrby(table=table, values=proxy, scores=-1)

