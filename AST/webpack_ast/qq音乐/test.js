window = this;
navigator = {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
};
window.navigator = navigator;
location = {
    host: 'y.qq.com'
};
window.location = location;
let n = require('./webpack_out');
let o = n('350').default;
let data = `{"comm":{"cv":4747474,"ct":24,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"yqq.json","needNewCode":1,"uin":0,"g_tk_new_20200303":5381,"g_tk":5381},"req_1":{"method":"GetCommentCount","module":"GlobalComment.GlobalCommentReadServer","param":{"request_list":[{"biz_type":1,"biz_id":"336542568","biz_sub_type":0}]}},"req_2":{"module":"music.globalComment.CommentReadServer","method":"GetNewCommentList","param":{"BizType":1,"BizId":"336542568","LastCommentSeqNo":"","PageSize":25,"PageNum":0,"FromCommentId":"","WithHot":1}},"req_3":{"module":"music.globalComment.CommentReadServer","method":"GetHotCommentList","param":{"BizType":1,"BizId":"336542568","LastCommentSeqNo":"","PageSize":15,"PageNum":0,"HotType":2,"WithAirborne":1}}}`;
console.log(data);
console.log(o(data));
