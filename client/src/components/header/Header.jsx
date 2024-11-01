import logo from "../../assets/logo.png"
import "./header.css"
import { Link, Outlet, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from 'axios'

function Header(){

    const [data, setData] = useState([]);
    const [cinema, setCinema] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000").then((res) => {
            setData(res.data)
            setCinema(res.data[2])
          })
          .catch(err => console.log(err))
    }, [])

    const LogOut = () => {
        sessionStorage.removeItem("user")
        window.location.assign("/")
    }
    
    return(
        <>
            <header className="container-fluid shadow">
                <nav className="navbar navbar-expand-md">
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand"><img src={logo} alt="logo" width="40px" /></Link>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsedNavbar" aria-controls="collapsedNavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <   span className="navbar-toggler-icon"></span>
                        </button>
                        
                        <div className="navbar-collapse collapse" id="collapsedNavbar">
                            <ul className="navbar-nav mx-auto d-flex justify-content-around">
                                <li className="nav-item fw-semibold">
                                    <Link to="/introduction" className="nav-link text-center">Giới thiệu</Link>
                                </li>
                                <li className="nav-item fw-semibold">
                                    <Link to="/movies" className="nav-link text-center">Danh sách phim</Link>
                                </li>
                                <li className="nav-item fw-semibold">
                                    <Link to="/schedules" className="nav-link text-center">Lịch chiếu</Link>
                                </li>
                                <li className="nav-item fw-semibold">
                                    <Link to="/ticket" className="nav-link text-center">Giá vé</Link>
                                </li>
                                <li className="nav-item fw-semibold">
                                    <a href="#" className="nav-link text-center">Tin tức</a>
                                </li>
                                <li className="nav-item fw-semibold">
                                    <a href="#" className="nav-link text-center">Thành viên</a>
                                </li>
                            </ul>
                            <div className="d-flex flex-column gap-1">
                                <form action="">
                                    <select className="text-bg-danger form-select" aria-label="Default select example">
                                        {cinema.map((value, index) => {
                                            return (index == 0 
                                                ? <option key={index} className="text-bg-light" value={value.Name}>{value.Name}</option> 
                                                : <option key={index} className="text-bg-light" value={value.Name}>{value.Name}</option>) 
                                        })}
                                    </select>
                                </form>
                                {sessionStorage.getItem("user") 
                                ? 
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown">Xin chào, {JSON.parse(sessionStorage.getItem("user")).account}</button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#"><i className="fa-solid fa-user me-3"></i>Hồ sơ</a></li>
                                        <li><a className="dropdown-item" href="#"><i className="fa-regular fa-gem me-3"></i>Điểm thành viên</a></li>
                                        <li><hr className="dropdown-divider"/></li>
                                        <li><button onClick={LogOut} type="button" className="dropdown-item"><i className="fa-solid fa-arrow-right-from-bracket me-3"></i>Đăng xuất</button></li>
                                    </ul>
                                    </div>
                                : <Link to="/signin" className="btn btn-danger">Đăng nhập/ Đăng ký</Link>}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <Outlet></Outlet>
        </>
    )
}

export default Header;