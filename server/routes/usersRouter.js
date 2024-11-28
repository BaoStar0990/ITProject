var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersController")

router.post('/', async (req, res) => {
    // console.log(req.body)

    const {account, password, fullname, email, sex, date, number, action} = req.body

    if(action == "signin"){
        let data = []
        const result1 = await new Promise((resolve, reject) => {
            usersController.checkUserAvailable((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, account, password);
        });

        data = [...data, ...result1]
        return(res.json(data))
    }
    else if(action == "signup"){
        let data = []
        await new Promise((resolve, reject) => {
            usersController.addUser((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, account, password, fullname, email, sex, date, number);
        });

        const userID = await new Promise((resolve, reject) => {
            usersController.getLatestUserID((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        data = [...data, ...userID]
        return(res.json(data))
    }

    // res.redirect("http://localhost:5173")
});

module.exports = router;
