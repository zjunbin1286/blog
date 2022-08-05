---
title: 002 http请求的推演过程
date: 2021-01-27
categories: 
 - HTTP
tags:
 - HTTP
sidebar: 'auto'
---

http请求的推演过程
1.  url(www.baidu.com)  =>  ip  (192.168.1.2)
2. 拿到ip 去跟服务器建立 tcp 连接
3. 建立 tcp 连接之后发起 http 请求  （ tcp是比http更底层一个连接协议）（ip是tcp下面一层）
4. http连接建立之后 服务器把html 发送给浏览器
5. 浏览器解析html（js文件，css文件，图片 下载 运行）
6. 浏览器渲染html
7. 服务器关闭连接  tcp  http

一次完整的http请求过程  版本 1.0
