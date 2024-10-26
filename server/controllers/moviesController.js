const usersModel = require("../models/moviesModel")

module.exports = {
    getAllMovies : (callback) => {
        usersModel.getAllMovies((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }) 
    },
    getAllCinema : (callback) => {
        usersModel.getAllCinema((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }) 
    },
    getAllUpcomingMovies : (callback) => {
        usersModel.getAllUpcomingMovies((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }) 
    },

    getAllMoviesID : (callback) => {
        usersModel.getAllMoviesID((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }) 
    },

    addUser : (email, firstname ,lastname) => {
        usersModel.addUser(email, firstname, lastname)
    },
    
    getSpecificUser : (callback, id) => {
        usersModel.getSpecificUser((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }, id) 
    },
    
    deleteUser : (id) => {
        usersModel.deleteUser(id)
    }
}
