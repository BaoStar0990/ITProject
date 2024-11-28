var express = require('express');
var router = express.Router();
const adminController = require("../controllers/adminController")

router.get("/user", async (req, res) => {
    let data1 = []
    let data2 = []
    const userID = await new Promise((resolve, reject) => {
        adminController.getAllStaff((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
    const customerID = await new Promise((resolve, reject) => {
        adminController.getAllCustomer((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    data1 = [...data1, ...userID]
    data2 = [...data2, ...customerID]
    const data = [data1, data2]
    return res.json(data)
})

router.post("/user", async (req, res) => {
    console.log(req.body)

    if(req.body.action === "delete"){
        await new Promise((resolve, reject) => {
            adminController.deleteUser((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.userid);
        });
        
    }
    else if(req.body.action === "add"){
        await new Promise((resolve, reject) => {
            adminController.addUser((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.account, req.body.password, req.body.fullname, req.body.email, req.body.sex, req.body.dob, req.body.phone, req.body.role, req.body.salary);
        });
    }
    else if(req.body.action === "edit"){
        await new Promise((resolve, reject) => {
            adminController.updateUser((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.userid, req.body.account, req.body.password, req.body.fullname, req.body.email, req.body.sex, req.body.dob, req.body.phone, req.body.role === '' ? null : req.body.role, req.body.salary === '' ? 0 : req.body.salary);
        });
    }
    res.redirect("http://localhost:5173/admin/user")
})

router.get("/movie", async (req, res) => {
    let data1 = []
    let data2 = []
    let data3 = []
    const movie = await new Promise((resolve, reject) => {
        adminController.getAllMovies((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    const moviedetail = await new Promise((resolve, reject) => {
        adminController.getAllMovieDetails((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    const movietype = await new Promise((resolve, reject) => {
        adminController.getAllMovieType((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    data1 = [...data1, ...movie]
    data2 = [...data2, ...moviedetail]
    data3 = [...data3, ...movietype]
    const data = [data1, data2, data3]
    return res.json(data)
})

router.post("/movie", async (req, res) => {
    console.log(req.body)

    if(req.body.action === "add_type"){
        await new Promise((resolve, reject) => {
            adminController.addMovieType((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.type);
        });
    }
    else if(req.body.action === "edit_type"){
        await new Promise((resolve, reject) => {
            adminController.updateMovieType((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.typeid, req.body.type);
        });
    }
    else if(req.body.action === "delete_type"){
        await new Promise((resolve, reject) => {
            adminController.deleteMovieType((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.typeid);
        });
    }
    else if(req.body.action === "add_movie"){
        await new Promise((resolve, reject) => {
            adminController.addMovie((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.name, req.body.start_date, req.body.end_date);
        });

        const movieid = await new Promise((resolve, reject) => {
            adminController.getMovieID((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.name);
        });
        console.log(movieid)

        for(let type of req.body.type){
            const movietypeid = await new Promise((resolve, reject) => {
                adminController.getMovieTypeID((err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }, type);
            });
            console.log(movietypeid)

            await new Promise((resolve, reject) => {
                adminController.addMovieDetail((err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }, movieid[0].MovieID, req.body.poster, req.body.description, req.body.directors, movietypeid[0].MovieTypeID, req.body.duration, req.body.language, req.body.subtitle, req.body.trailer);
            });
        }
    }
    else if(req.body.action === "delete_detail"){
        await new Promise((resolve, reject) => {
            adminController.deleteMovieDetail((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.detailid);
        });
    }
    res.redirect("http://localhost:5173/admin/movie")
})

router.get("/room", async (req, res) => {
    let data1 = []
    let data2 = []
    let data3 = []
    let data4 = []
    const roomtype = await new Promise((resolve, reject) => {
        adminController.getAllRoomType((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    const rooms = await new Promise((resolve, reject) => {
        adminController.getAllRooms((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    const seattype = await new Promise((resolve, reject) => {
        adminController.getSeatType((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    const seats = await new Promise((resolve, reject) => {
        adminController.getAllSeats((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    data1 = [...data1, ...roomtype]
    data2 = [...data2, ...rooms]
    data3 = [...data3, ...seattype]
    data4 = [...data4, ...seats]
    const data = [data1, data2, data3, data4]
    return res.json(data)
})

router.get("/showtime", async (req, res) => {
    let data1 = []
    // let data2 = []
    // let data3 = []
    // let data4 = []
    const showtime = await new Promise((resolve, reject) => {
        adminController.getAllShowTime((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    // const rooms = await new Promise((resolve, reject) => {
    //     adminController.getAllRooms((err, result) => {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             resolve(result);
    //         }
    //     });
    // });

    // const seattype = await new Promise((resolve, reject) => {
    //     adminController.getSeatType((err, result) => {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             resolve(result);
    //         }
    //     });
    // });

    // const seats = await new Promise((resolve, reject) => {
    //     adminController.getAllSeats((err, result) => {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             resolve(result);
    //         }
    //     });
    // });

    data1 = [...data1, ...showtime]
    // data2 = [...data2, ...rooms]
    // data3 = [...data3, ...seattype]
    // data4 = [...data4, ...seats]
    // const data = [data1, data2, data3, data4]
    const data = [data1]
    return res.json(data)
})

router.get("/order", async (req, res) => {
    let data1 = []
    // let data2 = []
    // let data3 = []
    // let data4 = []
    const orders = await new Promise((resolve, reject) => {
        adminController.getAllOrders((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    // const rooms = await new Promise((resolve, reject) => {
    //     adminController.getAllRooms((err, result) => {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             resolve(result);
    //         }
    //     });
    // });

    // const seattype = await new Promise((resolve, reject) => {
    //     adminController.getSeatType((err, result) => {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             resolve(result);
    //         }
    //     });
    // });

    // const seats = await new Promise((resolve, reject) => {
    //     adminController.getAllSeats((err, result) => {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             resolve(result);
    //         }
    //     });
    // });

    data1 = [...data1, ...orders]
    // data2 = [...data2, ...rooms]
    // data3 = [...data3, ...seattype]
    // data4 = [...data4, ...seats]
    // const data = [data1, data2, data3, data4]
    const data = [data1]
    return res.json(data)
})

module.exports = router