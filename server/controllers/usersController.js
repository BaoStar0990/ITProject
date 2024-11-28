const userModel = require("../models/usersModel")

module.exports = {
    addUser : (callback, login, password, fullname, email, sex, dob, phonenumber) => {
        userModel.addUser((err) => {
            if(err)
                throw err
            callback(null)
        }, login, password, fullname, email, sex, dob, phonenumber) 
    },
    checkUserAvailable : (callback, account ,password) => {
        userModel.checkUserAvailable((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }, account ,password)
    },
    getLatestUserID : (callback) => {
        userModel.getLatestUserID((err, data) => {
            if(err)
                throw err
            callback(null, data)
        })
    }
}