import Header from '../components/header/Header'
import Banner from '../components/banner/Banner'
import Footer from '../components/footer/Footer'
import Copyright from '../components/copyright/Copyright'

import './order.css'
import { useState, useRef, useEffect } from 'react'

function Order(){
    const [chairs, setChairs] = useState([])
    const [price, setPrice] = useState(0)

    const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true })

    const DuplicateArray = (arr) => {
        return((arr.filter((item, index, array) => {
            return array.lastIndexOf(item) === index
        })).sort(sortAlphaNum))
    }

    const Greeting = (e) => {
        if(!(e.target.classList).contains("chair-choosing"))
        {
            e.target.classList.add("chair-choosing")
            setChairs(chairs => DuplicateArray([...chairs, e.target.innerHTML]))
            setPrice(price => price += 50000)
            console.log(ChairArray())
            
        }
        else{
            e.target.classList.remove("chair-choosing")
            setChairs(chairs => chairs.filter((_, index) => index != chairs.indexOf(e.target.innerHTML)))
            setPrice(price => price -= 50000)
        }        
    }

    const ChairArray = () => {
        let array = [];
        let letters = ["A", "B", "C", "D", "E", "F"];

        for (let letter of letters) {
            for (let i = 1; i <= 16; i++) {
                array.push(letter + i);
            }
        }
        return array
    }

    return(
        <>
            <Banner/>
            <Header/>
            <div className="container-fluid py-3 text-bg-dark my-5">
                <div className="container" style={{"width" : "60%"}}>
                    <div className="row">
                        <div className="col-md-4 text-center my-3">
                            <img src="/movieposter/venom3.jpg" alt="poster" width="90%"/>
                        </div>
                        <div className="col-md-4 my-auto">
                            <h3>Venom 3 : Kèo cuối</h3>
                            <p><b>Thể loại : </b>Hài hước, Hành động</p>
                            <p><b>Thời lượng : </b>120 phút</p>
                        </div>
                        <div className="col-md-4 my-auto">
                            <p><b>Ngày chiếu : </b>24/12/2024</p>
                            <p><b>Giờ chiếu : </b>11 : 30</p>
                            <p><b>Phòng chiếu : </b>P5</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container text-center text-bg-danger rounded mb-5" style={{"width" : "50%"}}>
                <h2>Màn hình chiếu</h2>
            </div>
            <div className="container">
                <div className="chairs-wrapper mx-auto">
                    {ChairArray().map((value, index) => {
                        if(Array.from(value)[1] == 4){
                            return(<><button key={index} className='chair' id={value} onClick={Greeting} type='button'>{value}</button>
                                <div style={{"width":"50px"}}></div>
                                <div style={{"width":"50px"}}></div></>)
                        }
                        else{
                            return(<><button className='chair' id={value} onClick={Greeting} type='button'>{value}</button></>)
                        }
                    })}
                </div>
            </div>

            <div className="container my-5" style={{"width":"75%"}}>
                <div className="row">
                    <div className="col-md-4 my-3">
                        <h2 className='text-danger'>Trạng thái ghế</h2>
                        <div className='d-flex align-items-center'>
                            <button style={{"width" : "50px"}} type="button" className="btn btn-outline-primary me-3" disabled>A1</button>
                            <h5 className='m-0'>Chưa đặt</h5>
                        </div>
                        <div className='d-flex align-items-center my-3'>
                            <button style={{"width" : "50px"}} type="button" className="btn btn-primary me-3" disabled>A1</button>
                            <h5 className='m-0'>Đang chọn</h5>
                        </div>
                        <div className='d-flex align-items-center'>
                            <button style={{"width" : "50px"}} type="button" className="btn btn-danger me-3" disabled>A1</button>
                            <h5 className='m-0'>Đã đặt</h5>
                        </div>
                    </div>
                    <div className="col-md-4 my-3">
                        <h2 className='text-danger'>Loại ghế</h2>
                        <div className='d-flex align-items-center'>
                            <button style={{"width" : "50px"}} type="button" className="btn btn-outline-primary me-3" disabled>A1</button>
                            <h5 className='m-0'>Ghế thường</h5>
                        </div>
                        <div className='d-flex align-items-center my-3'>
                            <button style={{"width" : "100px"}} type="button" className="btn btn-outline-primary me-3" disabled>A1</button>
                            <h5 className='m-0'>Ghế đôi</h5>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="">
                            <div>
                                <h5>Ghế đã chọn</h5>
                                <p>{chairs.join(", ")}</p>
                            </div>
                            <div>
                                <h5>Tổng hóa đơn</h5>
                                <p>{price}</p>
                            </div>
                        </div>
                        <button type='button' className='btn btn-danger'>Tiếp tục</button>
                    </div>
                </div>
            </div>
            <Footer/>
            <Copyright/>
        </>
    )
}

export default Order