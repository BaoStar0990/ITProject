import logo from "../../assets/logo.png"

import { useEffect, useState } from 'react'
import { Form, Navigate, useNavigate } from "react-router-dom"

function SignInForm(){
    const [selectedRadio, setSelectedRadio] = useState("btnradio1");
    const [formValue, setFormValue] = useState({"account" : "", "password" : ""})

    const navigate = useNavigate()

    const updateValue = (e) => {
        setFormValue({...formValue, [e.target.name] : e.target.value})
    }

    const SignInSession = (e) => {
        console.log(formValue)
        sessionStorage.setItem("user", JSON.stringify(formValue))
        navigate("/")
    }

    return(
        <>
            <div className="container my-3">
                <div className='my-5 d-flex justify-content-center'>
                    <div className="btn-group btn-group-lg" role="group" aria-label="Basic radio toggle button group">
                        <input onChange={() => {setSelectedRadio("btnradio1")}} type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked={selectedRadio == "btnradio1"}/>
                        <label className="btn btn-outline-danger" htmlFor="btnradio1">Đăng nhập</label>
                        <input onChange={() => {setSelectedRadio("btnradio2")}} type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" checked={selectedRadio == "btnradio2"}/>
                        <label className="btn btn-outline-danger" htmlFor="btnradio2">Đăng ký</label>
                    </div>
                </div>

                {selectedRadio === "btnradio1"
                    ? <div className="d-flex justify-content-center">
                        <form method="post" onSubmit={SignInSession} className="d-flex align-items-center flex-column p-3" style={{"width" : "50%"}}>
                            <div className="">
                                <img src={logo} alt="logo" width="150px"/>
                            </div>
                            <div className="form-floating mb-3 mt-5" style={{"width" : "100%"}}>
                                <input className="form-control" type="text" name="account" id="account" placeholder="account" onChange={updateValue}/>
                                <label className="form-label" htmlFor="account">Account</label>
                            </div>
                            <div className="form-floating" style={{"width" : "100%"}}>
                                <input className="form-control" type="password" name="password" id="password" placeholder="password" onChange={updateValue}/>
                                <label className="form-label" htmlFor="password">Password</label>
                            </div>
                        
                            <div className="me-auto my-3">
                                <input type="checkbox" name="remember" id="remember" className="me-2"/>
                                <label htmlFor="remember">Nhớ mật khẩu</label>
                            </div>
                            <div className="me-auto ms-3">
                                <a href="" className="text-danger">Quên mật khẩu?</a>
                            </div>
                            <div className="mt-3">
                                <input className="btn btn-danger" type="submit" value="Đăng nhập" />
                            </div>
                        </form>
                    </div>
                    : <div className="d-flex justify-content-center">
                        <div className="row" style={{"width":"80%"}}>
                            <div className="col-md-6 d-flex justify-content-center align-items-center">
                                <div className="text-center my-3">
                                    <img src={logo} alt="" width="80%"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <form action="">
                                    <div className="form-floating">
                                        <input className="form-control" type="text" name="account" id="account" placeholder="account" />
                                        <label htmlFor="account">Account</label>
                                    </div>
                                    <div className="form-floating">
                                        <input className="form-control my-3" type="text" name="pasword" id="pasword" placeholder="pasword" />
                                        <label htmlFor="pasword">Password</label>
                                    </div>
                                    <div className="form-floating">
                                        <input className="form-control" type="text" name="fullname" id="fullname" placeholder="fullname" />
                                        <label htmlFor="fullname">Full Name</label>
                                    </div>
                                    <div className="form-floating my-3">
                                        <input className="form-control" type="email" name="email" id="email" placeholder="email" />
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <div className="form-floating">
                                        <input className="form-control" type="text" name="number" id="number" placeholder="number" />
                                        <label htmlFor="number">Phone Number</label>
                                    </div>
                                    <div className="my-3 d-flex flex-column" style={{"width":"30%"}}>
                                        <label className="ms-1" htmlFor="date">Giới tính</label>
                                        <select className="form-select" aria-label="Default select example">
                                            <option value="1">Nam</option>
                                            <option value="2">Nữ</option>
                                            <option value="3">Khác</option>
                                        </select>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <label className="ms-1" htmlFor="date">Ngày sinh</label>
                                        <input className="p-2 rounded border border-0" type="date" name="date" id="date" />
                                    </div>

                                    
                                    <div className="my-3 text-center">
                                        <input className="btn btn-danger" type="submit" value="Đăng ký" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    }
            </div>
        </>
    )
}

export default SignInForm