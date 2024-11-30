import { useEffect, useState } from "react"
import Sidebar from "./components/Sidebar"

import axios from "axios"


function Admin_Showtime(){
    const [showTime, setShowTime] = useState([])
    const [movie, setMovie] = useState([])
    const [room, setRoom] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/admin/showtime").then((res) => {
            setShowTime(res.data[0])
            setRoom(res.data[1])
            setMovie(res.data[2])
          })
          .catch(err => console.log(err))
    }, [])
    
    const DateFormat = (date) => {
        let res = ""
        if(showTime){
            res = new Date(date).getDate() < 10 
            ? (new Date(date).getMonth() < 9
                ? new Date(date).getFullYear() + "-0" + (new Date(date).getMonth() + 1) + "-0" + new Date(date).getDate() 
                : new Date(date).getFullYear() + "-" + (new Date(date).getMonth() + 1) + "-0" + new Date(date).getDate())
            : (new Date(date).getMonth() < 9
            ? new Date(date).getFullYear() + "-0" + (new Date(date).getMonth() + 1) + "-" + new Date(date).getDate()
            : new Date(date).getFullYear() + "-" + (new Date(date).getMonth() + 1) + "-" + new Date(date).getDate())
        }
        return res
    }

    const getFields = (id, date, time, movie, room) => {
        document.getElementById("showid").value = id
        document.getElementById("editStart_date").value = date
        document.getElementById("editEnd_date").value = time        

        for(let x of document.getElementById("editMovie")){
            if(x.innerHTML === movie){
                x.selected = true
            }
            else{
                x.selected = false
            }
        }

        for(let x of document.getElementById("editRoom")){
            if(x.innerHTML === room){
                x.selected = true
            }
            else{
                x.selected = false
            }
        }
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
                            <h2 className="text-danger">Suất chiếu</h2>
                            <div className="">
                            <button className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#addMovieModal">Thêm suất chiếu</button>
                            <div className="modal fade fw-medium" id="addMovieModal" tabindex="-1" aria-labelledby="addCategoryModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <form action="http://localhost:8000/admin/showtime" method="post">
                                            <input type="hidden" name="action" value="add_showtime"/>
                                            <div className="modal-header">
                                                <h5 className="modal-title fw-semibold" id="addCategoryModalLabel">Thêm phim</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            
                                            <div className="modal-body">
                                            <div className="mb-3">
                                                <label for="start_date" className="form-label">Ngày chiếu</label>
                                                <input type="date" className="form-control" id="start_date" name="start_date" required/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="end_date" className="form-label">Giờ chiếu</label>
                                                <input type="time" className="form-control" id="end_date" name="end_date" required/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="movie" className="form-label">Phim</label>
                                                <select className="form-select" name="movie" id="movie">
                                                    {movie
                                                    ? movie.map((item) => {
                                                        return <>
                                                            <option value={item.MovieID}>{item.MovieName}</option>
                                                        </>
                                                    })
                                                    :<>Loading</>}
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label for="room" className="form-label">Phòng</label>
                                                <select className="form-select" name="room" id="room">
                                                    {room
                                                    ? room.map((item) => {
                                                        return <>
                                                            <option value={item.RoomID}>{item.Name}</option>
                                                        </>
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

                            </div>
                        </div>
                        <table className="table">
                        <thead>
                            <tr className="table-danger">
                                <th></th>
                                <th>ID</th>
                                <th>Ngày chiếu</th>
                                <th>Giờ chiếu</th>
                                <th>Phim</th>
                                <th>Phòng</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {showTime.length !=0 
                            ? <>
                                {showTime.map((item) => {
                                    return(
                                        <>
                                            <tr>
                                                <td className="d-flex gap-2">
                                                    <button onClick={() => getFields(item.showtimeid, DateFormat(item.showdate), item.showtime, item.moviename, item.name)} className="p-1 rounded bg-warning" data-bs-toggle="modal" data-bs-target="#editShowModal"><i className="fa-solid fa-wrench"></i></button>
                                                    <form method="post" action="http://localhost:8000/admin/showtime">
                                                        <input type="hidden" name="showid" value={item.showtimeid} />
                                                        <input type="hidden" name="action" value="delete_show" />
                                                        <button className="p-1 rounded bg-danger"><i className="fa-solid fa-trash"></i></button>
                                                    </form>
                                                </td>
                                                <td>{item.showtimeid}</td>
                                                <td>{DateFormat(item.showdate)}</td>
                                                <td>{item.showtime}</td>
                                                <td>{item.moviename}</td>
                                                <td>{item.name}</td>
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

            <div className="modal fade fw-medium" id="editShowModal" tabindex="-1" aria-labelledby="editShowModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form action="http://localhost:8000/admin/showtime" method="post">
                            <input type="hidden" name="action" value="edit_showtime"/>
                            <input type="hidden" name="showid" id="showid"/>
                            <div className="modal-header">
                                <h5 className="modal-title fw-semibold" id="addCategoryModalLabel">Sửa suất chiếu</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            
                            <div className="modal-body">
                            <div className="mb-3">
                                <label for="editStart_date" className="form-label">Ngày chiếu</label>
                                <input type="date" className="form-control" id="editStart_date" name="start_date" required/>
                            </div>
                            <div className="mb-3">
                                <label for="editEnd_date" className="form-label">Giờ chiếu</label>
                                <input type="time" className="form-control" id="editEnd_date" name="end_date" required/>
                            </div>
                            <div className="mb-3">
                                <label for="editMovie" className="form-label">Phim</label>
                                <select className="form-select" name="movie" id="editMovie">
                                    {movie
                                    ? movie.map((item) => {
                                        return <>
                                            <option value={item.MovieID}>{item.MovieName}</option>
                                        </>
                                    })
                                    :<>Loading</>}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label for="editRoom" className="form-label">Phòng</label>
                                <select className="form-select" name="room" id="editRoom">
                                    {room
                                    ? room.map((item) => {
                                        return <>
                                            <option value={item.RoomID}>{item.Name}</option>
                                        </>
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
        </>
    )
}

export default Admin_Showtime