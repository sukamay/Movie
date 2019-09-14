# Web_3 FilmSite 项目报告

## 1652820 罗媚 周二一二节 金伟祖老师

## 一、项目地址

[FilmSite](http://120.76.62.132/)

## 二、技术栈介绍：

### 2.1 后端框架： DjangoRestFramework

​	使用`pipenv`进行管理，方便移植，不用处理python包之间因为版本不匹配或各种原因导致的的冲突问题。

```shell
# 配置说明，其余依赖包请查看Pipfile
Django：2.1.4
python：3.6.2
```

​	使用`Django`提供的模版生成网页，数据与视图分离。使用`DjangoRestFramework`开发WebAPI。

### 2.2 web服务器：nginx+uwsgi

​	`Nginx`是一款自由的、开源的、高性能的`HTTP`服务器和反向代理服务器；同时也是一个`IMAP、POP3、SMTP`代理服务器；`Nginx`可以作为一个`HTTP`服务器进行网站的发布处理，另外`Nginx`可以作为反向代理进行负载均衡的实现。

### 2.3 数据库： MySQL

​	通过`Django`与数据库连接，不需要直接连接数据库，建表，增删改查数据都通过`Django`进行。数据库表如下，需要注意一点的是数据库的编码，因为含有中文，本数据库使用`utf8mb4`编码。

```mysql
mysql> show tables;
+----------------------------+
| Tables_in_filmDB           |
+----------------------------+
| FilmModel_cast             |
| FilmModel_director         |
| FilmModel_film             |
| FilmModel_rating           |
| FilmModel_writer           |
| auth_group                 |
| auth_group_permissions     |
| auth_permission            |
| auth_user                  |
| auth_user_groups           |
| auth_user_user_permissions |
| django_admin_log           |
| django_content_type        |
| django_migrations          |
| django_session             |
+----------------------------+
15 rows in set (0.00 sec)
```

### 2.4 前端框架：Bootstrap + jQuery

​	`css`一部分使用了`Bootstrap`，主要是用`Bootstrap`的网格系统提供响应式的网页。

## 三、实现功能：

1. 将附件`films_all.json`中的一万条数据都导入了数据库中
2. 实现了电影清单列表
   1. 电影清单展示
   2. 前十排行榜展示
   3. 电影分类展示（点击进入电影分类页面）
   4. 实现了分页功能
   5. 支持多关键词搜索
3. 实现了电影分类页面
   1. 支持多关键词搜索
   2. 支持依据选取的分类进行显示
   3. 电影信息可动态加载
4. 实现了电影详情页
5. 实现了电影排行榜（展示根据评分进行排序后的结果
6. 实现了多关键词搜索功能，搜索结果高亮显示

