const movieDetailModel = require("../models/movieDetailModel")

module.exports = {
    getMovieDetail : (callback, id) => {
        movieDetailModel.getMovieDetail((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }, id) 
    },
    getUpcomingSchedule : (callback, id) => {
        movieDetailModel.getUpComingSchedule((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }, id) 
    },
    getMovieSchedule : (callback, date, time) => {
        movieDetailModel.getMovieSchedule((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }, date, time) 
    },
    getRoomChairs : (callback, id) => {
        movieDetailModel.getRoomChairs((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }, id) 
    },
    getBookedChairs : (callback, showtimeid) => {
        movieDetailModel.getBookedChairs((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }, showtimeid) 
    },
    insertOrder : (callback, userid, showtimeid, date, payment, time, quantity, total) => {
        movieDetailModel.insertOrder((err) => {
            if(err)
                throw err
            callback(null)
        }, userid, showtimeid, date, time, payment, quantity, total) 
    },
    insertOrderDetail : (callback, orderid, seatid) => {
        movieDetailModel.insertOrderDetail((err) => {
            if(err)
                throw err
            callback(null)
        }, orderid, seatid) 
    },
    getLatestOrderId : (callback) => {
        movieDetailModel.getLatestOrderId((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }) 
    },
    
}
