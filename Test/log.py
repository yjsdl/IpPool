# -*- coding: utf-8 -*-
# @date：2023/12/19 17:02
# @Author：LiuYiJie
# @file： log

from nb_log import get_logger

# logger = get_logger('lalala',)   # get_logger 只有一个name是必传递的，其他的参数不是必传。
# logger = get_logger('lalala',log_filename='lalala.log',formatter_template=5,log_file_handler_type=2) # get_logger有很多其他入参可以自由定制logger。


# logger.debug(f'debug是绿色，说明是调试的，代码ok ')
# logger.info('info是天蓝色，日志正常 ')
# logger.warning('黄色yello，有警告了 ')
# logger.error('粉红色说明代码有错误 ')
# logger.critical('血红色，说明发生了严重错误 ')

# print('导入nb_log之后的print是强化版的可点击跳转的')
#
# logger = get_logger('logger_namespace',
#                     log_filename='namespace_file.log',
#                     error_log_filename='f4b_error.log')
# logger.debug('这条日志会写到文件中')
# logger.error('这条日志会写到普通文件中，同时会单独写入到错误文件中')
#
# import sys
# print(sys.path[1])