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
        db.query("delete from moviedetail where moviedetailid = ?;", [id], (err) => {
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

    
    getAllShowTime : (callback) => {
        db.query("select st.showtimeid, st.showdate, st.showtime, m.moviename, r.name from showtime st inner join movie m on st.movieid = m.movieid inner join room r on st.roomid = r.roomid;", (err, result) => {
            if(err)
                throw err
            const data = result.map(row => row)
            callback(null, data)
        })
    },


    getAllOrders : (callback) => {
        db.query("select o.orderid, u.fullname, o.orderdate, o.ordertime, p.paymentname, o.quantity, od.seatid from orders o inner join user u on o.userid = u.userid inner join showtime st on o.showtimeid = st.showtimeid inner join payment p on o.paymentid = p.paymentid inner join orderdetail od on o.orderid = od.orderid;", (err, result) => {
            if(err)
                throw err
            const data = result.map(row => row)
            callback(null, data)
        })
    },

}