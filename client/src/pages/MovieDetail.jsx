import Header from '../components/header/Header'
import Banner from '../components/banner/Banner'
import Footer from '../components/footer/Footer'
import Copyright from '../components/copyright/Copyright'

import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react'

function MovieDetail(){
    const [selectedRadio, setSelectedRadio] = useState("btnradio1");

    
    return(
        <>
            <Banner/>
            <Header/>
            <div className="container-fluid text-center my-3 py-3 bg-dark">
                <h1 className='text-center text-danger'>Trailer</h1>
                <iframe style={{"width":"80%"}} height="600px" className='' src="https://mega.nz/embed/XcM0GCCa#CZ5uRqUekPumjVm6ZZxhioJTPEdg7FbCIdGylRos5zA" allowFullScreen allow="autoplay;"></iframe>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-center">
                        <img src="/movieposter/venom3.jpg" alt="poster" width="300px"/>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center flex-column my-3">
                        <h2>Venom 3 : Kèo cuối</h2>
                        <p><b>Ngày phát hành : </b>24/12/2024</p>
                        <p><b>Đạo diễn : </b>Châu Tinh Trì</p>
                        <p><b>Thời lượng : </b>120 phút</p>
                        <p><b>Ngôn ngữ : </b>Tiếng Anh</p>
                        <p><b>Phụ đề : </b>Tiếng Việt</p>
                        <p><b>Thể loại : </b>Hài hước, Hành động</p>
                    </div>
                </div>
                <div className="my-4">
                    <h3>Tóm tắt</h3>
                    <p>Venom/Eddie Brock của Tom Hardy là một trong những nhân vật được yêu mến nhất thế giới siêu anh hùng với hai phần phim đều thắng đậm phòng vé. Vào cuối năm, anh chàng sẽ tái xuất trong bom tấn Venom: The Last Dance (Tựa Việt: Venom: Kèo Cuối) và phải đối mặt với kẻ thù lớn nhất từ trước đến nay - toàn bộ chủng tộc Symbiote. Đây sẽ là phần phim cuối cùng và cũng là hoành tráng nhất về nhân vật này.</p>
                </div>
            </div>
            <div className="container">
                <h2 className='text-center text-danger'>Khung giờ</h2>
                <div className="row">
                    <div className='my-5 d-flex justify-content-center col-md-4'>
                        <div className="btn-group-vertical btn-group-lg" role="group" aria-label="Basic radio toggle button group">
                            <input onChange={() => {setSelectedRadio("btnradio1")}} type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked={selectedRadio == "btnradio1"}/>
                            <label className="btn btn-outline-danger" htmlFor="btnradio1">21/10</label>

                            <input onChange={() => {setSelectedRadio("btnradio2")}} type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" checked={selectedRadio == "btnradio2"}/>
                            <label className="btn btn-outline-danger" htmlFor="btnradio2">22/10</label>

                            <input onChange={() => {setSelectedRadio("btnradio3")}} type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" checked={selectedRadio == "btnradio3"}/>
                            <label className="btn btn-outline-danger" htmlFor="btnradio3">23/10</label>

                            <input onChange={() => {setSelectedRadio("btnradio4")}} type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off" checked={selectedRadio == "btnradio4"}/>
                            <label className="btn btn-outline-danger" htmlFor="btnradio4">24/10</label>

                            <input onChange={() => {setSelectedRadio("btnradio5")}} type="radio" className="btn-check" name="btnradio" id="btnradio5" autoComplete="off" checked={selectedRadio == "btnradio5"}/>
                            <label className="btn btn-outline-danger" htmlFor="btnradio5">25/10</label>

                            <input onChange={() => {setSelectedRadio("btnradio6")}} type="radio" className="btn-check" name="btnradio" id="btnradio6" autoComplete="off" checked={selectedRadio == "btnradio6"}/>
                            <label className="btn btn-outline-danger" htmlFor="btnradio6">26/10</label>

                            <input onChange={() => {setSelectedRadio("btnradio7")}} type="radio" className="btn-check" name="btnradio" id="btnradio7" autoComplete="off" checked={selectedRadio == "btnradio7"}/>
                            <label className="btn btn-outline-danger" htmlFor="btnradio7">27/10</label>

                        </div>
                    </div>
                    <div className="col-md-8 my-auto">
                        <div className="row">
                            <div className="d-flex flex-column justify-content-center align-items-center col-3">
                                <Link to="/movies/id_demo/order" className="btn btn-outline-danger">11 : 03</Link>
                                <p>80 chỗ trống</p>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center col-3">
                                <Link to="/movies/id_demo/order" className="btn btn-outline-danger">11 : 03</Link>
                                <p>80 chỗ trống</p>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center col-3">
                                <Link to="/movies/id_demo/order" className="btn btn-outline-danger">11 : 03</Link>
                                <p>80 chỗ trống</p>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center col-3">
                                <Link to="/movies/id_demo/order" className="btn btn-outline-danger">11 : 03</Link>
                                <p>80 chỗ trống</p>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center col-3">
                                <Link to="/movies/id_demo/order" className="btn btn-outline-danger">11 : 03</Link>
                                <p>80 chỗ trống</p>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center col-3">
                                <Link to="/movies/id_demo/order" className="btn btn-outline-danger">11 : 03</Link>
                                <p>80 chỗ trống</p>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center col-3">
                                <Link to="/movies/id_demo/order" className="btn btn-outline-danger">11 : 03</Link>
                                <p>80 chỗ trống</p>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center col-3">
                                <Link to="/movies/id_demo/order" className="btn btn-outline-danger">11 : 03</Link>
                                <p>80 chỗ trống</p>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center col-3">
                                <Link to="/movies/id_demo/order" className="btn btn-outline-danger">11 : 03</Link>
                                <p>80 chỗ trống</p>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center col-3">
                                <Link to="/movies/id_demo/order" className="btn btn-outline-danger">11 : 03</Link>
                                <p>80 chỗ trống</p>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center col-3">
                                <Link to="/movies/id_demo/order" className="btn btn-outline-danger">11 : 03</Link>
                                <p>80 chỗ trống</p>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center col-3">
                                <Link to="/movies/id_demo/order" className="btn btn-outline-danger">11 : 03</Link>
                                <p>80 chỗ trống</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            <Copyright/>
        </>
    )
}

export default MovieDetail