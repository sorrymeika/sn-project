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

