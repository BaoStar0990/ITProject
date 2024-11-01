const moviesModel = require("../models/moviesModel")

module.exports = {
    getAllMovies : (callback) => {
        moviesModel.getAllMovies((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }) 
    },
    getAllCinema : (callback) => {
        moviesModel.getAllCinema((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }) 
    },
    getAllUpcomingMovies : (callback) => {
        moviesModel.getAllUpcomingMovies((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }) 
    },

    getAllMoviesID : (callback) => {
        moviesModel.getAllMoviesID((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }) 
    },

    addUser : (email, firstname ,lastname) => {
        moviesModel.addUser(email, firstname, lastname)
    },
    
    getSpecificUser : (callback, id) => {
        moviesModel.getSpecificUser((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }, id) 
    },
    
    deleteUser : (id) => {
        moviesModel.deleteUser(id)
    }
}
