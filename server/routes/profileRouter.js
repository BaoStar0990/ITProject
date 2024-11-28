var express = require('express');
var router = express.Router();
var profileController = require("../controllers/profileController")

router.post("/", async (req, res) => {
    // console.log(req.body.userId)

    try {
        let data1 = []
        let data2 = []
        
        const result1 = await new Promise((resolve, reject) => {
            profileController.getUserInfo((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.userId);
        });

        const result2 = await new Promise((resolve, reject) => {
            profileController.getUserOrders((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.userId);
        });

        // console.log(result2)
        data1 = [...data1, ...result1]
        data2 = [...data2, ...result2]

        const data = [data1, data2] 

        return res.json(data)
    } catch (error) {
        return res.status(500).json({message : "Error 500"})
    }
})

module.exports = router;