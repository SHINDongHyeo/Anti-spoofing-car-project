insert into authority (authority_name) values ('ROLE_USER');
insert into authority (authority_name) values ('ROLE_ADMIN');
insert into authority (authority_name) values ('ROLE_SYSADMIN');

insert into account (username, password, nickname, activated , email , company , phone ) values ('root', '$2a$12$PLoR0Uw1UBW5p..bD.Knwui2pmIA.GzcSGivDrI1KZnC7gi68y3kq', 'root', 1 , 'encore@playdata' , 'PPAP' , '01052527979');
insert into account (username, password, nickname, activated , email , company , phone ) values ('유정원', '$2a$12$Z.PIgXxR9kx0zxvH4gMyVOioRc6nm0dfbBuXxPfFih4QxxZz.dtau', '유정원', 1 , 'ryujungwon@playdata' , 'PPAP' , '01079795252');

insert into parking (parkname , building , address , freetime , baserate , eleccharger , starttime , allarea , enablearea , endtime ) values ('test' , 'test' , 'test' , '2022' , 3.5 , 10 , '2022-11-06' , 100 , 10 , '2022-12-31');
insert into parking (parkname , building , address , freetime , baserate , eleccharger , starttime , allarea , enablearea , endtime ) values ('서초엔코아' , '플레이타워' , '서울특별시 서초구 효령로 인공지능로 ' , '1' , 10 , 2 , '2022-05-09' , 10 , 0 , '2022-11-11');
insert into parking (parkname , building , address , freetime , baserate , eleccharger , starttime , allarea , enablearea , endtime ) values ('독산엔코아' , '데이터타워' , '서울특별시 금천구 쿰척쿰척로 ' , '1' , 10 , 2 , '2022-05-09' , 30 , 0 , '2022-11-11');

insert into account_authority (account_id , authority_id) values (2 , 1);
insert into account_authority (account_id , authority_id) values (2 , 2);
insert into account_authority (account_id , authority_id) values (1 , 1);
insert into account_authority (account_id , authority_id) values (1 , 2);
insert into account_authority (account_id , authority_id) values (1 , 3);

insert into account_parking (account_id , parking_id) values (1,1);
insert into account_parking (account_id , parking_id) values (2,2);


insert into residentgroup (groupcode , endtime , groupname , totalprice , parking_id) values ('서초수강생AI' , '2022-11-11' , '서초인공지능수강생' , '1000' , 2 );
insert into residentgroup (groupcode , endtime , groupname , totalprice , parking_id) values ('서초수강생BG' , '2022-11-11' , '서초빅데이터수강생' , '15000' , 2 );
insert into residentgroup (groupcode , endtime , groupname , totalprice , parking_id) values ('서초임직원' , '2022-11-11' , '서초엔코아직원' , '0' , 2 );
insert into residentgroup (groupcode , endtime , groupname , totalprice , parking_id) values ('서초방문객' , '2022-11-11' , '서초방문자' , '50000' , 2 );

insert into residentgroup (groupcode , endtime , groupname , totalprice , parking_id) values ('독산수강생AI' , '2022-11-11' , '독산인공지능수강생' , '1000' , 3 );
insert into residentgroup (groupcode , endtime , groupname , totalprice , parking_id) values ('독산수강생BG' , '2022-11-11' , '독산빅데이터수강생' , '15000' , 3 );
insert into residentgroup (groupcode , endtime , groupname , totalprice , parking_id) values ('독산임직원' , '2022-11-11' , '독산엔코아직원' , '0' , 3 );
insert into residentgroup (groupcode , endtime , groupname , totalprice , parking_id) values ('독산방문객' , '2022-11-11' , '독산방문자' , '50000' , 3 );

insert into residence ( carnum ,carpicture ,enddate ,feature ,owner ,phone , resiaddress ,secondphone , startdate  , parking_id ,groupcode ) values ('01너0680','준비중입니다.' ,'2022-12-31' , '차량특징' , '김진원' , '01052527979' , '서초고시텔' , '01079795252' , '2022=11-11' , '2' , '서초수강생AI' );
insert into residence ( carnum ,carpicture ,enddate ,feature ,owner ,phone , resiaddress ,secondphone , startdate  , parking_id ,groupcode ) values ('01소0356','준비중입니다.' ,'2022-12-31' , '차량특징' , '신동혁' , '01071797979' , '동탄신도시' , '01052527979' , '2022=11-11' , '2' , '서초수강생AI' );
insert into residence ( carnum ,carpicture ,enddate ,feature ,owner ,phone , resiaddress ,secondphone , startdate  , parking_id ,groupcode ) values ('08가1183','준비중입니다.' ,'2022-12-31' , '차량특징' , '이성민' , '01079797979' , '양천구' , '01001017979' , '2022=11-11' , '2' , '서초수강생AI' );
insert into residence ( carnum ,carpicture ,enddate ,feature ,owner ,phone , resiaddress ,secondphone , startdate  , parking_id ,groupcode ) values ('11고5449','준비중입니다.' ,'2022-12-31' , '차량특징' , '유예지' , '01001017979' , '노원구' , '01012347979' , '2022=11-11' , '2' , '서초수강생AI' );
insert into residence ( carnum ,carpicture ,enddate ,feature ,owner ,phone , resiaddress ,secondphone , startdate  , parking_id ,groupcode ) values ('14너5284','준비중입니다.' ,'2022-12-31' , '차량특징' , '유정원' , '01012347979' , '서초고시텔' , '01043217979' , '2022=11-11' , '2' , '서초수강생AI' );
insert into residence ( carnum ,carpicture ,enddate ,feature ,owner ,phone , resiaddress ,secondphone , startdate  , parking_id ,groupcode ) values ('23호2740','준비중입니다.' ,'2022-12-31' , '차량특징' , '임주완' , '01043217979' , '연신내사거리가' , '01055557979' , '2022=11-11' , '2' , '서초수강생AI' );
insert into residence ( carnum ,carpicture ,enddate ,feature ,owner ,phone , resiaddress ,secondphone , startdate  , parking_id ,groupcode ) values ('24수9706','준비중입니다.' ,'2022-12-31' , '차량특징' , '김정현' , '01055557979' , '서초맞은편고시텔' , '01099995252' , '2022=11-11' , '2' , '서초수강생AI' );


