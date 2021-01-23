const pool=require("../config/database")

module.exports={
    getFlightSchedule(callBack){
        pool.query(
            `SELECT * FROM (SELECT * FROM flight_schedule natural join route) as a join (SELECT airport_id,country as origin_country,state  as origin_state ,city as origin_city  FROM airport) as b ON a.origin=b.airport_id join (SELECT airport_id,country as destination_country,state  as destination_state ,city as destination_city  FROM airport) as c ON a.destination=c.airport_id order by date desc`,
            [],
            (err,result)=>{
                if(err){
                    return callBack(err)
                }
                else{
                    return callBack(null,result)
                }
            }
        )
    },
    getFlightInfo(flight_id,callback){
        pool.query(
            `SELECT * FROM (SELECT * FROM flight_schedule natural join route order by date desc) as a join (SELECT airport_id,country as origin_country,state  as origin_state ,city as origin_city  FROM airport) as b ON a.origin=b.airport_id join (SELECT airport_id,country as destination_country,state  as destination_state ,city as destination_city  FROM airport) as c ON a.destination=c.airport_id where flight_id=?`,
            [flight_id],
            (err,result)=>{
                if(err){
                    return callback(err)
                }
                else{
                    return callback(null,result[0])
                }
            }
        )
    }
}