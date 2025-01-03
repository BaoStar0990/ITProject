var express = require('express');
var router = express.Router();
const adminController = require("../controllers/adminController")

router.get("/", async (req, res) => {
    let data1 = []

    const user_count = await new Promise((resolve, reject) => {
        adminController.getUserCount((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    // const orders = await new Promise((resolve, reject) => {
    //     adminController.getAllOrder((err, result) => {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             resolve(result);
    //         }
    //     });
    // });

    const hours_order = await new Promise((resolve, reject) => {
        adminController.getHoursOrder((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    const desc_order = await new Promise((resolve, reject) => {
        adminController.getDescOrder((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });


    // data1 = [...data1, user_count[0].number_user]

    const data = [user_count[0], hours_order, desc_order]
    return res.json(data)
})

router.post("/", async (req, res) => {
    console.log(req.body)

    if(req.body.filter == "week"){
        const period_order = await new Promise((resolve, reject) => {
            adminController.getDaysOrder((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, 7);
        });

        console.log(period_order)

        return res.json(period_order)
    }
    else if(req.body.filter == "month"){
        const period_order = await new Promise((resolve, reject) => {
            adminController.getDaysOrder((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, 30);
        });

        return res.json(period_order)
    }
    else if(req.body.filter == "hours"){
        const period_order = await new Promise((resolve, reject) => {
            adminController.getHoursOrder((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        return res.json(period_order)
    }
})

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
        const movietype = await new Promise((resolve, reject) => {
            adminController.getMovieTypeID((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.detail_type);
        });

        await new Promise((resolve, reject) => {
            adminController.deleteMovieDetail((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, movietype[0].MovieTypeID);
        });
    }
    else if(req.body.action === "delete_movie"){
        await new Promise((resolve, reject) => {
            adminController.deleteMovie((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.movieid);
        });
    }
    else if(req.body.action === "edit_movie"){
        await new Promise((resolve, reject) => {
            adminController.updateMovie((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.movieid, req.body.name, req.body.start_date, req.body.end_date);
        });
        await new Promise((resolve, reject) => {
            adminController.updateMovieDetail((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.movieid, req.body.poster, req.body.description, req.body.directors, req.body.duration, req.body.language, req.body.subtitle, req.body.trailer);
        });
        if(Array.isArray(req.body.type)){
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
                    }, req.body.movieid, req.body.poster, req.body.description, req.body.directors, movietypeid[0].MovieTypeID, req.body.duration, req.body.language, req.body.subtitle, req.body.trailer);
                });
            }
        }
        else if(req.body.type){
            const movietypeid = await new Promise((resolve, reject) => {
                adminController.getMovieTypeID((err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }, req.body.type);
            });
            console.log(movietypeid)

            await new Promise((resolve, reject) => {
                adminController.addMovieDetail((err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }, req.body.movieid, req.body.poster, req.body.description, req.body.directors, movietypeid[0].MovieTypeID, req.body.duration, req.body.language, req.body.subtitle, req.body.trailer);
            });
        }
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

router.post("/room", async (req, res) => {
    console.log(req.body)

    if(req.body.action === "add_roomtype"){
        await new Promise((resolve, reject) => {
            adminController.addRoomType((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.name);
        });
    }
    else if(req.body.action === "edit_roomtype"){
        await new Promise((resolve, reject) => {
            adminController.updateRoomType((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.roomtypeid, req.body.type);
        });
    }
    else if(req.body.action === "delete_roomtype"){
        await new Promise((resolve, reject) => {
            adminController.deleteRoomType((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.roomtypeid);
        });
    }
    else if(req.body.action === "add_seattype"){
        await new Promise((resolve, reject) => {
            adminController.addSeatType((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.seattype, req.body.seatprice);
        });
    }
    else if(req.body.action === "edit_seattype"){
        await new Promise((resolve, reject) => {
            adminController.updateSeatType((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.seattypeid, req.body.type, req.body.price);
        });
    }
    else if(req.body.action === "delete_seattype"){
        await new Promise((resolve, reject) => {
            adminController.deleteSeatType((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.seattypeid);
        });
    }
    else if(req.body.action === "delete_room"){
        await new Promise((resolve, reject) => {
            adminController.deleteRoom((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.roomid);
        });
    }
    else if(req.body.action === "add_room"){
        let letters = "ABCDEFGHIJKLMNOPQRSTU"

        await new Promise((resolve, reject) => {
            adminController.addRoom((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.room, req.body.roomtype, req.body.capacity);
        });

        const roomid = await new Promise((resolve, reject) => {
            adminController.getLastRoomID((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        console.log(roomid)

        let seats = []
        for(let x of letters.slice(0, req.body.normalSeats)){
            for(let i = 1; i<= 16; i++){
                seats.push(x + i)
            }
        }
        for(let i = 1; i<= req.body.vipSeats; i++){
            seats.push("V" + i)
        }

        console.log(seats)

        for(let x of seats){
            if(x[0] == "V")
                await new Promise((resolve, reject) => {
                    adminController.addSeat((err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    }, x, 2, roomid[0].roomid);
                });
            else{
                await new Promise((resolve, reject) => {
                    adminController.addSeat((err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    }, x, 1, roomid[0].roomid);
                });
            }
        }
    }
    else if(req.body.action == "edit_room"){
        await new Promise((resolve, reject) => {
            adminController.updateRoom((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.roomid, req.body.room, req.body.roomtype);
        });
    }
    else if(req.body.action == "delete_seat"){
        await new Promise((resolve, reject) => {
            adminController.deleteSeat((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.seatid, req.body.roomid);
        });
    }


    res.redirect("http://localhost:5173/admin/room")
})

router.get("/showtime", async (req, res) => {
    let data1 = []
    let data2 = []
    let data3 = []
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

    const rooms = await new Promise((resolve, reject) => {
        adminController.getAllRooms((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    const movie = await new Promise((resolve, reject) => {
        adminController.getAllMovies((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

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
    data2 = [...data2, ...rooms]
    data3 = [...data3, ...movie]
    // data4 = [...data4, ...seats]
    const data = [data1, data2, data3]
    // const data = [data1]
    return res.json(data)
})

router.post("/showtime", async (req, res) => {
    console.log(req.body)
    if(req.body.action === "add_showtime"){
        await new Promise((resolve, reject) => {
            adminController.addShowTime((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.start_date, req.body.end_date, req.body.movie, req.body.room);
        });
    }
    else if(req.body.action === "edit_showtime"){
        await new Promise((resolve, reject) => {
            adminController.updateShowTime((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.showid, req.body.start_date, req.body.end_date, req.body.movie, req.body.room);
        });
    }
    else if(req.body.action === "delete_show"){
        await new Promise((resolve, reject) => {
            adminController.deleteShowTime((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }, req.body.showid);
        });
    }

    res.redirect("http://localhost:5173/admin/showtime")
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

router.post("/order", async (req, res) => {
    await new Promise((resolve, reject) => {
        adminController.deleteOrder((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        }, req.body.orderid);
    });

    res.redirect("http://localhost:5173/admin/order")
})

module.exports = router