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

    const DuplicateOrder = () => {
        if(orders)
        {
            return orders.filter((item, index, arr) => {
                return (index === arr.findIndex(obj => {
                    return(obj.orderid == item.orderid)
                }))
            })
        }
    }

    const OrderSeats = (id) => {
        if(orders){
            return orders.filter(item =>{return item.orderid === id}).map(item => {return item.seatid}).join(", ")
        }
    }


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
                                <th>Ghế đặt</th>
                                <th>Số lượng</th>
                                <th>Phương thức thanh toán</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {orders.length !=0 
                            ? <>
                                {DuplicateOrder().map((item) => {
                                    return(
                                        <>
                                            <tr>
                                                <td className="d-flex gap-2">
                                                    <form method="post" action="http://localhost:8000/admin/order">
                                                        <input type="hidden" name="orderid" value={item.orderid} />
                                                        <input type="hidden" name="action" value="delete_order" />
                                                        <button className="p-1 rounded bg-danger"><i className="fa-solid fa-trash"></i></button>
                                                    </form>
                                                </td>
                                                <td>{item.orderid}</td>
                                                <td>{DateFormat(item.orderdate)}</td>
                                                <td>{item.ordertime}</td>
                                                <td>{item.fullname}</td>
                                                <td>{OrderSeats(item.orderid)}</td>
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