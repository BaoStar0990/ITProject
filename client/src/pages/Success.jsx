import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import Header from '../components/header/Header'
import Banner from '../components/banner/Banner'
import Footer from '../components/footer/Footer'
import Copyright from '../components/copyright/Copyright'

import "./success.css"

function Success(){
    const navigate = useNavigate()
    const [second, setSecond] = useState(5)

    useEffect(() => {
        setTimeout(() => {
            setSecond(second => second - 1)
        }, 1000)

        if(second == 0){
            navigate("/")
        }
    }, [second])

    return(
        <>
            <Banner/>
            <Header/>
            <div className="d-flex flex-column align-items-center py-5 container">
                <div className="wrapper my-3"> 
                    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
                </div>
                <h1>Thanh toán thành công</h1>
                <p>Chuyển trang trong {second}</p>
            </div>
            <Footer/>
            <Copyright/>
        </>
    )
}

export default Success