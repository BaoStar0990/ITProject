const db = require("../config/database")

module.exports = {
    getUserInfo: (callback, userid) => {
        db.query("Select * from user where userid = ?", [userid], (err, result) => {
            if(err)
            {
                throw err
            }
            else{
                const data = result.map(row => row)
                callback(null, data)
            }
        })
    },
    getUserOrder: (callback, userid) => {
        db.query("select o.orderid, m.moviename, o.orderdate, o.ordertime, od.seatid, st.showdate, st.showtime, o.total from Orders o inner join showtime st on o.showtimeid = st.showtimeid inner join movie m on st.movieid = m.movieid inner join orderdetail od on o.orderid = od.orderid where o.userid = ?;", [userid], (err, result) => {
            if(err)
            {
                throw err
            }
            else{
                const data = result.map(row => row)
                callback(null, data)
            }
        })
    },
    updateProfile :  (callback, id, fullname, sex, number, email, date) => {
        db.query("update user set fullname = ?, sex = ?, PhoneNumber = ?,  Email = ?, DOB = ? where userid = ?;", [fullname, sex, number, email, date, id], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    
}