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
    gitUrl varchar(1000) not null,
    type int(2) not null, -- 应用类型: { 1: 'html', 2: 'nodejs framework', 3: 'service', 4: 'egg' }
    status int(1), -- 发布状态: { 0: 未发布, 1: '发布成功', 2: '发布中', 3: '发布失败' }
    updateDt timestamp,
    log text
);

alter table project add UNIQUE nameIndex (name);

-- html
insert into project (name,gitUrl,type,status) values ('snowball','git@github.com:sorrymeika/snowball.git',1,0);
insert into project (name,gitUrl,type,status) values ('sn-cornerstore','git@github.com:sorrymeika/sn-cornerstore.git',1,0);
insert into project (name,gitUrl,type,status) values ('sn-app','git@github.com:sorrymeika/sn-app.git',1,0);
insert into project (name,gitUrl,type,status) values ('sn-project','git@github.com:sorrymeika/sn-project.git',1,0);
insert into project (name,gitUrl,type,status) values ('nuclear','git@github.com:sorrymeika/nuclear.git',1,0);
insert into project (name,gitUrl,type,status) values ('sn-pyramid','git@github.com:sorrymeika/sn-pyramid.git',1,0);
insert into project (name,gitUrl,type,status) values ('sn-trade-mngr','git@github.com:sorrymeika/sn-trade-mngr.git',1,0);
insert into project (name,gitUrl,type,status) values ('sn-seller-mngr','git@github.com:sorrymeika/sn-seller-mngr.git',1,0);
insert into project (name,gitUrl,type,status) values ('sn-admin','git@github.com:sorrymeika/sn-admin.git',1,0);
insert into project (name,gitUrl,type,status) values ('juicy','git@github.com:sorrymeika/juicy.git',1,0);
insert into project (name,gitUrl,type,status) values ('nuclear','git@github.com:sorrymeika/nuclear.git',1,0);

-- nodejs 框架
insert into project (name,gitUrl,type,status) values ('sonofs','git@github.com:sorrymeika/sonofs.git',2,0);
insert into project (name,gitUrl,type,status) values ('sonorpc','git@github.com:sorrymeika/sonorpc.git',2,0);
insert into project (name,gitUrl,type,status) values ('sonorpc-mysql','git@github.com:sorrymeika/sonorpc-mysql.git',2,0);
insert into project (name,gitUrl,type,status) values ('egg-sn-gateway','git@github.com:sorrymeika/egg-sn-gateway.git',2,0);
insert into project (name,gitUrl,type,status) values ('sn-rpc-scripts','git@github.com:sorrymeika/sn-rpc-scripts.git',2,0);
insert into project (name,gitUrl,type,status) values ('sn-sfs-scripts','git@github.com:sorrymeika/sn-sfs-scripts.git',2,0);

-- service
insert into project (name,gitUrl,type,status) values ('sn-auth','git@github.com:sorrymeika/sn-auth.git',3,0);
insert into project (name,gitUrl,type,status) values ('sn-base-serv','git@github.com:sorrymeika/sn-base-serv.git',3,0);
insert into project (name,gitUrl,type,status) values ('sn-market-serv','git@github.com:sorrymeika/sn-market-ser.git',3,0);
insert into project (name,gitUrl,type,status) values ('sn-product-serv','git@github.com:sorrymeika/sn-product-serv.git',3,0);
insert into project (name,gitUrl,type,status) values ('sn-seller-serv','git@github.com:sorrymeika/sn-seller-serv.git',3,0);
insert into project (name,gitUrl,type,status) values ('sn-trade-serv','git@github.com:sorrymeika/sn-trade-serv.git',3,0);
insert into project (name,gitUrl,type,status) values ('sn-user-serv','git@github.com:sorrymeika/sn-user-serv.git',3,0);

-- eggjs web
insert into project (name,gitUrl,type,status) values ('sn-auth-web','git@github.com:sorrymeika/sn-auth-web.git',4,0);
insert into project (name,gitUrl,type,status) values ('sn-base-web','git@github.com:sorrymeika/sn-base-web.git',4,0);
insert into project (name,gitUrl,type,status) values ('sn-file-web','git@github.com:sorrymeika/sn-file-web.git',4,0);
insert into project (name,gitUrl,type,status) values ('sn-market-web','git@github.com:sorrymeika/sn-market-web.git',4,0);
insert into project (name,gitUrl,type,status) values ('sn-seller-web','git@github.com:sorrymeika/sn-seller-web.git',4,0);
insert into project (name,gitUrl,type,status) values ('sn-trade-web','git@github.com:sorrymeika/sn-trade-web.git',4,0);
insert into project (name,gitUrl,type,status) values ('sn-user-web','git@github.com:sorrymeika/sn-user-web.git',4,0);
