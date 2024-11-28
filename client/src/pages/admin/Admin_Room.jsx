import { useEffect, useState } from "react"
import Sidebar from "./components/Sidebar"

import axios from "axios"


function Admin_Room(){
    const [roomType, setRoomType] = useState([])
    const [rooms, setRooms] = useState([])
    const [seatType, setSeatType] = useState([])
    const [seats, setSeats] = useState([])
    const [showSeats, setShowSeats] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/admin/room").then((res) => {
            setRoomType(res.data[0])
            setRooms(res.data[1])
            setSeatType(res.data[2])
            setSeats (res.data[3])
          })
          .catch(err => console.log(err))
    }, [])

    const getSeats = (event) => {
        let res = (seats.filter((item) => {
            return item.RoomID == event.currentTarget.cells[1].innerHTML
        }))
        setShowSeats(res)
        
    }

    return(
        <>
            <div className="container-fluid">
                <div className="row p-3">
                    <div className="col-md-3">
                        <Sidebar/>
                    </div>
                    <div className="col-md-9">
                        <div className="fs-1 text-danger text-center my-3">KHU VỰC QUẢN LÝ RẠP CHIẾU PHIM</div>

                        <div className="container-fluid d-flex align-items-center justify-content-between">
                            <h2 className="text-danger">Loại phòng</h2>
                            <div className="">
                                <button className="btn btn-outline-danger">Thêm loại phòng</button>
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr className="table-danger">
                                    <th></th>
                                    <th>ID</th>
                                    <th>Loại phòng</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {roomType.length !=0 
                                ? <>
                                    {roomType.map((item) => {
                                        return(
                                            <>
                                                <tr>
                                                    <td className="d-flex gap-2">
                                                        <button className="p-1 rounded bg-warning"><i className="fa-solid fa-wrench"></i></button>
                                                        <button className="p-1 rounded bg-danger"><i className="fa-solid fa-trash"></i></button>
                                                    </td>
                                                    <td>{item.RoomTypeID}</td>
                                                    <td>{item.Type}</td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </>
                                : <>Loading...</>
                                }
                            </tbody>
                        </table>

                        <div className="container-fluid d-flex align-items-center justify-content-between">
                            <h2 className="text-danger">Loại ghế</h2>
                            <div className="">
                                <button className="btn btn-outline-danger">Thêm loại ghế</button>
                            </div>
                        </div>
                        <table className="table table-hover">
                            <thead>
                                <tr className="table-danger">
                                    <th></th>
                                    <th>ID</th>
                                    <th>Loại ghế</th>
                                    <th>Giá</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {seatType.length !=0 
                                ? <>
                                    {seatType.map((item) => {
                                        return(
                                            <>
                                                <tr>
                                                    <td className="d-flex gap-2">
                                                        <button className="p-1 rounded bg-warning"><i className="fa-solid fa-wrench"></i></button>
                                                        <button className="p-1 rounded bg-danger"><i className="fa-solid fa-trash"></i></button>
                                                    </td>
                                                    <td>{item.SeatTypeID}</td>
                                                    <td>{item.Type}</td>
                                                    <td>{item.Price}</td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </>
                                : <>Loading...</>
                                }
                            </tbody>
                        </table>
                    

                        <div className="container-fluid d-flex align-items-center justify-content-between">
                            <h2 className="text-danger">Phòng chiếu</h2>
                            <div className="">
                                <button className="btn btn-outline-danger">Thêm phòng chiếu</button>
                            </div>
                        </div>
                        <table className="table table-hover">
                            <thead>
                                <tr className="table-danger">
                                    <th></th>
                                    <th>ID</th>
                                    <th>Phòng</th>
                                    <th>Loại phòng</th>
                                    <th>Sức chứa</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {rooms.length !=0 
                                ? <>
                                    {rooms.map((item) => {
                                        return(
                                            <>
                                                <tr onClick={(e) => getSeats(e)}>
                                                    <td className="d-flex gap-2">
                                                        <button className="p-1 rounded bg-warning"><i className="fa-solid fa-wrench"></i></button>
                                                        <button className="p-1 rounded bg-danger"><i className="fa-solid fa-trash"></i></button>
                                                    </td>
                                                    <td>{item.RoomID}</td>
                                                    <td>{item.Name}</td>
                                                    <td>{item.RoomTypeID}</td>
                                                    <td>{item.Capacity}</td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </>
                                : <>Loading...</>
                                }
                            </tbody>
                        </table>

                        <div className="container-fluid d-flex align-items-center justify-content-between">
                            <h2 className="text-danger">Ghế rạp</h2>
                            <div className="">
                                <button className="btn btn-outline-danger">Thêm ghế rạp</button>
                            </div>
                        </div>
                        <table className="table table-hover">
                            <thead>
                                <tr className="table-danger">
                                    <th></th>
                                    <th>ID</th>
                                    <th>Loại ghế</th>
                                    <th>Phòng</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {showSeats.length !=0 
                                ? <>
                                    {showSeats.map((item) => {
                                        return(
                                            <>
                                                <tr>
                                                    <td className="d-flex gap-2">
                                                        <button className="p-1 rounded bg-warning"><i className="fa-solid fa-wrench"></i></button>
                                                        <button className="p-1 rounded bg-danger"><i className="fa-solid fa-trash"></i></button>
                                                    </td>
                                                    <td>{item.SeatID}</td>
                                                    <td>{item.SeatTypeID}</td>
                                                    <td>{item.RoomID}</td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </>
                                : <>Loading...</>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin_Room