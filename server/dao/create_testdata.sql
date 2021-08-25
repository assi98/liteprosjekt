
insert into artikler(id_a, navnPost, overskrift, brodtekst, bilde, alt, relevanse, forfatter,rate)
VALUES (1 , 'Sport', 'wow','dette er en brødtekst2','https://smp.vgc.no/v2/images/01fcc442-7758-4a71-90d8-b95dfe198469?fit=crop&h=684&w=1000&s=1b2afb91bff46675e3707f13bed5d1fadbc39c1b','bildeAlt','2','Meg',2);
insert into artikler(id_a, navnPost, overskrift, brodtekst, bilde, alt, relevanse, forfatter,rate)
VALUES (2 , 'News', 'ost','dette er en brødtekst2','https://smp.vgc.no/v2/images/01fcc442-7758-4a71-90d8-b95dfe198469?fit=crop&h=684&w=1000&s=1b2afb91bff46675e3707f13bed5d1fadbc39c1b','bildealt2','1','Deg',1);


insert into category(id_c, navn) values( 6,'News');
insert into category(id_c, navn) values( 7,'Sport');


insert into Comment(id_com, comment, nickname, id_a) values(60,'Dette var en nydelig artikkel da','Nick', 2);
insert into Comment(id_com, comment, nickname, id_a) values(61,'Flere flotte artikkler','Adam', 2);

