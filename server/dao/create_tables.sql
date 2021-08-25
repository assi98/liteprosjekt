DROP TABLE IF EXISTS artikler;

create table artikler(
    id_a       int auto_increment primary key,
    navnPost   varchar(30) not null,
    postTid    timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    overskrift varchar(50) not null,
    brodtekst  longtext not null,
    bilde      varchar(256)not null,
    alt        varchar(50),
    relevanse  varchar(100) not null,
    forfatter varchar(40),
    rate int

);


DROP TABLE IF EXISTS Comment;
create table Comment(
  id_com int auto_increment primary key,
  comment varchar(256) not null,
  nickname varchar(20) not null,
  id_a int,
  FOREIGN KEY (id_a) REFERENCES artikler(id_a)
);


DROP TABLE IF EXISTS category;
create table category(
    id_c int auto_increment primary key,
    navn varchar(30) not null
);