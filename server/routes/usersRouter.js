var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersController")

router.get('/', (req, res) => {
    usersController.getAllUser((err, data) => {
        res.render("../views/pages/users", {title : "User", users : data})
    })
});

router.get("/add", (req, res) => {
    res.render("../views/pages/users_add")
})

router.post("/add", (req, res) => {
    usersController.addUser(req.body.email, req.body.firstname, req.body.lastname)
    res.redirect("/users")
})

router.get("/delete/:id", (req, res) => {
    usersController.deleteUser(req.params.id)
    res.redirect("/users")
})

module.exports = router;
