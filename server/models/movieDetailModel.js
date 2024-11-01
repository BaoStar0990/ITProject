const db = require("../config/database")

module.exports = {
    getMovieDetail : (callback, id) => {
        db.query("Select * from movie m inner join moviedetail md on m.movieid = md.movieid inner join movietype mt on md.movietypeid = mt.movietypeid  where m.movieid = ?", [id], (err, result) => {
            if(err){
                throw err
            }
            else{
                const data = result.map(row => row)
                callback(null, data)
            }
        })
    },
    getUpComingSchedule : (callback, id) => {
        db.query("select * from showtime where datediff( date_add(current_date(), interval 7 day), showdate) >= 0 and movieid = ?;", [id], (err, result) => {
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