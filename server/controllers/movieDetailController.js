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
    }
}
