# -*- coding: utf-8 -*-
# @date：2023/12/25 16:01
# @Author：LiuYiJie
# @file： mongodb

import asyncio
from urllib import parse
from typing import Union, Tuple

from pymongo.errors import (
    DuplicateKeyError, BulkWriteError
)
from motor.motor_asyncio import (
    AsyncIOMotorClient,
    AsyncIOMotorDatabase,
    AsyncIOMotorCollection
)
import SimplePool.setting as setting
from SimplePool.log_code.log import logger


class AsyncMongoDB:
    def __init__(
            self,
            host=None,
            port=None,
            db=None,
            username=None,
            password=None,
            url=None,
            loop=None,
            **kwargs
    ):
        self._loop = loop
        if url:
            self._get_mongo(url)
        else:
            self._host = host or setting.MONGODB_HOST
            self._port = port or setting.MONGODB_PORT
            self._db = db or setting.MONGODB_DB
            self._username = username or setting.MONGODB_USERNAME
            self._password = password or setting.MONGODB_PASSWORD
            self._get_mongo()

    @classmethod
    def from_url(cls, url, **kwargs):
        """
        mongodb://username:password@host:port
        解析还是直接传呢"""
        if parse.urlparse(url).scheme != 'mongodb':
            raise ValueError('url error, please use "mongodb://username:password@host:port"')
        return cls(url=url, **kwargs)

    def _get_mongo(self, url: str = None):
        # 创建对数据库的引用不会执行I/O，不需要 await 表达式
        loop = self._loop or asyncio.get_event_loop()
        if url:
            self._clint: AsyncIOMotorClient = AsyncIOMotorClient(url, io_loop=loop)
        else:
            self._clint: AsyncIOMotorClient = AsyncIOMotorClient(self._host, self._port, io_loop=loop)
        self._db: AsyncIOMotorDatabase = self._get_database(self._db)

    def _get_database(self, database, **kwargs):
        """
        根据数据库名获取数据库对象
        :param database: 数据库名
        :param kwargs:
        :return:
        """
        return self._clint.get_database(database, **kwargs)

    def get_collection(self, coll_name) -> AsyncIOMotorCollection:
        """
        根据集合名获取集合对象
        :param coll_name: 集合名
        :return:
        """
        return self._db[coll_name]

    async def add(self, coll_name: str, data: dict):
        """
        :param coll_name: 集合名
        :param data: 单条数据 {'_id': 'xx'}
        :return: 插入影响的行数
        """
        collection = self.get_collection(coll_name)
        affect_count = None
        try:
            result = await collection.insert_one(data)
        except DuplicateKeyError as dup:
            logger.info(
                """
                error: %s
                """ % dup)
        except Exception as e:
            logger.warning('error: %s' % e)
        else:
            affect_count = 1
        return affect_count

    async def add_batch(self, coll_name: str, datas: list, replace: bool = False):
        """
        :param coll_name: 集合名
        :param datas: 多条数据 [{'_id': 'xx'}, ...]
        :param replace:
        :return: (插入影响的行数, 插入的id)
        """
        collection = self.get_collection(coll_name)
        inserted_ids = []
        affect_count = 0
        up_count = 0
        try:
            affect_count = len(datas)
            result = await collection.insert_many(datas, ordered=False)
        except DuplicateKeyError as dup:
            logger.warning(
                """
                error: %s
                """ % dup)
        except BulkWriteError as bulk_write_e:
            # 获取插入失败的代理
            write_errors = bulk_write_e.details.get('writeErrors')
            for write_error in write_errors:
                # 判断是否是因为唯一索引插入失败
                if write_error.get('code') == 11000:
                    original_doc = write_error.get('op')  # 插入的数据
                    ip_id = original_doc.get('third_id')
                    filter_query = {'ip_id': ip_id}
                    update_query = {'$set': original_doc}
                    up_result = await collection.update_one(filter=filter_query, update=update_query)
                    affect_count -= 1
                    up_count = up_result.modified_count
        except Exception as e:
            logger.error(
                """
                error: %s
                """ % e)
        else:
            inserted_ids = result.inserted_ids
            affect_count = len(inserted_ids)
        return affect_count, inserted_ids, up_count

    async def delete(self, coll_name: str, condition: dict = None):
        """
        :param coll_name: 集合名
        :param condition: 删除条件 {'i': {'$gt': 1000}}
        :return: 删除的条数
        """
        if condition is None:
            condition = {}
        collection = self.get_collection(coll_name)
        count = await collection.count_documents(condition)
        try:
            result = await collection.delete_many(condition)
        except Exception as e:
            logger.warning(
                """
                error: %s
                condition: %s
                count: %s
                """ % (e, condition, count))
            return False
        return result.deleted_count

    async def update(self, coll_name: str, data: dict, condition: dict = None, upsert: bool = True):
        """
        :param coll_name: 集合名
        :param condition: 更新条件 {'i': {'$gt': 1000}}
        :param data: 修改的值 {'$set': {'key': 'value'}}
        :param upsert: 不存在则插入
        :return: 满足条件的条数
        """
        if condition is None:
            condition = {}  # 如果条件为空将会查找所有
        collection = self.get_collection(coll_name)
        try:
            result = await collection.update_one(condition, {'$set': data}, upsert=upsert)
        except Exception as e:
            logger.warning(
                """
                error: %s
                condition: %s
                """ % (e, condition))
            return False
        return result.modified_count

    async def update_batch(self, coll_name: str, datas: dict, condition: dict = None, upsert: bool = True):
        """
        更新多条数据，如果不存在则插入
        :param coll_name:
        :param datas:
        :param condition:
        :param upsert:
        :return:
        """
        if condition is None:
            condition = {}  # 如果条件为空将会查找所有
        collection = self.get_collection(coll_name)
        try:
            result = await collection.update_many(condition, {'$set': datas}, upsert=upsert)
        except Exception as e:
            logger.warning(
                """
                error: %s
                condition: %s
                """ % (e, condition))
            return False
        return result.modified_count

    async def find(self, coll_name: str, condition: Union[Tuple, dict] = None, display_name: dict = None,
                   limit: int = 0, **kwargs):
        """
        :param display_name: 返回的字段
        :param coll_name: 集合名
        :param condition: 查询条件 {'i': {'$lt': 4}}
        :param limit: 结果数量
        :return: 插入影响的行数
        """
        condition = {} if condition is None else condition
        display_name = {} if display_name is None else display_name
        collection = self.get_collection(coll_name)
        results = []
        if limit == 1:
            results.append(await collection.find_one(condition, display_name))
            return results
        elif limit > 1:
            cursor = collection.find(condition, display_name)
            for document in await cursor.to_list(length=limit):
                results.append(document)
        else:
            find_results = collection.find(condition, display_name)
            async for document in find_results:
                results.append(document)
        return results

    async def find_condition(self, coll_name: str, condition: Union[Tuple, dict] = None, display_name: dict = None,
                             limit: int = 0, **kwargs):
        """
        :param display_name: 指定返回的字段
        :param coll_name: 集合名
        :param condition: 管道,根据条件查询，随机返回指定数量代理
        :param limit: 结果数量
        :return: 插入影响的行数
        """
        condition = {} if condition is None else condition
        displayName = {} if display_name is None else display_name
        pipeline = [
            {'$match': condition},
            {"$project": displayName},
            {"$sample": {"size": limit}}
        ]
        collection = self.get_collection(coll_name)
        results = await collection.aggregate(pipeline).to_list(limit)
        return results

    async def count(self, coll_name: str, condition: dict):
        """
        :param coll_name: 集合名
        :param condition: 查询条件 {'i': {'$gt': 1000}}
        :return: 满足条件的条数
        """
        condition = {} if condition is None else condition
        collection = self.get_collection(coll_name)
        count = await collection.count_documents(condition)
        return count

    async def command(self, command):
        return await self._db.command(command)
