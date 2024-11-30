const express = require('express')
const router = express.Router()
const scheduleController = require('../controllers/scheduleController')

router.get("/", async (req, res) => {
    let data1 = []

    const query = await new Promise((resolve, reject) => {
        scheduleController.getUpComingSchedule((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })

    return res.json(query)
})

module.exports = router