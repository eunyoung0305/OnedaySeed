use onedaySeed;

create table host (
  host_num varchar(20) PRIMARY KEY,
  host_name varchar(20),
  phone_num int,
  password varchar(20),
  role varchar(255)
);

create table user(
  user_id varchar(20) PRIMARY KEY,
  user_name varchar(20),
  phone_num int,
  password varchar(20),
  role varchar(255)
);

create table cart(
  cart_id int PRIMARY KEY,
  user_id varchar(20),
  FOREIGN KEY (user_id) references user(user_id)
);

create table cart_item(
  cart_item_id int,
  cart_id int,
  lesson_id int,
  count int,
  FOREIGN KEY (cart_id) references cart (cart_id),
  FOREIGN KEY (lesson_id) references lesson (lesson_id)
);

create table order_item(
  order_item_id int PRIMARY KEY,
  lesson_id int,
  order_id int,
  count int,
  order_price int,
  FOREIGN KEY (lesson_id) references lesson (lesson_id),
  FOREIGN KEY (order_id) references orders (order_id)
);

create table orders(
  order_id int PRIMARY KEY,
  user_id varchar(20),
  payment_id varchar(20),
  order_date varchar(100),
  order_status varchar(255),
  FOREIGN KEY (user_id) references user(user_id)
);


create table lesson(
  lesson_id int PRIMARY KEY,
  host_num varchar(20),
  lesson_name varchar(20),
  lesson_category varchar(20),
  lesson_schedule varchar(20),
  price int,
  lesson_limited int,
  lesson_status varchar(255),
  lesson_rep_img varchar(255),
  lesson_detail_img varchar(255),
  FOREIGN KEY (host_num) references host(host_num)
);

-- 1. order 는 mysql에 있는 명령어 중 하나이기에 테이블 이름으로 쓸 수 없어 orders로 변경
-- 2. 테이블명, 컬럼명, 시퀀스명을 보다 명확히 구분하기 위해 보통 테이블명 앞에는 'tbl_', 시퀀스명 앞에는 'seq_' 등으로 표기해 주는 게 좋다고 함
-- ex) tbl_order
-- 3. mysql에서는 숫자를 보통 int타입으로 설정 (크기는 Long타입과 같고, varchar 처럼 크기를 지정할 수 없음)
-- 4. 수동으로 테이블을 만들 경우, orders, order_item, payment 는 서로를 참조하고 있기에 즉시 FK를 지정하여 만들 수 없음
-- 4-1. 셋 중 아무 테이블 1개만 FK 없이 생성 후 다른 테이블 생성
-- 4-2. alter table FK를 지정할 자식 테이블명 add FOREIGN KEY (FK를 지정할 컬럼명) references FK를 가져올 부모 테이블명 (컬럼명);
--       ㄴ실행!