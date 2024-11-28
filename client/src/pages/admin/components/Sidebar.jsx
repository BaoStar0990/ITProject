
import logo from "../../../assets/logo.png"
import { Link } from "react-router-dom"

function Sidebar(){
    return(
        <>
            <a className="btn btn-danger" href="/">Đăng xuất</a>

            <div className="container d-flex justify-content-center mt-5">
                <img src={logo} alt="logo" style={{width: "80%"}}/>
            </div>

            <div className="nav d-flex flex-column gap-5 mt-5">
                <Link className="btn btn-outline-danger" to="/admin/">Dashboard</Link>
                <Link className="btn btn-outline-danger" to="/admin/movie">Movie</Link>
                <Link className="btn btn-outline-danger" to="/admin/user">User</Link>
                <Link className="btn btn-outline-danger" to="/admin/order">Order</Link>
                <Link className="btn btn-outline-danger" to="/admin/room">Room</Link>
                <Link className="btn btn-outline-danger" to="/admin/showtime">Showtime</Link>
            </div>
        </>
    )
}

export default Sidebar