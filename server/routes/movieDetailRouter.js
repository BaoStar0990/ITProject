const express = require('express')
const router = express.Router()
const movieDetailController = require("../controllers/movieDetailController")

router.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
        let data1 = [];
        let data2 = [];
  
        const result1 = await new Promise((resolve, reject) => {
            movieDetailController.getMovieDetail((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, id);
        });

        const result2 = await new Promise((resolve, reject) => {
            movieDetailController.getUpcomingSchedule((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, id);
        });
  
        // Combine data
        data1 = [...data1, ...result1];
        data2 = [...data2, ...result2];
        const data = [data1, data2];
        // Send response
        res.json(data);
    } catch (error) {
        // Handle error
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }

})

module.exports = router