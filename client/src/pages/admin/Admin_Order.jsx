import { useEffect, useState } from "react"
import Sidebar from "./components/Sidebar"

import axios from "axios"


function Admin_Order(){
    const [orders, setOrders] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/admin/order").then((res) => {
            setOrders(res.data[0])
          })
          .catch(err => console.log(err))
    }, [])

    console.log(orders)

    const DateFormat = (date) => {
        let res = ""
        if(orders){
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
                            <h2 className="text-danger">Hóa đơn</h2>
                        </div>
                        <table className="table">
                        <thead>
                            <tr className="table-danger">
                                <th></th>
                                <th>ID</th>
                                <th>Ngày đặt</th>
                                <th>Giờ đặt</th>
                                <th>Khách hàng</th>
                                <th>Số lượng</th>
                                <th>Phương thức thanh toán</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {orders.length !=0 
                            ? <>
                                {orders.map((item) => {
                                    return(
                                        <>
                                            <tr>
                                                <td className="d-flex gap-2">
                                                    <button className="p-1 rounded bg-warning"><i className="fa-solid fa-wrench"></i></button>
                                                    <button className="p-1 rounded bg-danger"><i className="fa-solid fa-trash"></i></button>
                                                </td>
                                                <td>{item.orderid}</td>
                                                <td>{DateFormat(item.orderdate)}</td>
                                                <td>{item.ordertime}</td>
                                                <td>{item.fullname}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.paymentname}</td>
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

export default Admin_Order