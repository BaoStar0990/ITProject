import Header from '../components/header/Header'
import Banner from '../components/banner/Banner'
import Footer from '../components/footer/Footer'
import Copyright from '../components/copyright/Copyright'

import './order.css'
import { useState, useRef, useEffect } from 'react'
import { useParams, Link, useLocation, redirect, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Order(){
    const [chairs, setChairs] = useState([])
    const [price, setPrice] = useState(0)
    const [data, setData] = useState([])
    const [seat, setSeat] = useState()

    const location = useLocation()
    useEffect(() => {
        setData(location.state.data[0])
        setSeat(location.state.data[1])
    }, [])
    // console.log(data)
    // console.log(seat)
    const navigate = useNavigate();

    const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true })

    const SeatsID = (arr) => {
        if(arr)
        {
            return arr.map(item => item.SeatID)
        }
    }


    const MovieType = (arr) => {
        if(arr){
            return(arr.reduce((res, obj, index) => {
                if(index < arr.length - 1 )
                    return res + obj.type + ","
                return res + obj.type
            }, ""))
        }
    }
    
    const DuplicateMovie = (arr) => {
        if(arr){
            const unique = arr.filter((obj, index, array) => {
                return (arr.findIndex((item) => {
                    return item.MovieID === obj.MovieID
                })) == index
            });
            return unique[0]
            
        }
    }

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
            let cost = seat.find((item) => {return item.SeatID == e.target.innerHTML}).Price
            setPrice(price => price += cost)
            
        }
        else{
            e.target.classList.remove("chair-choosing")
            setChairs(chairs => chairs.filter((_, index) => index != chairs.indexOf(e.target.innerHTML)))
            let cost = seat.find((item) => {return item.SeatID == e.target.innerHTML}).Price
            setPrice(price => price -= cost)
        }        
    }

    const ChairArray = (arr) => {
        if(arr){
            return(arr.sort(sortAlphaNum))
        }
    }

    const BookedChair = location.state.data[2].map(item => {return item.SeatID});


    const FormatDate = (inp) => {
        if(inp){
            let date = new Date(inp.showdate)
            return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
        }
    }

    const ConfirmSeats = () => {
        if(chairs.length == 0)
        {
            alert("Vui lòng chọn ít nhất một ghế")
            return
        }
        else{
            navigate("/moviedetail/8/confirm", {state : {seats : chairs, movie : data, total : price}})
        }
        
    }

    return(
        <>
            <Banner/>
            <Header/>
            <div className="container-fluid py-3 text-bg-dark my-5">
                <div className="container" style={{"width" : "60%"}}>
                    <div className="row">
                        {DuplicateMovie(data) != null 
                        ? <>
                            <div className="col-md-4 text-center my-3">
                                <img src={DuplicateMovie(data).movieposter} alt="poster" width="90%"/>
                            </div>
                            <div className="col-md-4 my-auto">
                                <h3>{DuplicateMovie(data).moviename}</h3>
                                <p><b>Thể loại : </b>{MovieType(data)}</p>
                                <p><b>Thời lượng : </b>{DuplicateMovie(data).duration} phút</p>
                            </div>
                            <div className="col-md-4 my-auto">
                                <p><b>Ngày chiếu : </b>{FormatDate(DuplicateMovie(data))}</p>
                                <p><b>Giờ chiếu : </b>{DuplicateMovie(data).showtime}</p>
                                <p><b>Phòng chiếu : </b>{DuplicateMovie(data).name}</p>
                            </div>
                        </>
                        : <>Loading</>}
                    </div>
                </div>
            </div>
            <div className="container text-center text-bg-danger rounded mb-5" style={{"width" : "50%"}}>
                <h2>Màn hình chiếu</h2>
            </div>
            <div className="container">
                {seat && seat.length != 0 
                ? <>
                    {
                        seat[0].Name.includes("I") 
                        ? <div className="vip-chairs-wrapper mx-auto" id="chairList">
                            {
                                ChairArray(SeatsID(seat)).map((value, index) =>{
                                    if(BookedChair.includes(value)){
                                        if(Array.from(value)[1] == 2){
                                            return(<>
                                                <button disabled key={index} className='chair chair-chosen couple' id={value} onClick={Greeting} type='button'>{value}</button>
                                                <div style={{"width":"50px"}}></div>
                                                <div style={{"width":"50px"}}></div>
                                            </>)
                                        }
                                        else
                                            return(<button disabled key={index} className='chair chair-chosen couple' id={value} onClick={Greeting} type='button'>{value}</button>)
                                    }
                                    else{
                                        if(Array.from(value)[1] == 2){
                                            return(<>
                                                <button key={index} className='chair couple' id={value} onClick={Greeting} type='button'>{value}</button>
                                                <div style={{"width":"50px"}}></div>
                                                <div style={{"width":"50px"}}></div>
                                            </>)
                                        }
                                        else
                                            return(<button key={index} className='chair couple' id={value} onClick={Greeting} type='button'>{value}</button>)
                                    }
                                    
                                })
                            }
                        </div> 
                        : <div className="chairs-wrapper mx-auto" id="chairList">
                            {ChairArray(SeatsID(seat)).map((value, index) => {
                            if(Array.from(value)[0] == "V"){
                                if(BookedChair.includes(value)){
                                    if(Array.from(value)[1] == 2){
                                        return(<>
                                                <button disabled key={index} className='chair chair-chosen couple' id={value} onClick={Greeting} type='button'>{value}</button>
                                                <div style={{"width":"50px"}}></div>
                                                <div style={{"width":"50px"}}></div>
                                            </>)
                                    }
                                    else{
                                        return(<button disabled key={index} className='chair chair-chosen couple' id={value} onClick={Greeting} type='button'>{value}</button>)
                                    }
                                }
                                {
                                    if(Array.from(value)[1] == 2){
                                        return(<>
                                                <button key={index} className='chair couple' id={value} onClick={Greeting} type='button'>{value}</button>
                                                <div style={{"width":"50px"}}></div>
                                                <div style={{"width":"50px"}}></div>
                                            </>)
                                    }
                                    else{
                                        return(<button key={index} className='chair couple' id={value} onClick={Greeting} type='button'>{value}</button>)
                                    }
                                }
                            }
                            else{
                                if(BookedChair.includes(value)){
                                    if(Array.from(value)[1] == 4){
                                        return(<>
                                                <button disabled key={index} className='chair chair-chosen' id={value} onClick={Greeting} type='button'>{value}</button>
                                                <div style={{"width":"50px"}}></div>
                                                <div style={{"width":"50px"}}></div>
                                            </>)
                                    }
                                    else{
                                        return(<button disabled key={index} className='chair chair-chosen' id={value} onClick={Greeting} type='button'>{value}</button>)
                                    }
                                }
                                else{
                                    if(Array.from(value)[1] == 4){
                                        return(<>
                                                <button key={index} className='chair' id={value} onClick={Greeting} type='button'>{value}</button>
                                                <div style={{"width":"50px"}}></div>
                                                <div style={{"width":"50px"}}></div>
                                            </>)
                                    }
                                    else{
                                        return(<button key={index} className='chair' id={value} onClick={Greeting} type='button'>{value}</button>)
                                    }
                                }
                                
                            }
                        })}
                        </div> 
                    }
                </>
                : <>Empty</>}
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
                        <button type='button' onClick={ConfirmSeats} className='btn btn-danger'>Tiếp tục</button>
                        {/* <Link to="/moviedetail/8/confirm" state={{seats : chairs, movie : data, total : price}} className="btn btn-danger">Tiếp tục</Link> */}
                    </div>
                </div>
            </div>
            <Footer/>
            <Copyright/>
        </>
    )
}

export default Order