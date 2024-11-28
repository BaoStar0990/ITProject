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
        db.query("select * from showtime where datediff( date_add(current_date(), interval 7 day), showdate) > 0 and datediff( date_add(current_date(), interval 7 day), showdate) <= 7 and movieid = ?;", [id], (err, result) => {
            if(err){
                throw err
            }
            else{
                const data = result.map(row => row)
                callback(null, data)
            }
        })
    },
    getMovieSchedule : (callback, date, time) => {
        db.query("select m.movieid, m.moviename, md.movieposter, mt.type, md.duration, s.showtimeid, s.showdate, s.showtime, r.name from movie m inner join showtime s on m.movieid = s.movieid  inner join moviedetail md on m.movieid = md.movieid  inner join movietype mt on mt.movietypeid = md.movietypeid inner join room r on r.roomid = s.roomid where s.showdate = ? and s.showtime = ?;", [date, time], (err, result) => {
            if(err){
                throw err
            }
            else{
                const data = result.map(row => row)
                callback(null, data)
            }
        })
    },
    getBookedChairs : (callback, showtimeid) => {
        db.query("select * from Orders o inner join orderdetail od on o.orderid = od.orderid inner join showtime st on o.showtimeid = st.showtimeid where o.showtimeid = ?;", [showtimeid], (err, result) => {
            if(err){
                throw err
            }
            else{
                const data = result.map(row => row)
                callback(null, data)
            }
        })
    },
    getRoomChairs : (callback, id) => {
        db.query("select * from seat s inner join seattype st on s.seattypeid = st.seattypeid inner join room r on s.roomid = r.roomid where s.roomid = ?;", [id], (err, result) => {
            if(err){
                throw err
            }
            else{
                const data = result.map(row => row)
                callback(null, data)
            }
        })
    },
    insertOrder : (callback, userid, showtimeid, date, payment, time, quantity, total) => {
        db.query("insert into Orders(userid, showtimeid, orderdate, ordertime, paymentid, quantity, total) values (?, ?, ?, ?, ?, ?, ?);", [userid, showtimeid, date, time, payment, quantity, total], (err, result) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    insertOrderDetail : (callback, orderid, seatid) => {
        db.query("insert into OrderDetail(OrderID, SeatID) values (?, ?);", [orderid, seatid], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    getLatestOrderId : (callback) => {
        db.query("select MAX(orderid) AS MaxOrderId from Orders order by orderid;", (err, result) => {
            if(err){
                throw err
            }
            else{
                const data = result.map(row => row)
                callback(null, data)
            }
        })
    },
}