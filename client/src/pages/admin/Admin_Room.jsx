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

    const getRoomTypeFields = (id, type) => {
        document.getElementById("editRoomTypeid").value = id
        document.getElementById("editRoomType").value = type
    }

    const getSeatTypeFields = (id, type, price) => {
        document.getElementById("editSeatTypeid").value = id
        document.getElementById("editSeatType").value = type
        document.getElementById("editSeatPrice").value = price
    }

    const getRoomFields = (id, name, roomtypeid) => {
        document.getElementById("editRoomID").value = id
        document.getElementById("editRoom").value = name
        for(let x of document.getElementById("editRoomtype")){
            if(x.value == roomtypeid){
                x.selected = true
            }
            else{
                x.selected = false
            }
        }
    }

    const setCapacity = () => {
        document.getElementById("capacity").value = Number(document.getElementById("normalSeats").value) * 16 + Number(document.getElementById("vipSeats").value)
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
                            <button className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#addRoomType">Thêm loại phòng</button>
                            <div className="modal fade fw-medium" id="addRoomType" tabindex="-1" aria-labelledby="addRoomType" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <form action="http://localhost:8000/admin/room" method="post">
                                                <input type="hidden" name="action" value="add_roomtype"/>
                                                <div className="modal-header">
                                                    <h5 className="modal-title fw-semibold" id="addCategoryModalLabel">Thêm loại phòng</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                
                                                <div className="modal-body">
                                                <div className="mb-3">
                                                    <label for="type" className="form-label">Loại phòng</label>
                                                    <input type="text" className="form-control" id="type" name="name" required/>
                                                </div>
                                                
                                                
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" className="btn btn-danger">Save</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                            </div>
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
                                                        <button onClick={() => getRoomTypeFields(item.RoomTypeID, item.Type)} className="p-1 rounded bg-warning" data-bs-toggle="modal" data-bs-target="#editRoomTypeModal"><i className="fa-solid fa-wrench"></i></button>
                                                        <form method="post" action="http://localhost:8000/admin/room">
                                                            <input type="hidden" name="roomtypeid" value={item.RoomTypeID} />
                                                            <input type="hidden" name="action" value="delete_roomtype" />
                                                            <button className="p-1 rounded bg-danger"><i className="fa-solid fa-trash"></i></button>
                                                        </form>
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

                        <div className="modal fade fw-medium" id="editRoomTypeModal" tabindex="-1" aria-labelledby="editRoomTypeModal" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <form action="http://localhost:8000/admin/room" method="post">
                                        <input type="hidden" name="action" value="edit_roomtype"/>
                                        <input type="hidden" id="editRoomTypeid" name="roomtypeid"/>
                                        <div className="modal-header">
                                            <h5 className="modal-title fw-semibold" id="addCategoryModalLabel">Sửa loại phòng</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        
                                        <div className="modal-body">
                                        <div className="mb-3">
                                            <label for="editRoomType" className="form-label">Loại phòng</label>
                                            <input type="text" className="form-control" id="editRoomType" name="type" required/>
                                        </div>
                                        
                                        
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-danger">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid d-flex align-items-center justify-content-between">
                            <h2 className="text-danger">Loại ghế</h2>
                            <div className="">
                                <button className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#addSeatType">Thêm loại ghế</button>
                                <div className="modal fade fw-medium" id="addSeatType" tabindex="-1" aria-labelledby="addSeatType" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <form action="http://localhost:8000/admin/room" method="post">
                                                <input type="hidden" name="action" value="add_seattype"/>
                                                <div className="modal-header">
                                                    <h5 className="modal-title fw-semibold" id="addCategoryModalLabel">Thêm loại phòng</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                
                                                
                                                <div className="modal-body">
                                                <div className="mb-3">
                                                    <label for="seattype" className="form-label">Loại ghế</label>
                                                    <input type="text" className="form-control" id="seattype" name="seattype" required/>
                                                </div>
                                                <div className="mb-3">
                                                    <label for="seatprice" className="form-label">Giá</label>
                                                    <input type="number" className="form-control" id="seatprice" name="seatprice" required/>
                                                </div>
                                                
                                                
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" className="btn btn-danger">Save</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table className="table">
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
                                                        <button onClick={() => getSeatTypeFields(item.SeatTypeID, item.Type, item.Price)} className="p-1 rounded bg-warning" data-bs-toggle="modal" data-bs-target="#editSeatTypeModal"><i className="fa-solid fa-wrench"></i></button>
                                                        <form method="post" action="http://localhost:8000/admin/room">
                                                            <input type="hidden" name="seattypeid" value={item.SeatTypeID} />
                                                            <input type="hidden" name="action" value="delete_seattype" />
                                                            <button className="p-1 rounded bg-danger"><i className="fa-solid fa-trash"></i></button>
                                                        </form>
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

                        <div className="modal fade fw-medium" id="editSeatTypeModal" tabindex="-1" aria-labelledby="editSeatTypeModal" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <form action="http://localhost:8000/admin/room" method="post">
                                        <input type="hidden" name="action" value="edit_seattype"/>
                                        <input type="hidden" id="editSeatTypeid" name="seattypeid"/>
                                        <div className="modal-header">
                                            <h5 className="modal-title fw-semibold" id="addCategoryModalLabel">Sửa loại ghế</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        
                                        <div className="modal-body">
                                        <div className="mb-3">
                                            <label for="editSeatType" className="form-label">Loại ghế</label>
                                            <input type="text" className="form-control" id="editSeatType" name="type" required/>
                                        </div>
                                        <div className="mb-3">
                                            <label for="editSeatPrice" className="form-label">Giá</label>
                                            <input type="text" className="form-control" id="editSeatPrice" name="price" required/>
                                        </div>
                                        
                                        
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-danger">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    

                        <div className="container-fluid d-flex align-items-center justify-content-between">
                            <h2 className="text-danger">Phòng chiếu</h2>
                            <div className="">
                                <button className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#addRoom">Thêm phòng</button>
                                <div className="modal fade fw-medium" id="addRoom" tabindex="-1" aria-labelledby="addRoom" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <form action="http://localhost:8000/admin/room" method="post">
                                                <input type="hidden" name="action" value="add_room"/>
                                                <div className="modal-header">
                                                    <h5 className="modal-title fw-semibold" id="addCategoryModalLabel">Thêm phòng</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                
                                                <div className="modal-body">
                                                <div className="mb-3">
                                                    <label for="room" className="form-label">Phòng</label>
                                                    <input type="text" className="form-control" id="room" name="room" required/>
                                                </div>
                                                <div className="mb-3">
                                                    <label for="roomtype" className="form-label">Loại phòng</label>
                                                    <select className="form-select" name="roomtype" id="roomtype">
                                                        {roomType
                                                        ? roomType.map(item => {
                                                            return <option value={item.RoomTypeID}>{item.Type}</option>
                                                        })
                                                        :<>Loading</>}
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label for="capacity" className="form-label">Sức chứa</label>
                                                    <input type="number" className="form-control" id="capacity" name="capacity" required />
                                                </div>
                                                <div className="mb-3">
                                                    <label for="normalSeats" className="form-label">Số hàng ghế thường x16</label>
                                                    <input onChange={() => setCapacity()} type="number" className="form-control" id="normalSeats" name="normalSeats" required/>
                                                </div>
                                                <div className="mb-3">
                                                    <label for="vipSeats" className="form-label">Số ghế VIP</label>
                                                    <input onChange={() => setCapacity()} type="number" className="form-control" id="vipSeats" name="vipSeats" required/>
                                                </div>
                                                
                                                
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" className="btn btn-danger">Save</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
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
                                                        <button onClick={() => getRoomFields(item.RoomID, item.Name, item.RoomTypeID)} className="p-1 rounded bg-warning" data-bs-toggle="modal" data-bs-target="#editRoomModal"><i className="fa-solid fa-wrench"></i></button>
                                                        <form method="post" action="http://localhost:8000/admin/room">
                                                            <input type="hidden" name="roomid" value={item.RoomID} />
                                                            <input type="hidden" name="action" value="delete_room" />
                                                            <button className="p-1 rounded bg-danger"><i className="fa-solid fa-trash"></i></button>
                                                        </form>
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

                        <div className="modal fade fw-medium" id="editRoomModal" tabindex="-1" aria-labelledby="editRoomModal" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <form action="http://localhost:8000/admin/room" method="post">
                                        <input type="hidden" name="action" value="edit_room"/>
                                        <input type="hidden" id="editRoomID" name="roomid"/>
                                        <div className="modal-header">
                                            <h5 className="modal-title fw-semibold" id="addCategoryModalLabel">Sửa phòng</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        
                                        <div className="modal-body">
                                        <div className="mb-3">
                                            <label for="editRoom" className="form-label">Phòng</label>
                                            <input type="text" className="form-control" id="editRoom" name="room" required/>
                                        </div>
                                        <div className="mb-3">
                                            <label for="editRoomtype" className="form-label">Loại phòng</label>
                                            <select className="form-select" name="roomtype" id="editRoomtype">
                                                {roomType
                                                ? roomType.map(item => {
                                                    return <option value={item.RoomTypeID}>{item.Type}</option>
                                                })
                                                :<>Loading</>}
                                            </select>
                                        </div>
                                        
                                        
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-danger">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid d-flex align-items-center justify-content-between">
                            <h2 className="text-danger">Ghế rạp</h2>
                            <div className="">
                                {/* <button className="btn btn-outline-danger">Thêm ghế rạp</button> */}
                            </div>
                        </div>
                        <table className="table">
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
                                                        {/* <button className="p-1 rounded bg-warning"><i className="fa-solid fa-wrench"></i></button> */}
                                                        <form method="post" action="http://localhost:8000/admin/room">
                                                            <input type="hidden" name="seatid" value={item.SeatID} />
                                                            <input type="hidden" name="roomid" value={item.RoomID} />
                                                            <input type="hidden" name="action" value="delete_seat" />
                                                            <button className="p-1 rounded bg-danger"><i className="fa-solid fa-trash"></i></button>
                                                        </form>
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