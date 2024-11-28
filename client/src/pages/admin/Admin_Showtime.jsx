import { useEffect, useState } from "react"
import Sidebar from "./components/Sidebar"

import axios from "axios"


function Admin_Showtime(){
    const [showTime, setShowTime] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/admin/showtime").then((res) => {
            setShowTime(res.data[0])
          })
          .catch(err => console.log(err))
    }, [])
    
    console.log(showTime)

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
                                <button className="btn btn-outline-danger">Thêm suất chiếu</button>
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
                                                    <button className="p-1 rounded bg-warning"><i className="fa-solid fa-wrench"></i></button>
                                                    <button className="p-1 rounded bg-danger"><i className="fa-solid fa-trash"></i></button>
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
        </>
    )
}

export default Admin_Showtime