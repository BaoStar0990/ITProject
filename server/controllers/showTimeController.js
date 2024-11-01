const showTimeModule = require("../models/showTimeModel")

exports.module = {
    getUpcomingSchedule : (callback) => {
        showTimeModule.getUpcomingSchedule((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }) 
    }
}