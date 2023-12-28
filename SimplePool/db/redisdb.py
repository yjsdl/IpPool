# -*- coding: utf-8 -*-
# @date：2023/12/20 9:33
# @Author：LiuYiJie
# @file： redis
import redis
import aioredis
import SimplePool.setting as setting
from typing import Union, List, Any, TypeVar

__all__ = (
    "redisDB",
    "AsyncRedisDB"
)

_RedisT = TypeVar('_RedisT', bound='RedisDB')
_AioRedisT = TypeVar('_AioRedisT', bound='AsyncRedisDB')
ZScoreT = Union[float, str]


class redisDB:
    def __init__(self, host=None, port=None, db=None, password=None):
        self.host = host or setting.REDIS_HOST
        self.port = port or setting.REDIS_PORT
        self.db = db or setting.REDIS_DB
        self.password = password or setting.REDIS_PASSWORD
        self._redis = None
        self._pool = None
        self.get_redis()

    def get_redis(self):
        self._pool = redis.ConnectionPool(
            host=self.host,
            port=self.port,
            db=self.db,
            password=self.password,
            decode_responses=True
        )
        self._redis = redis.Redis(connection_pool=self._pool, decode_responses=True)

    @property
    def redis(self) -> redis.Redis:
        return self._redis

    def hset(self, name, datas):
        """
        :param: 存储字典
        :return:
        """
        pipe = self.redis.pipeline()
        pipe.multi()
        for key, value in datas:
            pipe.hset(name, key, value)
        pipe.multi()

    def keys(self, pattern: Union[str] = '*') -> list:
        return self.redis.keys(pattern=pattern)


class AsyncRedisDB:
    """使用aioredis调用时惰性初始化"""

    def __init__(
            self,
            host=None,
            port: int = 6379,
            db: int = 0,
            password: str = None
    ):
        self._host = host or setting.REDIS_HOST
        self._port = port or setting.REDIS_PORT
        self._db = db or setting.REDIS_DB
        self._password = password or setting.REDIS_PASSWORD

        self.__redis: Union[aioredis.Redis, None] = None

    @property
    def _redis(self):
        if self.__redis is None:
            self.get_connect()
        return self.__redis

    @_redis.setter
    def _redis(self, val):
        self.__redis = val

    def get_connect(self):
        self._redis = aioredis.Redis(
            host=self._host,
            port=self._port,
            db=self._db,
            password=self._password,
            decode_responses=True
        )

    async def sadd(self, table, values) -> Union[int, None]:
        """
        使用无序set存储数据，用来去重
        :param table:
        :param values: 支持单个值或多个值
        :return: 如返回0：库中存在，返回1：入库，批量添加无返回值
        """
        if isinstance(values, list):
            pipe = self._redis.pipeline()
            pipe.multi()
            for value in values:
                await pipe.sadd(table, value)
            await pipe.execute()

        else:
            return await self._redis.sadd(table, values)

    async def hset(self, table, values):
        """
        使用hash存储数据
        :param table:
        :param values:
        :return:
        """
        return await self._redis.hset(table, mapping=values)

    async def hgetall(self, table):
        return await self._redis.hgetall(table)

    async def scard(self, table) -> int:
        """
        获取set中元素个数，类似于len
        :rtype: object
        :param table:
        :return: 集合中元素个数
        """
        return await self._redis.scard(table)

    async def zcard(self, table) -> int:
        """
        返回已排序的集合中元素数量
        :rtype: object
        :param table:
        :return: 集合中元素个数
        """
        return await self._redis.zcard(table)

    async def zcount(self, table, score_min: ZScoreT, score_max: ZScoreT) -> int:
        """
        返回有序集合中分数处于min和max直接的元素数量
        :param score_max:
        :param score_min:
        :param table:
        :return:
        """
        return await self._redis.zcount(table, min=score_min, max=score_max)

    async def sismember(self, table, value) -> bool:
        """
        判断是否是集合的成员 类似in
        :param table:
        :param value:
        :return:
        """
        return await self._redis.sismember(table, value)

    async def srem(self, table, values):
        """
        从set中指定值删除
        :param table:
        :param values:
        :return:
        """
        if isinstance(values, list):
            pipe = self._redis.pipeline()
            pipe.multi()
            for value in values:
                await pipe.srem(table, value)
        else:
            return await self._redis.srem(table, values)

    async def zadd(self, table, values, scores=0):
        """
        在table对应的有序集合中添加元素
        :param table:
        :param values:
        :param scores:
        :return:
        """
        if isinstance(values, list):
            # scores数量需要与values相等
            if not isinstance(scores, list):
                scores = [scores] * len(values)
            else:
                assert len(values) == len(scores)
            pipe = self._redis.pipeline()
            pipe.multi()
            for value, score in zip(values, scores):
                await pipe.execute_command(
                    'ZADD', table, score, value
                )
            return await pipe.execute()
        else:
            return await self._redis.execute_command(
                'ZADD', table, scores, values)

    async def zincrby(self, table, values, scores=1):
        """
        在table对应的有序集合中增加元素分数
        :param table:
        :param values:
        :param scores:
        :return:
        """
        if isinstance(values, list):
            # scores数量需要与values相等
            if not isinstance(scores, list):
                scores = [scores] * len(values)
            else:
                assert len(values) == len(scores)
            pipe = self._redis.pipeline()
            pipe.multi()
            for value, score in zip(values, scores):
                await pipe.execute_command("ZINCRBY", table, score, value)
            return await pipe.execute()
        else:
            return await self._redis.execute_command(
                'ZINCRBY', table, scores, values)

    async def zscore(self, table, values):
        if isinstance(values, list):
            # scores数量需要与values相等
            pipe = self._redis.pipeline()
            pipe.multi()
            for value in values:
                await pipe.execute_command("ZSCORE", table, value)
            return await pipe.execute()
        else:
            return await self._redis.execute_command("ZSCORE", table, values)

    async def zexists(
            self, name: str,
            values: Union[List[Any], Any]
    ) -> Union[List[bool], bool]:
        """
        判断元素是否在zset中存在，通过分数判断，如果分数存在则元素存在
        :param name:
        :param values:
        :return:
        """

        is_exists = []

        if isinstance(values, list):
            pipe = await self._redis.pipeline()
            pipe.multi()
            for value in values:
                pipe.zscore(name, value)
            score_results = await pipe.execute()

            for is_exist in score_results:
                if is_exist is not None:
                    is_exists.append(1)
                else:
                    is_exists.append(0)
        else:
            score_results = await self._redis.zscore(name, values)
            is_exists = 1 if score_results is not None else 0

        return is_exists

    async def zrange(self):
        raise NotImplemented

    async def zrem(self, name, values):
        """
        移除集合内指定元素
        :param name:
        :param values:
        :return:
        """
        if isinstance(values, list):
            await self._redis.zrem(name, *values)
        else:
            await self._redis.zrem(name, values)

    async def zremrangebyscore(
            self, name: str, score_min: ZScoreT, score_max: ZScoreT
    ) -> int:
        """
        移除指定分数区间的成员
        https://www.runoob.com/redis/sorted-sets-zremrangebyscore.html
        :param name:
        :param score_min:
        :param score_max:
        :return:
        """
        removed = await self._redis.zremrangebyscore(
            name=name, min=score_min, max=score_max
        )
        return removed

    async def zrangebyscore(
            self, name: str, score_min: ZScoreT, score_max: ZScoreT, count: int = None,
            **kwargs
    ):
        """
        返回score_min ~ score_max区间的的元素
        :param name:
        :param score_min:
        :param score_max:
        :param count: 整合start和num
        :param kwargs:
        :return:
        """
        if count is None:
            result = await self._redis.zrangebyscore(
                name, min=score_min, max=score_max,
                **kwargs
            )
        else:
            result = await self._redis.zrangebyscore(
                name, min=score_min, max=score_max, start=0, num=count,
                **kwargs
            )
        return result

    async def zrevrangebyscore(
            self, name: str, score_min: ZScoreT, score_max: ZScoreT, count: int = None,
            **kwargs
    ):
        """
        返回score_min ~ score_max区间的的元素， 和zrangebyscore相反
        :param name:
        :param score_min:最大分数
        :param score_max:最小分数
        :param count: 整合start和num
        :param kwargs:
        :return:
        """
        if count is None:
            result = await self._redis.zrevrangebyscore(
                name, min=score_max, max=score_min,
                **kwargs
            )
        else:
            result = await self._redis.zrevrangebyscore(
                name, min=score_max, max=score_min, start=0, num=count,
                **kwargs
            )
        return result

    async def zrangebyscore_set_score(
            self, name, score_min: ZScoreT, score_max: ZScoreT, new_score, count: int = None
    ) -> list:
        # 使用lua脚本， 保证操作的原子性
        lua = """
            -- local key = KEYS[1]
            local min_score = ARGV[1]
            local max_score = ARGV[2]
            local set_score = ARGV[3]
            local count = ARGV[4]

            -- 取值
            local datas = nil
            if count then
                datas = redis.call('zrangebyscore', KEYS[1], min_score, max_score, 'withscores','limit', 0, count)
            else
                datas = redis.call('zrangebyscore', KEYS[1], min_score, max_score, 'withscores')
            end

            local real_datas = {} -- 数据
            --修改优先级
            for i=1, #datas, 2 do
               local data = datas[i]
               local score = datas[i+1]

               table.insert(real_datas, data) -- 添加数据

               redis.call('zincrby', KEYS[1], set_score - score, datas[i])
            end

            return real_datas

        """
        cmd = self._redis.register_script(lua)
        if count:
            res = await cmd(keys=[name], args=[score_min, score_max, new_score, count])
        else:
            res = await cmd(keys=[name], args=[score_min, score_max, new_score])

        return res

    async def zpop(
            self, name, start: int = None, end: int = None, count: int = 1,
            desc: bool = False, remove: bool = True
    ) -> List[Any]:
        """
        按照索引范围获取name对应的有序集合的元素
        :param name: redis的key
        :param start: 有序集合索引起始位置（非分数）
        :param end: 有序集合索引结束位置（非分数），包含end，闭区间
        :param count: 获取的数量，在没有start和end参数时，由count来解构
        :param desc: 排序规则，默认按照分数从小到大排序
        :param remove: 是否移除，默认为True
        :return:
        """
        if start is None:
            start = 0
        if end is None:
            end = count - 1 if count > 0 else count
        pipe = self._redis.pipeline()
        pipe.multi()
        await pipe.zrange(name=name, start=start, end=end, desc=desc)
        if remove:
            await pipe.zremrangebyrank(name=name, min=start, max=end)
        results, count = await pipe.execute()
        return results

    async def rpush(self, table, values):
        """
        使用list存储数据
        :param table:
        :param values:
        :return:
        """
        if isinstance(values, list):
            pipe = self._redis.pipeline()
            pipe.multi()
            for value in values:
                await pipe.rpush(table, value)
            await pipe.execute()

        else:
            return await self._redis.rpush(table, values)


