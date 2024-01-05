# -*- coding: utf-8 -*-
# @date：2023/12/27 16:53
# @Author：LiuYiJie
# @file： scheduler
"""
调度，定时执行任务
"""

import asyncio
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from SimplePool.ipserver.getip import GetIp
from SimplePool.ipserver.verifyip import VerifyProxy
from SimplePool.log_code.log import logger


def configure_scheduler():
    scheduler = AsyncIOScheduler()
    scheduler.add_job(run_VerifyProxy, 'interval', seconds=22, misfire_grace_time=1)
    scheduler.add_job(run_GetIp, 'interval', seconds=11, misfire_grace_time=2)
    return scheduler


async def run_VerifyProxy():
    await VerifyProxy().run()


async def run_GetIp():
    await GetIp().run()


def start_scheduler(scheduler):
    scheduler.start()
    logger.info('Scheduler started')


async def run_forever():
    scheduler = configure_scheduler()
    start_scheduler(scheduler)
    try:
        await asyncio.Event().wait()
    except (KeyboardInterrupt, SystemExit):
        logger.info('Stopping Scheduler...')
        scheduler.shutdown()


def run_task():
    logger.info('Starting Scheduled Tasks')
    asyncio.run(run_forever())
