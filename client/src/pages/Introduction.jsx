import Header from "../components/header/Header"
import Banner from "../components/banner/Banner"
import Footer from "../components/footer/Footer"
import Copyright from "../components/copyright/Copyright"

import logo from "../assets/logo.png"

function Introduction(){
    return(
        <>
            <Banner></Banner>
            <Header></Header>
            <div className="container d-flex justify-content-center my-4">
                <img src={logo} alt="" width="350px"/>
            </div>
            <div className="container">
                <h2 className="text-danger">Ấn tượng đầu tiên</h2>
                <p>Naoki là thương hiệu rạp chiếu phim đẳng cấp hàng đầu, mang đến trải nghiệm giải trí đỉnh cao cho mọi khán giả. Được thiết kế với phong cách hiện đại, Naoki không chỉ là nơi thưởng thức điện ảnh mà còn là điểm đến lý tưởng để thư giãn, tận hưởng không gian và kết nối cảm xúc.</p><br />
                <p>Rạp chiếu phim Naoki đều được trang bị công nghệ tiên tiến nhất, từ hệ thống âm thanh Dolby Atmos sống động đến màn hình 4K siêu nét, đảm bảo mọi khung hình đều chân thực và sống động. Ghế ngồi tại rạp được thiết kế đặc biệt với chất liệu cao cấp, có thể điều chỉnh linh hoạt để mang lại sự thoải mái tối đa cho khán giả. Ngoài ra, không gian phòng chờ và quầy dịch vụ của Naoki được bài trí tinh tế, tạo cảm giác sang trọng và ấm cúng ngay từ khi bạn bước vào.</p><br />
                <p>Naoki không chỉ mang đến những bộ phim bom tấn quốc tế mà còn tích cực hỗ trợ các tác phẩm điện ảnh trong nước, giúp khán giả có cơ hội tiếp cận với nhiều thể loại phim phong phú. Bên cạnh đó, Naoki còn tổ chức các sự kiện đặc biệt như công chiếu phim ra mắt, gặp gỡ đạo diễn và diễn viên, hay các buổi chiếu phim theo chủ đề, đem lại trải nghiệm độc đáo cho cộng đồng yêu phim.</p><br />
                <p>Đặc biệt, Naoki luôn đặt lợi ích của khách hàng lên hàng đầu. Hệ thống đặt vé online tiện lợi, dịch vụ chăm sóc khách hàng tận tâm và nhiều chương trình ưu đãi hấp dẫn giúp rạp chiếu phim Naoki trở thành lựa chọn ưu tiên của hàng triệu khán giả.</p><br />
                <p>Không chỉ là một rạp chiếu phim, Naoki là nơi lưu giữ những cảm xúc, những khoảnh khắc khó quên bên gia đình và bạn bè. Hãy đến với Naoki để cảm nhận sự khác biệt và trải nghiệm hành trình điện ảnh tuyệt vời nhất!</p><br />
            </div>
            <Footer></Footer>
            <Copyright/>
        </>
    )
}

export default Introduction