import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import Copyright from "../components/copyright/Copyright"
import Banner from "../components/banner/Banner"
import { useEffect, useState } from "react"

import { useLocation } from "react-router-dom"

function Profile(){
    const [selectedRadio, setSelectedRadio] = useState("btnradio1");
    const [userInfo, setUserInfo] = useState({})
    const [movieOrder, setMovieOrder] = useState()

    const location = useLocation()
    useEffect(() => {
        setUserInfo(location.state.data[0][0])
        setMovieOrder(location.state.data[1])
    }, [])


    console.log(userInfo)

    const DuplicateOrder = () => {
        if(movieOrder){
            return(
                (movieOrder.map(item => {return(item.orderid)})).filter((item, index, arr) => {return arr.indexOf(item) == index})
            )
        }
    }

    const SpecificOrder = (id) => {
        if(movieOrder){
            return(
                (movieOrder.find(item => {return item.orderid == id}))
            )
        }
    }

    const OrderSeats = (id) => {
        if(movieOrder){
            return(
                (movieOrder.filter((item) => {return item.orderid == id})).map(item => {return item.seatid}).join(", ")
            )
        }
    }

    const TimeFormat = (date, time) => {
        if(movieOrder){
            return(
                new Date(date).getDate() + "-" + (new Date(date).getMonth() + 1) + "-" + new Date(date).getFullYear() + " " +  time
            )
        }
    }

    const DateFormat = (date) => {
        let res = ""
        if(movieOrder){
            res = new Date(date).getDate() < 10 
            ? (new Date(date).getMonth() < 10
                ? new Date(date).getFullYear() + "-0" + (new Date(date).getMonth() + 1) + "-0" + new Date(date).getDate() 
                : new Date(date).getFullYear() + "-" + (new Date(date).getMonth() + 1) + "-0" + new Date(date).getDate())
            : (new Date(date).getMonth() < 10
            ? new Date(date).getFullYear() + "-0" + (new Date(date).getMonth() + 1) + "-" + new Date(date).getDate()
            : new Date(date).getFullYear() + "-" + (new Date(date).getMonth() + 1) + "-" + new Date(date).getDate())
        }
        return res
    }

    return(
        <>
            <Banner/>
            <Header/>
            <div className="container">
                <div className='my-5 d-flex justify-content-center'>
                    <div className="btn-group btn-group-lg" role="group" aria-label="Basic radio toggle button group">
                        <input onChange={() => { setSelectedRadio("btnradio1")}} type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked={selectedRadio == "btnradio1"}/>
                        <label className="btn btn-outline-danger" htmlFor="btnradio1">Thông tin người dùng</label>

                        <input onChange={() => { setSelectedRadio("btnradio2")}} type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" checked={selectedRadio == "btnradio2"}/>
                        <label className="btn btn-outline-danger" htmlFor="btnradio2">Lịch sử vé</label>

                    </div>
                </div>

                {selectedRadio == "btnradio1"
                ? <>
                    <form action="#">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-floating mb-3">
                                    <input type="fullname" className="form-control" id="fullname" placeholder="fullname" value={userInfo.Fullname}/>
                                    <label for="fullname">Họ tên</label>
                                </div>

                                <div className="my-3 d-flex flex-column" style={{"width":"30%"}}>
                                    <label className="ms-1" htmlFor="date">Giới tính</label>
                                    <select name="sex" id="sex" className="form-select" aria-label="Default select example">
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>

                                <div className="form-floating">
                                    <input className="form-control" type="text" name="number" id="number" placeholder="number" value={userInfo.PhoneNumber}/>
                                    <label htmlFor="number">Phone Number</label>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input type="email" className="form-control" id="email" placeholder="email" value={userInfo.Email}/>
                                    <label for="email">Email</label>
                                </div>

                                <div className="my-3 d-flex flex-column">
                                    <label className="ms-1" htmlFor="date">Ngày sinh</label>
                                    <input className="p-2 rounded border border-0" type="date" name="date" id="date" value={DateFormat(userInfo.DOB)}/>
                                </div>
                            </div>
                        </div>
                        <div className="my-3 text-center">
                            <input className="btn btn-danger" type="submit" value="Cập nhật" />
                        </div>
                    </form>
                </>
                : <>
                    <table className="table">
                        <thead>
                            <tr className="table-danger">
                                <th>Mã hóa đơn</th>
                                <th>Phim</th>
                                <th>Ngày đặt</th>
                                <th>Suất chiếu</th>
                                <th>Ghế đặt</th>
                                <th>Tổng hóa đơn</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {movieOrder 
                            ? <>
                                {DuplicateOrder().map(item => {
                                    return(
                                        <tr>
                                            <td>{item}</td>
                                            <td>{SpecificOrder(item).moviename}</td>
                                            <td>{TimeFormat((SpecificOrder(item).orderdate), SpecificOrder(item).ordertime)}</td>
                                            <td>{TimeFormat((SpecificOrder(item).showdate), SpecificOrder(item).showtime)}</td>
                                            <td>{OrderSeats(item)}</td>
                                            <td>{SpecificOrder(item).total}</td>
                                        </tr>
                                    )
                                })}
                            </>
                            : <>Loading</>
                            }
                        </tbody>
                    </table>
                </>}
            </div>
            <Footer/>
            <Copyright/>  
        </>
    )
}

export default Profile