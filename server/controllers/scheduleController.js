const scheduleModel = require("../models/scheduleModel")

module.exports = {
    getUpComingSchedule : (callback) => {
        scheduleModel.getUpComingSchedule((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }) 
    }
}