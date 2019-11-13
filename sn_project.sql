--# mysql -u root -p
--# Enter password: 12345Qwert

-- 创建用户
create user 'dev'@'localhost' identified by '12345Qwert';

-- 禁用密码过期功能
ALTER USER 'dev'@'localhost' PASSWORD EXPIRE NEVER;

-- 设置用户密码等级
ALTER USER 'dev'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345Qwert';
FLUSH PRIVILEGES;


-- 查看用户
SELECT User, Host FROM mysql.user;

-- 查看用户权限
show grants for 'dev'@'localhost';

-- 展示所有数据库
show databases;


-- 创建数据库
create database if not exists sn_project;

-- 分配权限
grant ALL on sn_project.* to 'dev'@'localhost';

-- 使用数据库
use sn_project;

create table project (
    id int(5) primary key auto_increment,
    name varchar(50) not null,
    path varchar(250) not null,
    type int(2) not null -- 项目类型: { 1: 'html', 2: 'nodejs', 3: 'java' }
);

insert into project (name,path,type) values ('snowball','/data/static/snowball',1);