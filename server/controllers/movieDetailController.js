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
    }
}
