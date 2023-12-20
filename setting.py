# -*- coding: utf-8 -*-
# @date：2023/12/18 17:01
# @Author：LiuYiJie
# @file： SETTING
"""
配置文件
"""
from os.path import dirname, abspath, join
from environs import Env

env = Env()
env.read_env()

ROOT_DIR = dirname(dirname(abspath(__file__)))
LOG_DIR = join(ROOT_DIR, env.str('LOG_DIR', 'logs'))

# redis host
REDIS_HOST = env.str("REDIS_HOST", env.str('REDIS_HOST', '127.0.0.1'))
REDIS_PORT = env.int('REDIS_PORT', env.int('REDIS_PORT', 6379))
REDIS_PASSWORD = env.str('REDIS_PASSWORD', env.str('REDIS_PASSWORD', None))
REDIS_DB = env.int('REDIS_DB', env.int('REDIS_DB', 0))

# proxy detection num
PROXY_DETECTION_MAX = 3
PROXY_DETECTION_MIN = 0
PROXY_DETECTION_INIT = 10

# proxy exist num
PROXY_NUMBER_MAX = 50
PROXY_NUMBER_MIN = 0

# api
API_HOST = env.str('API_HOST', '0.0.0.0')
API_PORT = env.int('API_PORT', 8080)
API_THREADED = env.bool('API_THREADED', True)

# ip代理商
IP_LINK = ''

