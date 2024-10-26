const db = require("../config/database")

module.exports = {
    getAllMovies : (callback) => {
        db.query("Select * from movie m inner join moviedetail md on m.movieid = md.movieid inner join movietype mt on md.movietypeid = mt.movietypeid where month(m.Movie_OpenTime) = month(current_date())", (err, result) => {
            if(err){
                throw err
            }
            else{
                const data = result.map(row => row)
                callback(null, data)
            }
        })
    },
    getAllCinema : (callback) => {
        db.query("Select * from cinema", (err, result) => {
            if(err){
                throw err
            }
            else{
                const data = result.map(row => row)
                callback(null, data)
            }
        })
    },
    getAllUpcomingMovies : (callback) => {
        db.query("Select * from movie m inner join moviedetail md on m.movieid = md.movieid inner join movietype mt on md.movietypeid = mt.movietypeid where year(m.Movie_OpenTime) = year(current_date()) and (month(m.Movie_OpenTime) - month(current_date()) = 1);", (err, result) => {
            if(err){
                throw err
            }
            else{
                const data = result.map(row => row)
                callback(null, data)
            }
        })
    },

    getAllMoviesID : (callback) => {
        db.query("select distinct movieid from moviedetail", (err, result) => {
            if(err){
                throw err
            }
            else{
                const data = result.map(row => row)
                callback(null, data)
            }
        })
    },

    getSpecificUser : (callback, id) => {
        db.query("Select * from user where ID = ?", [id], (err, result) => {
            if(err){
                throw err
            }
            else{
                const data = result.map(row => row)
                callback(null, data)
            }
        })
    },

    addUser : (email, firstname, lastname) => {
        db.query("Insert into user(email, firstname, lastname) values (?, ?, ?)", [email, firstname, lastname], (err, result) => {
            if(err){
                throw err
            }
        })
    },

    deleteUser : (id) => {
        db.query("delete from user where id = ?", [id], (err, result) => {
            if(err){
                throw err
            }
        })
    }
}