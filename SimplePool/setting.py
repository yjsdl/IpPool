# -*- coding: utf-8 -*-
# @date：2023/12/18 17:01
# @Author：LiuYiJie
# @file： SETTING
"""
配置文件
"""
import os
from os.path import dirname, abspath, join
from environs import Env

env = Env()
env.read_env()

ROOT_DIR = dirname(dirname(abspath(__file__)))
LOG_DIR = join(ROOT_DIR, env.str('LOG_DIR', 'logs'))
if not os.path.exists(LOG_DIR):
    os.makedirs(LOG_DIR)

# redis配置
REDIS_HOST = env.str("REDIS_HOST", env.str('REDIS_HOST', '127.0.0.1'))
REDIS_PORT = env.int('REDIS_PORT', env.int('REDIS_PORT', 6379))
REDIS_PASSWORD = env.str('REDIS_PASSWORD', env.str('REDIS_PASSWORD', None))
REDIS_DB = env.int('REDIS_DB', env.int('REDIS_DB', 0))

# MongoDB配置
MONGODB_HOST = '127.0.0.1'
MONGODB_PORT = 27017
MONGODB_DB = 'kccompany'
MONGODB_USERNAME = None
MONGODB_PASSWORD = None
MONGODB_URL = None  # 如果需要使用密码, 需要使用url: mongodb://username:password@host:port


# proxy detection num, 代理i的分数
PROXY_DETECTION_MAX = 100
PROXY_DETECTION_MIN = 90
PROXY_DETECTION_INIT = 99

# proxy exist num 代理ip的数量
PROXY_NUMBER_MAX = 100
PROXY_NUMBER_MIN = 50

# api
API_HOST = env.str('API_HOST', '0.0.0.0')
API_PORT = env.int('API_PORT', 8080)
API_THREADED = env.bool('API_THREADED', True)


# 验证代理地址
VERIFY_BASE_URL = 'https://icanhazip.com/'
# VERIFY_BASE_URL = 'http://127.0.0.1:8000'
