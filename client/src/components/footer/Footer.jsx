import "./footer.css"
import logo from "../../assets/logo.png"
import confirm from "../../assets/bocongthuong.png"


function Footer(){

    // var date = new Date().getFullYear();
    // console.log(date);
    return(
        <>
            <footer className="container-fluid m-0 row text-bg-dark p-4">
                <div className="col-md-3 d-flex flex-column">
                    <div className="mb-5 d-flex justify-content-center align-items-center" style={{height: "90px"}}>
                        <img className="" src={logo} alt="logo" width="100px"/>
                    </div>
                    

                    <div className="mb-5 d-flex flex-column">
                        <a className="text-light text-decoration-none fs-5" href="/introduction">Giới thiệu</a>
                        <a className="text-light text-decoration-none fs-5" href="tel:0982857656">Liên hệ</a>
                    </div>

                    <img className="mb-3 mx-auto" src={confirm} alt="logo" width="200px"/>
                </div>

                <div className="col-md-3 d-flex flex-column">
                    <div className="d-flex align-items-end" style={{height: "75px"}}>
                        <h3>Quy định và điều khoản</h3>
                    </div>
                    
                    <div style={{height: "0.75rem"}} className="container-fluid bg-danger rounded"></div>

                    <div className="my-5 d-flex flex-column">
                        <a className="text-light text-decoration-none fs-5" href="#">Quy định chung</a>
                        <a className="text-light text-decoration-none fs-5" href="#">Quy định thành viên</a>
                        <a className="text-light text-decoration-none fs-5" href="#">Điều khoản</a>
                        <a className="text-light text-decoration-none fs-5" href="#">Câu hỏi thường gặp</a>
                    </div>
                </div>
                <div className="col-md-3 d-flex flex-column">
                    <div className="d-flex align-items-end" style={{height: "75px"}}>
                        <h3>Lịch làm việc</h3>
                    </div>
                    
                    <div style={{height: "0.75rem"}} className="container-fluid bg-danger rounded"></div>

                    <div className="my-5 d-flex flex-column ">
                        <p className="text-light text-decoration-none fs-5 mb-0"><b>Giờ làm việc:</b> 8h - 1h sáng 
                        ngày sau (bao gồm Lễ, Tết)</p>
                        <p className="text-light text-decoration-none fs-5 mb-0"><b>Email hỗ trợ: </b>
                        email@gmail.com</p>
                        <p className="text-light text-decoration-none fs-5">Hotline: 1900 1900</p>
                    </div>
                </div>

                <div className="col-md-3 d-flex flex-column">
                    <div className="d-flex align-items-end" style={{height: "75px"}}>
                        <h3>Kết nối với chúng tôi</h3>
                    </div>
                    
                    <div style={{height: "0.75rem"}} className="container-fluid bg-danger rounded"></div>

                    <div className="my-3 d-flex fs-1">
                        <a className="text-light me-3" href="#">
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                        <a className="text-light me-3" href="#">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a className="text-light me-3" href="#">
                            <i className="fa-brands fa-tiktok"></i>
                        </a>
                        <a className="text-light me-3" href="#">
                            <i className="fa-brands fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );

}

export default Footer;