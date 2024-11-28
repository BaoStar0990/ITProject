const profileModel = require("../models/profileModule")

module.exports = {
    getUserInfo : (callback, userid) => {
        profileModel.getUserInfo((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }, userid) 
    },
    getUserOrders : (callback, userid) => {
        profileModel.getUserOrder((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }, userid) 
    },
}