import { useEffect, useState } from "react"
import Sidebar from "./components/Sidebar"

import axios from "axios"
import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

function Admin(){

    const [total_acc, setTotalAcc] = useState()
    const [period_statistic, setStatistic] = useState([])
    const [latestOrders, setLatestOrder] = useState([])
    const [filter, setFilter] = useState(10)
    const [labels, setLabels] = useState(["0h", "6h", "12h", "24h"])
    const [chartData, setChartData] = useState([])


    useEffect(() => {
        axios.get("http://localhost:8000/admin").then(res => {
            setTotalAcc(res.data[0])
            setStatistic(res.data[1])
            setLatestOrder(res.data[2])
        })
    }, [])

    window.addEventListener("load", () => {
        setDefaultChart()
    })

    const setDefaultChart = () => {
        if(period_statistic.length > 0){
            setLabels(["0h", "6h", "12h", "24h"])
            setChartData(chartData => {return[...chartData, period_statistic.filter(item => new Date().getHours() - item.OrderTime.split(":")[0] >= 0 && new Date().getHours() - item.OrderTime.split(":")[0] < 6).length]})
            setChartData(chartData => {return[...chartData, period_statistic.filter(item => new Date().getHours() - item.OrderTime.split(":")[0] >= 6 && new Date().getHours() - item.OrderTime.split(":")[0] < 12).length]})
            setChartData(chartData => {return[...chartData, period_statistic.filter(item => new Date().getHours() - item.OrderTime.split(":")[0] >= 12 && new Date().getHours() - item.OrderTime.split(":")[0] < 18).length]})
            setChartData(chartData => {return[...chartData, period_statistic.filter(item => new Date().getHours() - item.OrderTime.split(":")[0] >= 18 && new Date().getHours() - item.OrderTime.split(":")[0] < 24).length]})
        }
    }

    const setStatisticData = (data) => {
        setStatistic(data)
    }

    const sendFilter = async (e) => {
        const response = await axios.post("http://localhost:8000/admin", {
            filter: e.target.value
        })
        const data = response.data
        // console.log(data)
        console.log(period_statistic)
        setStatisticData(data)
        console.log(period_statistic)


        setChartData([])
        if(e.target.value == "hours"){
            setDefaultChart()
        }
        else if(e.target.value == "week"){
            setLabels(["0d", "1d", "2d", "3d", "4d", "5d", "6d", "7d"])
            let hold = []
            for(let i = 0; i<=7; i++){
                let temp = 0
                for(let x of period_statistic){
                    const date1 = new Date();
                    const date2 = new Date(x.OrderDate);
                    const diffTime = Math.abs(date2 - date1);
                    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
                    if(diffDays == i){
                        temp++
                    }
                }
                hold.push(temp)
            }
            console.log(hold)
            setChartData(hold)
            
        }
        else if(e.target.value == "month"){
            setLabels(["1w", "2w", "3w", "4w"])
            let hold = {
                "1w" : 0,
                "2w" : 0,
                "3w" : 0,
                "4w" : 0
            }
            let temp = []
            for(let x of period_statistic){
                const date1 = new Date();
                const date2 = new Date(x.OrderDate);
                const diffTime = Math.abs(date2 - date1);
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
                if(diffDays >=0 && diffDays < 7){
                    hold["1w"]++
                }
                else if(diffDays >=7 && diffDays < 14){
                    hold["2w"]++
                }
                else if(diffDays >=14 && diffDays < 21){
                    hold["3w"]++
                }
                else if(diffDays >=21 && diffDays < 28){
                    hold["4w"]++
                }
            }

            for(let x in hold){
                temp.push(hold[x])
            }
            console.log(temp)
            setChartData(temp)
            // setChartData([5,5,5,5,5,5,5,5])
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
                        <h2 className="text-danger">Thống kê</h2>
                        <form action="#">
                            <select onChange={(e) => sendFilter(e)} style={{width: "20%"}} className="form-select my-3" name="filter" id="filter">
                                <option  value="hours" selected>Trong 24 giờ</option>
                                <option value="week">Trong 1 tuần</option>
                                <option value="month">Trong 1 tháng</option>
                            </select>
                        </form>
                        <div className="row">
                            <div className="col-md-6 d-flex flex-column justify-content-center">
                                <h4><b className="text-danger">Số đơn vé được tạo: </b>{period_statistic.length > 0 ? period_statistic.length: <>0</>}</h4>
                                <h4><b className="text-danger">Số ghế đã được đặt: </b>{period_statistic.length > 0 ? period_statistic.map(item => item.Quantity).reduce((x,y)=>x+y): <>0</>}</h4>
                                <h4><b className="text-danger">Doanh thu: </b>{period_statistic.length ? period_statistic.map(item => item.Total).reduce((x,y)=>x+y): <>0</>}đ</h4>
                            </div>
                            <div className="col-md-6">
                                <Line
                                    data={{
                                        labels: labels,
                                        datasets:[
                                            {
                                                label: "Số vé",
                                                data: chartData.length > 0 ? chartData : 0,
                                                backgroundColor: "rgba(75, 192, 192, 0.5)",
                                                borderColor: 'rgb(75, 192, 192)',
                                            }
                                        ]
                                    }}
                                />
                            </div>
                        </div>
                        <h2 className="text-danger text-center my-3">Tổng kết</h2>
                        <h3><b className="text-danger">Tổng doanh thu: </b>{latestOrders.length > 0 ? latestOrders.map(item => item.Total).reduce((x, y) => {return x + y}) : <>Loading</>}đ</h3>
                        <h3><b className="text-danger">Tổng tài khoản: </b>{total_acc?.number_user}</h3>
                        <h3><b className="text-danger">Tổng đơn hàng: </b>{latestOrders.length}</h3>
                        <h2 className="text-danger text-center my-3">Đơn vé gần đây</h2>
                        <div className="container d-flex align-items-center">
                            <select onChange={(e) => {setFilter(e.target.value)}} style={{width: "10%"}} className="form-select" name="filter" id="filter">
                                <option value="10" selected>10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </select>
                            <p className="m-0 ms-3">dòng</p>
                        </div>
                        <table className="table my-3">
                            <thead className="table-danger">
                                <tr>
                                    <th>Khách hàng</th>
                                    <th>Ngày đặt</th>
                                    <th>Giờ đặt</th>
                                    <th>Số lượng</th>
                                    <th>Tổng hóa đơn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {latestOrders 
                                ? latestOrders.slice(0, filter).map(item => {
                                    return <>
                                        <tr>
                                            <td>{item.Fullname}</td>
                                            <td>{item.OrderDate}</td>
                                            <td>{item.OrderTime}</td>
                                            <td>{item.Quantity}</td>
                                            <td>{item.Total}</td>
                                        </tr>
                                    </>
                                })
                                :<>Loading</>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin