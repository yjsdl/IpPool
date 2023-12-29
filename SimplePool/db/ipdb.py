# -*- coding: utf-8 -*-
# @date：2023/12/25 16:01
# @Author：LiuYiJie
# @file： ipdb
"""
对ip库里面的代理进行操作
"""
from SimplePool.db.redisdb import AsyncRedisDB
from SimplePool.db.mongodb import AsyncMongoDB
from SimplePool import setting
from typing import Tuple, Union


class ProxyOperate(AsyncRedisDB):
    def __init__(self):
        super(ProxyOperate, self).__init__()
        self._init_score = setting.PROXY_DETECTION_INIT
        self._max_score = setting.PROXY_DETECTION_MAX
        self._min_score = setting.PROXY_DETECTION_MIN

    async def add_proxy(self, table: str, values):
        """
        判断库里是否有当前ip，有，不增加，
        新增一个代理，并赋给一个初始化分数，防止获取代理后，不能使用，却还是获取了
        :param table: 表名
        :param values:代理ip
        :return:
        """
        return await self.zadd(table=table, values=values)

    async def reduce_proxy_score(self, table, values):
        """
        验证库里的ip是否可用，可用加1
        :param table:
        :param values:
        :return:
        """
        verify_list = list()
        # 判断分数是否操超过100，超过100不增加分数
        if isinstance(values, list):
            for value in values:
                score = await self.zscore(table, value)
                # 当分数小于最大分数，分数加1
                if score < self._max_score:
                    verify_list.append(value)
            return await self.zincrby(table=table, values=verify_list, scores=1)
        else:
            score = await self.zscore(table, values)
            # 当分数小于最大分数，分数加1
            if score < self._max_score:
                return await self.zincrby(table=table, values=values, scores=1)

    async def increase_proxy_score(self, table, values):
        """
        验证库里的ip是否可用，不可用减一
        :param table:
        :param values:
        :return:
        """
        # 判断分数是否小于最小分数，小于最小分数不在减少
        verify_list = list()
        if isinstance(values, list):
            for value in values:
                score = await self.zscore(table, value)
                # 当分数小于等于最大分数，大于等于最小分数，分数减1
                if self._min_score <= score <= self._max_score:
                    verify_list.append(value)
            return await self.zincrby(table=table, values=verify_list, scores=-1)
        else:
            score = await self.zscore(table, values)
            # 当分数小于等于最大分数，大于等于最小分数，分数减1
            if self._min_score <= score <= self._max_score:
                return await self.zincrby(table=table, values=values, scores=-1)

    async def get_proxies(self, table, ):
        """
        返回指定数量代理，分数由高到低排序
        :param score_max: 最大分数
        :param score_min: 最小分数
        :param table: 表名
        :param count: 获取代理数量
        """
        # 首先返回分数为100的最新的代理
        return await self.hgetall(table)

    async def count_all_proxies(self, table):
        """
        返回所有代理总数
        :return 数量
        """
        return await self.zcard(table)

    async def clear_proxies(self, table):
        """
        删除分数小于最低分数的代理
        :return:
        """
        # 查询所有小于最小分数的代理
        reNum = await self.zremrangebyscore(table, score_min=80, score_max=self._min_score - 1)
        return reNum

    async def count_score_proxies(self, table, score_min=100, score_max=100) -> int:
        """
        查询min和max分数之间的元素的数量
        :param score_max:
        :param score_min:
        :param table:
        :return: 数量
        """
        return await self.zcount(table, score_min=score_min, score_max=score_max)

    async def all_proxies(self, table, score_min=90, score_max=100):
        """
        查询所有的代理
        :param table:
        :param score_min:
        :param score_max:
        :return: 所有代理
        """
        return await self.zrevrangebyscore(table, score_min=score_min, score_max=score_max)


class ProxyMongo(AsyncMongoDB):
    def __init__(self):
        super(ProxyMongo, self).__init__()

    async def add_proxy(self, table: str, values, condition: dict = None):
        """
        判断库里是否有当前ip，有，不增加，
        :param condition:
        :param table: 表名
        :param values:代理ip
        :return:返回成功插入的数量
        """
        add_num = 0
        if isinstance(values, list):
            insert_proxies = list()
            # 查询所有的代理，防止重复数据
            condition = condition or {}, {'_id': 1}
            res = await self.find(coll_name=table, condition=condition)
            for one in values:
                if one['_id'] not in res:
                    insert_proxies.append(one)
            num, inserted_ids = await self.add_batch(coll_name=table, datas=insert_proxies)
            add_num += num
        else:
            condition = {'_id': values['_id']}
            res = await self.find(coll_name=table, condition=condition)
            if not res:
                num = await self.add(coll_name=table, data=values)
                add_num += num
        return add_num

    async def update_proxy(self, table: str, value: dict):
        """
        验证完成后更新代理
        :param table:
        :param value:
        :return:
        """
        condition = {'_id': value['_id']}
        return await self.update(coll_name=table, condition=condition, data=value)

    async def get_all_proxies(self, table, condition: dict = None, limit: int = 0):
        """
        查询所有代理用来验证
        :param limit: 结果数量
        :param table:
        :param condition: 条件
        :return:
        """
        return await self.find(coll_name=table, condition=condition, limit=limit)

    async def get_proxies(self, table, condition: Union[Tuple, dict] = None, limit: int = 1):
        """
        返回可用代理,
        :param table:
        :param condition: 根据条件查询，成功率，地区，时间
        :param limit:
        :return:
        """
        # 默认，随机返回一条成功率90以上的
        if not condition:
            condition = {"verify_success_rate": {"$gt": 101}}
            # 使用聚合管道来进行随机抽样
            limit = limit or 1
            pipeline = [
                {'$match': condition},
                {"$sample": {"size": limit}}
            ]
            results = await self.find_condition(coll_name=table, pipeline=pipeline, limit=limit)
        # 有条件，默认返回符合条件的
        else:
            condition = {"$and": [condition, {"verify_success_rate": {"$gt": 101}}]}
            limit = limit or 1
            pipeline = [
                {'$match': condition},
                {"$sample": {"size": limit}}
            ]
            results = await self.find_condition(coll_name=table, pipeline=pipeline, limit=limit)
        # 啥都没有，随便返回一条
        if results:

            return await self.find(coll_name=table, condition=condition, limit=limit)

    async def count_proxies(self, coll_name: str, condition: dict = None) -> int:
        """
        查询当前库里有多少代理
        :param coll_name:
        :param condition:
        :return:
        """
        condition = {} if condition is None else condition
        collection = self.get_collection(coll_name)
        count = await collection.count_documents(condition)
        return count
