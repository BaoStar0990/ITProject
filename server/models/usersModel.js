const db = require("../config/database")

module.exports = {
    addUser :  (callback, login, password, fullname, email, sex, dob, phonenumber) => {
        db.query("insert into User(login, password, fullname, email, sex, dob, phonenumber) values (?, ?, ?, ?, ?, ?, ?);", [login, password, fullname, email, sex, dob, phonenumber], (err) => {
            if(err){
                throw err
            }
            else{
                callback(null)
            }
        })
    },
    checkUserAvailable : (callback, account, password) => {
        db.query("select * from user where login = ? and password = ?", [account, password], (err, result) => {
            if(err){
                throw err
            }
            const data = result.map(row => row)
            callback(null, data)
        })
    },
    getLatestUserID : (callback) => {
        db.query("select max(userid) as UserID from user;", (err, result) => {
            if(err){
                throw err
            }
            const data = result.map(row => row)
            callback(null, data)
        })
    }
    
}