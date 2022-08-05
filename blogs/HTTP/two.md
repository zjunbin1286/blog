---
title: 003 http 缓存控制
date: 2021-01-27
categories: 
 - HTTP
tags:
 - HTTP
sidebar: 'auto'
---

http 缓存控制
1. http缓存能够帮助服务器提高并发性能，很多资源不需要重复请求直接从浏览器中拿缓存
2. http 缓存分类 ：强缓存 协商缓存
3. 强缓存通过  expires 和 cache-control控制  协商缓存  通过  last-Modify  和E-tag控制

补充：
    1. 为什么有expires 有需要cache-control 
        因为expires 有个服务器和浏览器时间不同步的问题
        expires是绝对事件   cache-control是相对时间

    2. last-modify和Etag
       last-modify 它是有个精度问题  到秒
       e-tag 没有精度问题  只要文件改变  e-tag值就改变
