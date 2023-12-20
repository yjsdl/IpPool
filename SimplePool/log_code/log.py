# -*- coding: utf-8 -*-
# @date：2023/12/19 13:55
# @Author：LiuYiJie
# @file： log
"""
设置日志
"""
import coloredlogs
import logging


class Logger:

    @staticmethod
    def get_Logger():
        # 生成器
        log_obj = logging.getLogger()
        log_obj.setLevel(logging.DEBUG)

        # 给处理器设置输出日志格式
        formatter = logging.Formatter(
            '%(threadName)-10s - %(asctime)s - %(module)s - %(funcName)s:line:%(lineno)d - %(levelname)s - %(message)s')

        # 打印到控制台
        level_styles = coloredlogs.DEFAULT_LEVEL_STYLES.copy()
        coloredlogs.install(level='DEBUG', level_styles=level_styles,
                            fmt='%(threadName)-10s - %(asctime)s - %(module)s - %(funcName)s:line:%(lineno)d - %(levelname)s - %(message)s')

        # 处理器, 创建文件handler
        file_handler = logging.FileHandler('log_file.log')
        file_handler.setLevel(logging.DEBUG)
        file_handler.setFormatter(formatter)
        # 记录器
        log_obj.addHandler(file_handler)
        # 移除默认StreamHandler
        log_obj.removeHandler(logging.StreamHandler())

        return log_obj


class setLog:
    __log0 = None

    @property
    def log(self):
        if self.__class__.__log0 is None:
            self.__class__.__log0 = Logger.get_Logger()
        return self.__class__.__log0

    @property
    def debug(self):
        return self.log.debug

    @property
    def info(self):
        return self.log.info

    @property
    def warning(self):
        return self.log.warning

    @property
    def error(self):
        return self.log.error

    @property
    def critical(self):
        return self.log.critical

    @property
    def exception(self):
        return self.log.exception


logger = setLog()
