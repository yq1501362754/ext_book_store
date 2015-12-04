drop table booktype;
drop table book;

create table booktype(
	id int(11) not null auto_increment,
	title varchar(100),
	detail varchar(100),
	primary key (id)
);

create table book(
	id int(11) not null auto_increment,
	book_name varchar(100),
	author varchar(100),
	type_id int(11),
	price float,
	brief varchar(1000),
	primary key (id)
);