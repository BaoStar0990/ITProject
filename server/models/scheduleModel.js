const db = require("../config/database")

module.exports = {
    getUpComingSchedule : (callback) => {
        db.query("select m.movieid, st.showtimeid, st.showdate, st.showtime, r.roomid, m.moviename, md.movieposter, md.duration, mt.type from showtime st inner join movie m on st.movieid = m.movieid inner join moviedetail md on st.movieid = md.movieid inner join room r on st.roomid = r.roomid inner join movietype mt on md.movietypeid = mt.movietypeid where datediff( date_add(current_date(), interval 7 day), st.showdate) > 0 and datediff( date_add(current_date(), interval 7 day), st.showdate) <= 7;", (err, result) => {
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