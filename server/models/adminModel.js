const db = require("../config/database")

module.exports = {
    getAllStaff : (callback) => {
        db.query("Select * from user where stafftype is not null;", (err, result) => {
            if(err)
                throw err
            const data = result.map(row => row)
            callback(null, data)
        })
    },
    getAllCustomer : (callback) => {
        db.query("Select * from user where stafftype is null;", (err, result) => {
            if(err)
                throw err
            const data = result.map(row => row)
            callback(null, data)
        })
    },
    deleteUser : (callback,id) => {
        db.query("delete from user where userid = ?;",[id], (err) => {
            if(err)
                throw err
            callback(null)
        })
    },
    updateUser : (callback,id, login, password, fullname, email, sex, dob, phonenumber, staffRole, salary) => {
        db.query("update user set login = ?, password = ?, fullname = ?, email = ?, sex = ?, dob = ?, phonenumber = ?, stafftype = ?, salary = ? where userid = ?;",[login, password, fullname, email, sex, dob, phonenumber, staffRole, salary, id], (err) => {
            if(err)
                throw err
            callback(null)
        })
    },
    addUser :  (callback, login, password, fullname, email, sex, dob, phonenumber, staffRole, salary) => {
        db.query("insert into User(login, password, fullname, email, sex, dob, phonenumber, staffType, salary) values (?, ?, ?, ?, ?, ?, ?, ?, ?);", [login, password, fullname, email, sex, dob, phonenumber, staffRole, salary], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    

    getAllMovies : (callback) => {
        db.query("Select * from movie;", (err, result) => {
            if(err)
                throw err
            const data = result.map(row => row)
            callback(null, data)
        })
    },
    getAllMovieType : (callback) => {
        db.query("Select * from movietype;", (err, result) => {
            if(err)
                throw err
            const data = result.map(row => row)
            callback(null, data)
        })
    },
    getAllMovieDetails : (callback) => {
        db.query("Select * from moviedetail;", (err, result) => {
            if(err)
                throw err
            const data = result.map(row => row)
            callback(null, data)
        })
    },
    addMovieType :  (callback, type) => {
        db.query("insert into MovieType(type) values (?);", [type], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    updateMovieType :  (callback, id, type) => {
        db.query("update movietype set type = ? where movietypeid = ?;", [type, id], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    deleteMovieType :  (callback, id) => {
        db.query("delete from movietype where movietypeid = ?;", [id], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    addMovie : (callback, name, open, close) => {
        db.query("insert into Movie(moviename, Movie_OpenTime, Movie_CloseTime) values (?, ?, ?);", [name, open, close], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    getMovieID : (callback, name) => {
        db.query("Select * from movie where moviename = ?;",[name], (err, result) => {
            if(err)
                throw err
            const data = result.map(row => row)
            callback(null, data)
        })
    },
    getMovieTypeID : (callback, name) => {
        db.query("Select * from movietype where type = ?;",[name], (err, result) => {
            if(err)
                throw err
            const data = result.map(row => row)
            callback(null, data)
        })
    },
    addMovieDetail : (callback, movieid, poster, description, director, movietypeid, duration, language, subtitle, trailer) => {
        db.query("insert into MovieDetail(MovieID, MoviePoster, Description, Director, MovieTypeID, Duration, Language, Subtitle, Trailer) values (?, ?, ?, ?, ?, ?, ?, ?, ?);", [movieid, poster, description, director, movietypeid, duration, language, subtitle, trailer], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    deleteMovieDetail :  (callback, id) => {
        db.query("delete from moviedetail where movietypeid = ?;", [id], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    deleteMovie :  (callback, id) => {
        db.query("delete from movie where movieid = ?;", [id], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    updateMovie :  (callback, id, name , open, close) => {
        db.query("update movie set MovieName = ?, Movie_OpenTime = ?, Movie_CloseTime = ? where movieid = ?;", [name , open, close, id], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    updateMovieDetail :  (callback, id, poster, description, director, duration, language, subtitle, trailer) => {
        db.query("update moviedetail set MoviePoster = ?, Description = ?, Director = ?,Duration = ?,Language = ?,Subtitle = ?,Trailer = ? where MovieID = ?;", [poster, description, director, duration, language, subtitle, trailer, id], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    

    getAllRoomType : (callback) => {
        db.query("Select * from roomtype;", (err, result) => {
            if(err)
                throw err
            const data = result.map(row => row)
            callback(null, data)
        })
    },
    getAllRooms : (callback) => {
        db.query("Select * from room;", (err, result) => {
            if(err)
                throw err
            const data = result.map(row => row)
            callback(null, data)
        })
    },
    getSeatType : (callback) => {
        db.query("Select * from seattype;", (err, result) => {
            if(err)
                throw err
            const data = result.map(row => row)
            callback(null, data)
        })
    },
    getAllSeats : (callback) => {
        db.query("Select * from seat;", (err, result) => {
            if(err)
                throw err
            const data = result.map(row => row)
            callback(null, data)
        })
    },
    addRoomType :  (callback, type) => {
        db.query("insert into roomtype(Type) values (?);", [type], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    updateRoomType :  (callback, id, type) => {
        db.query("update roomtype set type = ? where roomtypeid = ?;", [type, id], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    deleteRoomType :  (callback, id) => {
        db.query("delete from roomtype where roomtypeid = ?;", [id], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    addSeatType :  (callback, type, price) => {
        db.query("insert into seattype(type, price) values(?, ?);", [type, price], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    updateSeatType :  (callback, id, type, price) => {
        db.query("update seattype set type = ?, price = ? where seattypeid = ?;", [type, price, id], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    deleteSeatType :  (callback, id) => {
        db.query("delete from seattype where seattypeid = ?;", [id], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    deleteRoom :  (callback, id) => {
        db.query("delete from room where roomid = ?;", [id], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    addRoom :  (callback, name, typeid, capacity) => {
        db.query("insert into room(name, roomtypeid, capacity) values(?, ?, ?);", [name, typeid, capacity], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    addSeat :  (callback, seatid, seattypeid, roomid) => {
        db.query("insert into seat(seatid, seattypeid, roomid) values(?, ?, ?);", [seatid, seattypeid, roomid], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    getLastRoomID : (callback) => {
        db.query("select max(roomid) as roomid from room;", (err, result) => {
            if(err)
                throw err
            const data = result.map(row => row)
            callback(null, data)
        })
    },
    updateRoom :  (callback, id, name, type) => {
        db.query("update room set name = ?, roomtypeid = ? where roomid = ?", [name, type, id], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    deleteSeat :  (callback, seat, room) => {
        db.query("delete from seat where seatid = ? and roomid = ?", [seat, room], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },

    
    getAllShowTime : (callback) => {
        db.query("select st.showtimeid, st.showdate, st.showtime, m.moviename, r.name from showtime st inner join movie m on st.movieid = m.movieid inner join room r on st.roomid = r.roomid;", (err, result) => {
            if(err)
                throw err
            const data = result.map(row => row)
            callback(null, data)
        })
    },
    addShowTime :  (callback, date, time, movieid, roomid) => {
        db.query("insert into showtime(ShowDate, ShowTime, MovieID, RoomID) values (?, ?, ?, ?);", [date, time, movieid, roomid], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    updateShowTime :  (callback, id, date, time, movieid, roomid) => {
        db.query("update showtime set ShowDate = ?, ShowTime = ?, MovieID = ?,  RoomID = ? where ShowTimeID = ?;", [date, time, movieid, roomid, id], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    deleteShowTime :  (callback, id) => {
        db.query("delete from showtime where showtimeid = ?", [id], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },


    getAllOrders : (callback) => {
        db.query("select o.orderid, u.fullname, o.orderdate, o.ordertime, p.paymentname, o.quantity, od.seatid from orders o inner join user u on o.userid = u.userid inner join showtime st on o.showtimeid = st.showtimeid inner join payment p on o.paymentid = p.paymentid inner join orderdetail od on o.orderid = od.orderid order by o.orderid desc;", (err, result) => {
            if(err)
                throw err
            const data = result.map(row => row)
            callback(null, data)
        })
    },
    deleteOrder :  (callback, id) => {
        db.query("delete from orders where orderid = ?;", [id], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },

    getUserCount : (callback) => {
        db.query("select count(*) as number_user from user;", (err, result) => {
            if(err)
                throw err
            const data = result.map(row => row)
            callback(null, data)
        })
    },
    getHoursOrder : (callback) => {
        db.query("select * from orders where timediff(ordertime, current_time) <= 24;", (err, result) => {
            if(err)
                throw err
            const data = result.map(row => row)
            callback(null, data)
        })
    },
    getDaysOrder : (callback, period) => {
        db.query("select * from orders where datediff(orderdate, current_date) <= ?;", [period], (err, result) => {
            if(err)
                throw err
            const data = result.map(row => row)
            callback(null, data)
        })
    },
    // getOrderCount : (callback) => {
    //     db.query("select count(*) as number_order from orders;", (err, result) => {
    //         if(err)
    //             throw err
    //         const data = result.map(row => row)
    //         callback(null, data)
    //     })
    // },
    getDescOrder : (callback) => {
        db.query("select * from orders inner join user on orders.userid = user.userid order by orderid desc;", (err, result) => {
            if(err)
                throw err
            const data = result.map(row => row)
            callback(null, data)
        })
    },
    

}