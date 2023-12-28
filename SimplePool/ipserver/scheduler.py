# -*- coding: utf-8 -*-
# @date：2023/12/27 16:53
# @Author：LiuYiJie
# @file： scheduler

from apscheduler.schedulers.blocking import BlockingScheduler

scheduler = BlockingScheduler()


# 每个小时的22分到25分之间，每分钟会执行一次
@scheduler.scheduled_job('cron', minute='22-25')
def request_update_status():
    print('Doing job')


scheduler.start()
