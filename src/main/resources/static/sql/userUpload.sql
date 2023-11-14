# Oracle
create table USERIMAGE (
SEQ number primary key, 
IMAGENAME varchar2(50),
IMAGECONTENT varchar2(4000),
IMAGEFILENAME varchar2(100) not null,
IMAGEORIGINALNAME varchar2(100) not null);

create sequence SEQ_USERIMAGE nocycle nocache;

# MySQL
create table userimage (
seq int(10) primary key auto_increment, 
imageName varchar(50),
imageContent varchar(4000),
imageFileName varchar(100) not null,
imageOriginalName varchar(100) not null);

# 기존에 있는 레코드 삭제
set sql_safe_updates=0;
delete from USERIMAGE;