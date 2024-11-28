import logo from "../../assets/logo.png"

import { useEffect, useState } from 'react'
import { Form, Navigate, useNavigate } from "react-router-dom"

import axios from "axios";
import Cookies from "js-cookie";


function SignInForm(){
    const [selectedRadio, setSelectedRadio] = useState("btnradio1");
    const [signInForm, setSignInForm] = useState({"account" : "", "password" : "", action : "signin"})
    const [signUpData, setSignUpData] = useState({
        account: '',
        password: '',
        fullname: '',
        email: '',
        number: '',
        sex: 'Nam',
        date: '',
        action: 'signup'
      });

    const updateSignUp = (e) => {
        const { name, value } = e.target;
        setSignUpData({ ...signUpData, [name]: value });
    };

    const navigate = useNavigate()

    const updateSignIn = (e) => {
        setSignInForm({...signInForm, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(
            'http://localhost:8000/signin',
            { ...signUpData},
            { withCredentials: true } // This allows cookies to be sent
          );

          console.log(response)

          Cookies.set("user", JSON.stringify({
            userid : response.data[0].UserID,
            user : signUpData.fullname,
            number : signUpData.number,
            email : signUpData.email,
          }), { expires: 60 / 1440 });
          navigate('/', {state : {data : response.data}})

        } catch (error) {
          console.error('Error submitting form:', error.response?.data || error.message);
        }
      };

      const handleSignIn = async (e) => {
        e.preventDefault();
        if(signInForm.account === "admin" && signInForm.password === "admin"){
            navigate("/admin")
        }
        else{
            try {
                const response = await axios.post(
                  'http://localhost:8000/signin',
                  { ...signInForm},
                  { withCredentials: true } // This allows cookies to be sent
                );
      
                console.log(response)
                if(response.data.length == 0){
                  alert("Tài khoản không tồn tại")
                }
                else{
                  Cookies.set("user", JSON.stringify({
                      userid : response.data[0].UserID,
                      user : response.data[0].Fullname,
                      phonenumber : response.data[0].PhoneNumber,
                      email : response.data[0].Email
                    }), { expires: 60 / 1440 });
                    navigate('/', {state : {data : response.data}})
                }
      
      
              } catch (error) {
                console.error('Error submitting form:', error.response?.data || error.message);
              }
        }
      };

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
                        <form method="post" onSubmit={handleSignIn} className="d-flex align-items-center flex-column p-3" style={{"width" : "50%"}}>
                            <input type="hidden" name="action" value="signin" />
                            <div className="">
                                <img src={logo} alt="logo" width="150px"/>
                            </div>
                            <div className="form-floating mb-3 mt-5" style={{"width" : "100%"}}>
                                <input className="form-control" type="text" name="account" id="account" placeholder="account" onChange={updateSignIn}/>
                                <label className="form-label" htmlFor="account">Account</label>
                            </div>
                            <div className="form-floating" style={{"width" : "100%"}}>
                                <input className="form-control" type="password" name="password" id="password" placeholder="password" onChange={updateSignIn}/>
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
                                <form onSubmit={handleSubmit}>
                                    <input type="hidden" name="action" value="signup" />
                                    <div className="form-floating">
                                        <input className="form-control" type="text" name="account" id="account" placeholder="account" onChange={updateSignUp}/>
                                        <label htmlFor="account">Account</label>
                                    </div>
                                    <div className="form-floating">
                                        <input className="form-control my-3" type="text" name="password" id="password" placeholder="password" onChange={updateSignUp}/>
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <div className="form-floating">
                                        <input className="form-control" type="text" name="fullname" id="fullname" placeholder="fullname" onChange={updateSignUp}/>
                                        <label htmlFor="fullname">Full Name</label>
                                    </div>
                                    <div className="form-floating my-3">
                                        <input className="form-control" type="email" name="email" id="email" placeholder="email" onChange={updateSignUp}/>
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <div className="form-floating">
                                        <input className="form-control" type="text" name="number" id="number" placeholder="number" onChange={updateSignUp}/>
                                        <label htmlFor="number">Phone Number</label>
                                    </div>
                                    <div className="my-3 d-flex flex-column" style={{"width":"30%"}}>
                                        <label className="ms-1" htmlFor="date">Giới tính</label>
                                        <select name="sex" id="sex" className="form-select" aria-label="Default select example" onChange={updateSignUp}>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <label className="ms-1" htmlFor="date">Ngày sinh</label>
                                        <input className="p-2 rounded border border-0" type="date" name="date" id="date" onChange={updateSignUp}/>
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