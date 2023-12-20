# -*- coding: utf-8 -*-
# @date：2023/12/20 16:17
# @Author：LiuYiJie
# @file： test_getip
import requests



url = 'http://127.0.0.1:8080/get_ip/1'
res = requests.get(url)
print(res.text)