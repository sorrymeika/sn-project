# sn-project
项目发布管理


# 新CentOS服务器搭建项目步骤

## 手动安装mysql

mysql5.8版本

## 手动安装redis

安装redis

## 手动安装nginx


Install the prerequisites:
```
sudo yum install yum-utils
```

To set up the yum repository, create the file named `/etc/yum.repos.d/nginx.repo` with the following contents:

```
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true

[nginx-mainline]
name=nginx mainline repo
baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
```

To install nginx, run the following command:
```
sudo yum install nginx
```
When prompted to accept the GPG key, verify that the fingerprint matches 573B FD6B 3D8F BC64 1079 A6AB ABF5 BD82 7BD9 BF62, and if so, accept it.

### nginx配置文件

```
vi /etc/nginx/nginx.conf
vi /etc/nginx/conf.d/default.conf
```

全局配置`/etc/nginx/nginx.conf`

```conf
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    gzip  on;
    gzip_min_length 1k;
    #gzip_buffers 4 16k;
    #gzip_http_version 1.0;
    gzip_comp_level 5;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript text/html application/x-httpd-php application/json;
    gzip_vary off;
    #gzip_disable "MSIE [1-6]\.";

    include /etc/nginx/conf.d/*.conf;
}
```

### 负载均衡

```conf
upstream backend {
    server 127.0.0.1:7788 weight=5;
    server 127.0.0.1:8080;
    server unix:/tmp/backend3;
}

server {
    location / {
        proxy_pass http://backend;
    }
}
```

### nignx服务管理
```
systemctl enable nginx.service
systemctl start nginx.service
systemctl stop nginx.service
systemctl restart nginx.service
systemctl status nginx.service
```

## 准备安装Git

Open Terminal.

创建新SSH key
```
$ ssh-keygen -t rsa -b 4096 -C "sorrymeika@163.com"
```

```
> Generating public/private rsa key pair.
```

直接回车，不用更改位置

```
> Enter a file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
```

直接回车，不用设置`passphrase`

```
> Enter passphrase (empty for no passphrase): [Type a passphrase]
> Enter same passphrase again: [Type passphrase again]
```

```
cat ~/.ssh/id_rsa.pub
```

进入github后台添加SSH key

## 安装Git、nvm、nodejs和pm2

```sh
#!/bin/sh

#安装github
yum install git -y

#下载nvm
git clone git@github.com:nvm-sh/nvm.git ~/nvm

#设置nvm 自动运行;
echo "source ~/nvm/nvm.sh" >> ~/.bashrc
source ~/.bashrc

#查询node版本
nvm list-remote

#安装node.js
nvm install v12.13.0

#使用nodejs
nvm use v12.13.0

#安装gcc和g++
yum -y install gcc gcc-c++

#安装pm2
npm install pm2 -g

#pm2自启
pm2 startup
systemctl enable pm2-root

```

## 启动CI项目

```sh
#!/bin/sh
mkdir /data/static
cd /data/static
git clone git@github.com:sorrymeika/snowball.git
git clone git@github.com:sorrymeika/nuclear.git
git clone git@github.com:sorrymeika/sn-cornerstore.git
git clone git@github.com:sorrymeika/sn-project.git

cd /data/static/snowball
git fetch --all
git reset --hard origin/master
git pull

cd /data/static/nuclear
git fetch --all
git reset --hard origin/master
git pull

cd /data/static/sn-cornerstore
git fetch --all
git reset --hard origin/master
git pull

cd /data/static/sn-project
git fetch --all
git reset --hard origin/master
git pull

cd /data/static/sn-project/client
npm install
npm run build

cd /data/static/sn-project/server
npm install
npm stop
npm start
```