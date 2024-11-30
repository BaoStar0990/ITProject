import Header from "../components/header/Header"
import Banner from "../components/banner/Banner"
import Footer from "../components/footer/Footer"
import Copyright from "../components/copyright/Copyright"

import logo from "../assets/logo.png"

function News(){
    return(
        <>
            <Banner></Banner>
            <Header></Header>
            <div className="container">
                <div className="container shadow rounded my-5 p-3">
                    <div className="row">
                        <div className="col-md-3 d-flex justify-content-center">
                            <img src={logo} alt="" width="200px"/>
                        </div>
                        <div className="col-md-9">
                            <h2><a href="#" className="link-danger link-underline-opacity-0">Ra mắt thương hiệu lần đầu</a></h2>
                            <p>Chào mừng bạn đến với MYLTA, thiên đường giải trí điện ảnh hiện đại, nơi mọi cảm xúc thăng hoa cùng từng thước phim. Với sứ mệnh mang đến những trải nghiệm điện ảnh đỉnh cao, MYLTA tự hào là thương hiệu rạp chiếu phim tiên phong về chất lượng hình ảnh, âm thanh và dịch vụ khách hàng tại Việt Nam.</p>
                        </div>
                    </div>
                </div>
                <div className="container shadow rounded my-5 p-3">
                    <div className="row">
                        <div className="col-md-3 d-flex justify-content-center">
                            <img src={logo} alt="" width="200px"/>
                        </div>
                        <div className="col-md-9">
                            <h2><a href="#" className="link-danger link-underline-opacity-0">Ra mắt thương hiệu lần đầu</a></h2>
                            <p>Chào mừng bạn đến với MYLTA, thiên đường giải trí điện ảnh hiện đại, nơi mọi cảm xúc thăng hoa cùng từng thước phim. Với sứ mệnh mang đến những trải nghiệm điện ảnh đỉnh cao, MYLTA tự hào là thương hiệu rạp chiếu phim tiên phong về chất lượng hình ảnh, âm thanh và dịch vụ khách hàng tại Việt Nam.</p>
                        </div>
                    </div>
                </div>
                <div className="container shadow rounded my-5 p-3">
                    <div className="row">
                        <div className="col-md-3 d-flex justify-content-center">
                            <img src={logo} alt="" width="200px"/>
                        </div>
                        <div className="col-md-9">
                            <h2><a href="#" className="link-danger link-underline-opacity-0">Ra mắt thương hiệu lần đầu</a></h2>
                            <p>Chào mừng bạn đến với MYLTA, thiên đường giải trí điện ảnh hiện đại, nơi mọi cảm xúc thăng hoa cùng từng thước phim. Với sứ mệnh mang đến những trải nghiệm điện ảnh đỉnh cao, MYLTA tự hào là thương hiệu rạp chiếu phim tiên phong về chất lượng hình ảnh, âm thanh và dịch vụ khách hàng tại Việt Nam.</p>
                        </div>
                    </div>
                </div>
                <div className="container shadow rounded my-5 p-3">
                    <div className="row">
                        <div className="col-md-3 d-flex justify-content-center">
                            <img src={logo} alt="" width="200px"/>
                        </div>
                        <div className="col-md-9">
                            <h2><a href="#" className="link-danger link-underline-opacity-0">Ra mắt thương hiệu lần đầu</a></h2>
                            <p>Chào mừng bạn đến với MYLTA, thiên đường giải trí điện ảnh hiện đại, nơi mọi cảm xúc thăng hoa cùng từng thước phim. Với sứ mệnh mang đến những trải nghiệm điện ảnh đỉnh cao, MYLTA tự hào là thương hiệu rạp chiếu phim tiên phong về chất lượng hình ảnh, âm thanh và dịch vụ khách hàng tại Việt Nam.</p>
                        </div>
                    </div>
                </div>
                
            </div>
            <Footer></Footer>
            <Copyright></Copyright>
        </>
    )
}

export default News