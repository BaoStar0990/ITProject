import Header from '../components/header/Header'
import Banner from '../components/banner/Banner'
import Footer from '../components/footer/Footer'
import Copyright from '../components/copyright/Copyright'

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Cookies from "js-cookie"

import axios from 'axios'

function Confirm(){
    const [formData, setFormData] = useState({
        userid : JSON.parse(Cookies.get("user")).userid,
        showtimeid : 0,
        movieid : 0,
        chairs : [],
        bill : 0,
        payment : ""
    })

    const navigate = useNavigate()
    const {id} = useParams()

    const location = useLocation()
    const {movie, seats, total} = location.state;
    // console.log(location.state)

    useEffect(() => {
        setFormData(formData =>  { return {...formData, showtimeid : movie[0].showtimeid, movieid : movie[0].movieid, chairs : seats, bill : total}})
    }, [])
    // console.log(formData)


    const FormatDate = (inp) => {
        if(inp){
            let date = new Date(inp.showdate)
            return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
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

    const ChoosePayment = (e) => {
        setFormData(formData => {return {...formData, payment : e.target.value}})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/moviedetail/${id}/confirm`, formData)
            navigate(`/moviedetail/${id}/success`)
          
        } catch (error) {
            console.error("There was an error submitting the form!", error);
        }
      };

    return(
        <>
            <Banner/>
            <Header/>
            <div className='container my-3'>
                <div className="row">
                    <div className="col-md-6 mt-3 d-flex flex-column justify-content-center">
                        <img src={movie[0].movieposter} className='mx-auto mb-4' alt="poster" width="50%"/>
                        <h3>{movie[0].moviename}</h3>
                        <p><b>Thể loại : </b>{MovieType(movie)}</p>
                        <p><b>Thời lượng : </b>{movie[0].duration} phút</p>
                        <p><b>Ngày chiếu : </b>{movie[0].showtime}</p>
                        <p><b>Giờ chiếu : </b>{FormatDate(movie[0])}</p>
                        <p><b>Phòng chiếu : </b>{movie[0].name}</p>
                        <p><b>Ghế ngồi : </b>{seats.map((item, index) => {
                            if(index < seats.length - 1)
                                return item + ", "
                            return item
                        })}</p>
                    </div>
                    <div className="col-md-6 mt-3 d-flex flex-column justify-content-center">
                        <div id='receipt'>
                            <form onSubmit={handleSubmit}>
                                <h1 className='text-danger'><i className="fa-regular fa-clipboard"></i> Thông tin hóa đơn</h1>
                                <p><b>Khách hàng : </b>{JSON.parse(Cookies.get("user")).user}</p>
                                <p><b>Email : </b>{JSON.parse(Cookies.get("user")).email}</p>
                                <label className='me-2' htmlFor="bill">Tổng hóa đơn</label>
                                <input className='border border-0' type="text" name='bill' id='bill' defaultValue={total} readOnly/>
                                <h1 className='text-danger'><i className="fa-solid fa-credit-card"></i> Phương thức thanh toán</h1>
                                {/* <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        VNPAY
                                    </label>
                                </div> */}
                                <div className="form-check">
                                    <input onClick={ChoosePayment} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="MoMo" required="required"/>
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        MoMo
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input onClick={ChoosePayment} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="ZaloPay"/>
                                    <label className="form-check-label" htmlFor="flexRadioDefault3">
                                        ZaloPay
                                    </label>
                                </div>
                                {/* <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" value="ATM"/>
                                    <label className="form-check-label" htmlFor="flexRadioDefault4">
                                        Thẻ nội địa
                                    </label>
                                </div> */}
                                {/* <Link to="/moviedetail/8/success" className='btn btn-danger'>Xác nhận thanh toán</Link> */}
                                <input type="submit" id='confirm' className='btn btn-danger' value="Xác nhận thanh toán"/>
                            </form>
                        </div>
                        {/* <div id='qr' className='d-flex align-items-center flex-column d-none'>
                            <h1 className='text-danger text-center'>Quét mã thanh toán</h1>
                            <img src="https://homepage.momocdn.net/blogscontents/momo-upload-api-220808102122-637955508824191258.png" alt="" width="70%"/>
                            <button style={{width:"50%"}} id='confirm' onClick={ShowReceipt} className='btn btn-danger my-3 mx-auto' type="button">Quay lại</button>
                        </div> */}
                    </div>
                </div>
            </div>
            <Footer/>
            <Copyright/>
        </>
    )
}

export default Confirm