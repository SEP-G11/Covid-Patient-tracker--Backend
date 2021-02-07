
-- To number of passengers travelling to a given destination

DELIMITER $$
 CREATE FUNCTION passengers_count_destination  (start_date date ,end_date date ,destination varchar(20)) 
 RETURNS INT
 DETERMINISTIC
    BEGIN 

 	declare p_count integer;    
	select count(b.user_id) into p_count
	from booking b where b.flight_id in (select f.flight_id from flight_schedule f left join route r on f.route_id=r.route_id where r.destination=destination and date BETWEEN start_date AND end_date ) ;
    
	return p_count;

    END$$
DELIMITER ;



-- To find all passengers ( below age 18,above age 18 )for given flight id

DELIMITER $$
  CREATE PROCEDURE passengers_below_18(flight_id varchar(30))
  
    BEGIN
    
        SELECT * ,(YEAR(CURDATE())-YEAR(u.birthday)) as age FROM  
        user u natural join booking b left join profile using(user_id)  where b.flight_id=flight_id and (YEAR(CURDATE())-YEAR(u.birthday))<18;
        
    END$$
DELIMITER ;


DELIMITER $$
  CREATE PROCEDURE passengers_above_18(flight_id varchar(30))
  
    BEGIN
    
        SELECT * ,(YEAR(CURDATE())-YEAR(u.birthday)) as age FROM  
        user u natural join booking b left join profile using(user_id)  where b.flight_id=flight_id and (YEAR(CURDATE())-YEAR(u.birthday)) >=18;
        
    END$$
DELIMITER ;
