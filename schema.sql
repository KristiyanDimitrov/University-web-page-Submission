
create table comments (
  id integer primary key,
  body text not null,
  parent integer not null
);
drop table if exists images;

create table images (
    id integer primary key,
    path text not null,
    title text not null,
    category text not null
);

create table users (
    id integer primary key,
    userName text not null,
    eMail text not null,
    pass text not null,
    purpose text not null
);

