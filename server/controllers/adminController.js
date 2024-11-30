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
    deleteMovie : (callback, id) => {
        adminModel.deleteMovie((err) => {
            if(err)
                throw err
            callback(null)
        }, id
    )},
    updateMovie : (callback, id, name , open, close) => {
        adminModel.updateMovie((err) => {
            if(err)
                throw err
            callback(null)
        }, id, name , open, close
    )},
    updateMovieDetail : (callback, id, poster, description, director, duration, language, subtitle, trailer) => {
        adminModel.updateMovieDetail((err) => {
            if(err)
                throw err
            callback(null)
        }, id, poster, description, director, duration, language, subtitle, trailer
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
    addRoomType : (callback, type) => {
        adminModel.addRoomType((err) => {
            if(err)
                throw err
            callback(null)
        }, type
    )},
    updateRoomType : (callback, id, type) => {
        adminModel.updateRoomType((err) => {
            if(err)
                throw err
            callback(null)
        }, id, type
    )},
    deleteRoomType : (callback, id) => {
        adminModel.deleteRoomType((err) => {
            if(err)
                throw err
            callback(null)
        }, id
    )},
    addSeatType : (callback, type, price) => {
        adminModel.addSeatType((err) => {
            if(err)
                throw err
            callback(null)
        }, type, price
    )},
    updateSeatType : (callback, id, type, price) => {
        adminModel.updateSeatType((err) => {
            if(err)
                throw err
            callback(null)
        }, id, type, price
    )},
    deleteSeatType : (callback, id) => {
        adminModel.deleteSeatType((err) => {
            if(err)
                throw err
            callback(null)
        }, id
    )},
    deleteRoom : (callback, id) => {
        adminModel.deleteRoom((err) => {
            if(err)
                throw err
            callback(null)
        }, id
    )},
    addRoom : (callback, name, typeid, capacity) => {
        adminModel.addRoom((err) => {
            if(err)
                throw err
            callback(null)
        }, name, typeid, capacity
    )},
    addSeat : (callback, seatid, seattypeid, roomid) => {
        adminModel.addSeat((err) => {
            if(err)
                throw err
            callback(null)
        }, seatid, seattypeid, roomid
    )},
    getLastRoomID : (callback) => {
        adminModel.getLastRoomID((err, data) => {
            if(err)
                throw err
            callback(null, data)
        })
    },
    updateRoom : (callback, id, name, type) => {
        adminModel.updateRoom((err) => {
            if(err)
                throw err
            callback(null)
        }, id, name, type
    )},
    deleteSeat : (callback, seat, room) => {
        adminModel.deleteSeat((err) => {
            if(err)
                throw err
            callback(null)
        }, seat, room
    )},


    getAllShowTime : (callback) => {
        adminModel.getAllShowTime((err, data) => {
            if(err)
                throw err
            callback(null, data)
        })
    },
    addShowTime : (callback, date, time, movieid, roomid) => {
        adminModel.addShowTime((err) => {
            if(err)
                throw err
            callback(null)
        }, date, time, movieid, roomid
    )},
    updateShowTime : (callback, id, date, time, movieid, roomid) => {
        adminModel.updateShowTime((err) => {
            if(err)
                throw err
            callback(null)
        }, id, date, time, movieid, roomid
    )},
    deleteShowTime : (callback, id) => {
        adminModel.deleteShowTime((err) => {
            if(err)
                throw err
            callback(null)
        }, id
    )},


    getAllOrders : (callback) => {
        adminModel.getAllOrders((err, data) => {
            if(err)
                throw err
            callback(null, data)
        })
    },
    deleteOrder : (callback, id) => {
        adminModel.deleteOrder((err) => {
            if(err)
                throw err
            callback(null)
        }, id
    )},
}