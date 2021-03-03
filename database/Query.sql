
-- create trigger package_trigger after insert on booking

delimiter //
create trigger package_trigger after insert on booking
for each row
begin
	if ((select count(user_id) as count from booking where user_id = new.user_id))>=9 then
		update profile 
			set package_name='Gold' where user_id=new.user_id;
	elseif ((select count(user_id) as count from booking where user_id = new.user_id))>=5 then
		update profile 
			set package_name='Frequent' where user_id=new.user_id;
	elseif ((select count(user_id) as count from booking where user_id = new.user_id))>=0 then
		update profile 
			set package_name='Basic' where user_id=new.user_id;

	end if;
end;
//

delimiter ;
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
  CREATE PROCEDURE passengers_below_18(flight_id int(255))
  
    BEGIN
    
        SELECT * ,(YEAR(CURDATE())-YEAR(u.birthday)) as age FROM  
        user u natural join booking b left join profile using(user_id)  where b.flight_id=flight_id and (YEAR(CURDATE())-YEAR(u.birthday))<18;
        
    END$$
DELIMITER ;


DELIMITER $$
  CREATE PROCEDURE passengers_above_18(flight_id int(255))
  
    BEGIN
    
        SELECT * ,(YEAR(CURDATE())-YEAR(u.birthday)) as age FROM  
        user u natural join booking b left join profile using(user_id)  where b.flight_id=flight_id and (YEAR(CURDATE())-YEAR(u.birthday)) >=18;
        
    END$$
DELIMITER ;

-- indexing for booking table

CREATE  INDEX booking_flight ON booking (flight_id); 




-- create flight


DELIMITER $$
  CREATE FUNCTION create_flight(aircraft_id varchar(30),date date,  start_time time, end_time time, route_id varchar(10))
  RETURNS boolean
 DETERMINISTIC
    BEGIN 

 	
    DECLARE f_count integer;
    
    select count(f.flight_id) into f_count 	from flight_schedule f where (f.aircraft_id=aircraft_id OR f.route_id=route_id) AND  f.date=date AND (( f.start_time BETWEEN start_time AND end_time) OR (f.end_time BETWEEN start_time AND end_time))  ;
    
    
    IF(f_count=0 and date>=CURDATE()  and start_time < end_time  and start_time >=CURTIME() and end_time >CURTIME()) THEN
    
    INSERT INTO `bairway`.`flight_schedule` (`aircraft_id`, `date`, `start_time`, `end_time`, `route_id`) VALUES (aircraft_id, date, start_time, end_time, route_id);
    return true;
    
	ELSE 
	return false;
    
	END IF;
    
    END$$
DELIMITER ;

-- to get the total revenue of a given aircraft
DELIMITER $$

CREATE DEFINER=`mahela`@`%` PROCEDURE `get_total_revenue_of_aircraft`(aircraft_id varchar(30))
BEGIN
 select sum(total_revenue) as total_revenue from total_reveune_of_aircraft where  total_reveune_of_aircraft.aircraft_id = aircraft_id ;  
END$$

DELIMITER ;
											  
--get number of guest passengers

DELIMITER $$
 CREATE FUNCTION get_Number_Of_Guest_Passengers  (start_date date ,end_date date) 
 RETURNS INT
 DETERMINISTIC
    BEGIN 

 	declare p_count integer;    
	select count(*) into p_count
	from flight_schedule natural join booking natural join user where date BETWEEN start_date AND end_date AND is_registered=0 ;
    
	return p_count;

    END$$
DELIMITER ;

--get number of registerd passengers group by their packages
DELIMITER $$
  CREATE PROCEDURE get_Number_Of_Registered_Passengers(start_date date ,end_date date)
  
    BEGIN
    
        SELECT package_name,count(*) as num_of_passengers FROM flight_schedule natural join booking natural join profile where date BETWEEN start_date AND end_date group by package_name;
        
    END$$
DELIMITER ;

--get all past flights details

DELIMITER $$
  CREATE PROCEDURE get_All_Pass_Flights(in_origin varchar(20), in_destination varchar(20))
  
    BEGIN
    
        SELECT * FROM flight_schedule natural join route where date<CURDATE() and origin=in_origin and destination=in_destination;
        
    END$$
DELIMITER ;



--get passenger count of the past flights
DELIMITER $$
  CREATE PROCEDURE get_Passenger_Count_O_D(in_origin varchar(20), in_destination varchar(20))
  
    BEGIN
    
        select flight_id,pass_count from pass_count_O_D where date<CURDATE() and origin=in_origin and destination=in_destination;
        
    END$$
DELIMITER ;

--create view to get passenger counts of each flights
create view pass_count as select flight_id,count(*) as pass_count from booking group by flight_id;

--create view to get passenger counts of each flights with origin and destination
create view pass_count_O_D as select origin,destination,flight_id,pass_count,date from pass_count natural join flight_schedule natural join route;

--update delays

DELIMITER $$
  CREATE FUNCTION update_delays(in_date date,  in_start_time time, in_end_time time, in_flight_id int(255))
  RETURNS boolean
 DETERMINISTIC
    BEGIN 

 	
    DECLARE f_count integer;
    
    select count(*) into f_count
	from flight_schedule  where  flight_id=in_flight_id and date>=CURDATE();
    
    
    IF(f_count=0) THEN
    
    return false;
    
	ELSE 
    update flight_schedule set date=in_date, start_time=in_start_time,end_time=in_end_time where flight_id=in_flight_id;
	return true;
    
	END IF;
    
    END$$
DELIMITER ;											 
