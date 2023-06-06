drop  table despesas;
create table despesas (	
	id int not null auto_increment primary key,
    descricao varchar(200) not null,
    data date not null,
    data_efetivacao datetime null,
    valor decimal(12, 2) not null,
    valor_pago decimal(12, 2) null,
    pago int not null default 0
    );
    
insert into despesas (id, descricao, data, data_efetivacao, valor, valor_pago, pago) values (1, 'Demivee', '2023-04-17', '2023-03-08 09:23:12', 3613.53, 4259.37, false);
insert into despesas (id, descricao, data, data_efetivacao, valor, valor_pago, pago) values (2, 'Plajo', '2023-04-13', '2022-10-11 08:09:04', 3841.82, 2062.65, true);
insert into despesas (id, descricao, data, data_efetivacao, valor, valor_pago, pago) values (3, 'Devpulse', '2023-04-30', '2022-08-04 17:37:49', 902.13, 1885.65, false);
insert into despesas (id, descricao, data, data_efetivacao, valor, valor_pago, pago) values (4, 'Rhycero', '2023-01-15', '2022-08-29 21:39:24', 4491.38, 4840.25, false);
insert into despesas (id, descricao, data, data_efetivacao, valor, valor_pago, pago) values (5, 'Twitterbridge', '2023-01-12', '2022-07-01 11:15:49', 4732.82, 2694.95, false);
insert into despesas (id, descricao, data, data_efetivacao, valor, valor_pago, pago) values (6, 'Voomm', '2022-09-29', '2022-08-22 11:52:59', 4836.3, 4106.37, true);
insert into despesas (id, descricao, data, data_efetivacao, valor, valor_pago, pago) values (7, 'Meevee', '2022-09-02', '2022-06-19 13:21:22', 4400.25, 3594.63, false);
insert into despesas (id, descricao, data, data_efetivacao, valor, valor_pago, pago) values (8, 'Dynazzy', '2022-05-26', '2023-01-26 12:39:08', 3300.4, 1053.0, false);
insert into despesas (id, descricao, data, data_efetivacao, valor, valor_pago, pago) values (9, 'Fivespan', '2022-07-08', '2023-02-10 23:25:42', 1685.6, 4461.8, false);
insert into despesas (id, descricao, data, data_efetivacao, valor, valor_pago, pago) values (10, 'Gabvine', '2023-01-26', '2022-12-02 03:18:14', 256.34, 191.17, false);
insert into despesas (id, descricao, data, data_efetivacao, valor, valor_pago, pago) values (11, 'Edgeblab', '2022-10-18', '2022-09-08 17:54:01', 2265.39, 4226.35, true);
insert into despesas (id, descricao, data, data_efetivacao, valor, valor_pago, pago) values (12, 'Edgepulse', '2022-12-07', '2022-10-12 16:29:44', 4348.24, 4214.54, false);
insert into despesas (id, descricao, data, data_efetivacao, valor, valor_pago, pago) values (13, 'Flashset', '2023-04-06', '2022-11-06 18:56:01', 1948.82, 1615.76, true);
insert into despesas (id, descricao, data, data_efetivacao, valor, valor_pago, pago) values (14, 'Abatz', '2022-11-23', '2022-10-22 12:07:55', 2563.48, 1859.31, false);
insert into despesas (id, descricao, data, data_efetivacao, valor, valor_pago, pago) values (15, 'Jabbersphere', '2023-03-31', '2022-11-22 12:58:51', 1750.57, 1396.11, false);

select * from despesas;