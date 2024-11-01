const db = require("../config/database")

exports.module = {
    getUpComingSchedule : (callback) => {
        db.query("select * from showtime where datediff( date_add(current_date(), interval 7 day), showdate) >= 0 and cinemaid = 1;", (err, result) => {
            if(err){
                throw err
            }
            else{
                const data = result.map(row => row)
                callback(null, data)
            }
        })
    }
}