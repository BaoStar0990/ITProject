const express = require('express')
const router = express.Router()
const usersController = require("../controllers/moviesController")

router.get("/", async (req, res) => {
    try {
        // usersController.getAllMovies((err, result) => {
        //     res.json(result)
        // })

        let data1 = [];
        let data2 = [];
        let data3 = [];

        // Fetch data using promises
        const result1 = await new Promise((resolve, reject) => {
            usersController.getAllMovies((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        const result2 = await new Promise((resolve, reject) => {
            usersController.getAllUpcomingMovies((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        const result3 = await new Promise((resolve, reject) => {
            usersController.getAllCinema((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        // Combine data
        data1 = [...data1, ...result1];
        data2 = [...data2, ...result2];
        data3 = [...data3, ...result3];
        const data = [data1, data2, data3];
        // Send response
        res.json(data);
    } catch (error) {
        // Handle error
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
})

module.exports = router