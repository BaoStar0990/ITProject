const adminModel = require("../models/adminModel")

module.exports = {
    getAllStaff : (callback) => {
        adminModel.getAllStaff((err, data) => {
            if(err)
                throw err
            callback(null, data)
        })
    },
    getAllCustomer : (callback) => {
        adminModel.getAllCustomer((err, data) => {
            if(err)
                throw err
            callback(null, data)
        })
    },
    deleteUser : (callback, id) => {
        adminModel.deleteUser((err) => {
            if(err)
                throw err
            callback(null)
        }, id
    )},
    addUser : (callback, login, password, fullname, email, sex, dob, phonenumber, staffRole, salary) => {
        adminModel.addUser((err) => {
            if(err)
                throw err
            callback(null)
        }, login, password, fullname, email, sex, dob, phonenumber, staffRole, salary
    )},
    updateUser : (callback, id, login, password, fullname, email, sex, dob, phonenumber, staffRole, salary) => {
        adminModel.updateUser((err) => {
            if(err)
                throw err
            callback(null)
        }, id, login, password, fullname, email, sex, dob, phonenumber, staffRole, salary
    )},

    getAllMovies : (callback) => {
        adminModel.getAllMovies((err, data) => {
            if(err)
                throw err
            callback(null, data)
        })
    },
    getAllMovieType : (callback) => {
        adminModel.getAllMovieType((err, data) => {
            if(err)
                throw err
            callback(null, data)
        })
    },
    getAllMovieDetails : (callback) => {
        adminModel.getAllMovieDetails((err, data) => {
            if(err)
                throw err
            callback(null, data)
        })
    },
    addMovieType : (callback, type) => {
        adminModel.addMovieType((err) => {
            if(err)
                throw err
            callback(null)
        }, type
    )},
    updateMovieType : (callback, id, type) => {
        adminModel.updateMovieType((err) => {
            if(err)
                throw err
            callback(null)
        }, id, type
    )},
    deleteMovieType : (callback, id) => {
        adminModel.deleteMovieType((err) => {
            if(err)
                throw err
            callback(null)
        }, id
    )},
    addMovie : (callback, name, open, close) => {
        adminModel.addMovie((err) => {
            if(err)
                throw err
            callback(null)
        }, name, open, close
    )},
    getMovieID : (callback, name) => {
        adminModel.getMovieID((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }, name)
    },
    getMovieTypeID : (callback, name) => {
        adminModel.getMovieTypeID((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }, name)
    },
    addMovieDetail : (callback, movieid, poster, description, director, movietypeid, duration, language, subtitle, trailer) => {
        adminModel.addMovieDetail((err, data) => {
            if(err)
                throw err
            callback(null, data)
        }, movieid, poster, description, director, movietypeid, duration, language, subtitle, trailer)
    },
    deleteMovieDetail : (callback, id) => {
        adminModel.deleteMovieDetail((err) => {
            if(err)
                throw err
            callback(null)
        }, id
    )},
    


    getAllRoomType : (callback) => {
        adminModel.getAllRoomType((err, data) => {
            if(err)
                throw err
            callback(null, data)
        })
    },
    getAllRooms : (callback) => {
        adminModel.getAllRooms((err, data) => {
            if(err)
                throw err
            callback(null, data)
        })
    },
    getSeatType : (callback) => {
        adminModel.getSeatType((err, data) => {
            if(err)
                throw err
            callback(null, data)
        })
    },
    getAllSeats : (callback) => {
        adminModel.getAllSeats((err, data) => {
            if(err)
                throw err
            callback(null, data)
        })
    },

    getAllShowTime : (callback) => {
        adminModel.getAllShowTime((err, data) => {
            if(err)
                throw err
            callback(null, data)
        })
    },

    getAllOrders : (callback) => {
        adminModel.getAllOrders((err, data) => {
            if(err)
                throw err
            callback(null, data)
        })
    }
}