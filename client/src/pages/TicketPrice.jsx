import Header from "../components/header/Header"
import Banner from "../components/banner/Banner"
import Footer from "../components/footer/Footer"

function TicketPrice(){
    return(
        <>
            <Banner></Banner>
            <Header></Header>
            <div className="container my-5">
                <table className="table table-hover table-striped table-bordered">
                    <thead className="table-danger">
                        <tr>
                            <th>Ngày</th>
                            <th>Chương trình</th>
                            <th>Giá vé</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Thứ 2</td>
                            <td></td>
                            <td>60.000đ</td>
                        </tr>
                        <tr>
                            <td>Thứ 3</td>
                            <td>Xả xì trét - Tha hồ hét</td>
                            <td>45.000đ</td>
                        </tr>
                        <tr>
                            <td>Thứ 4</td>
                            <td></td>
                            <td>60.000đ</td>
                        </tr>
                        <tr>
                            <td>Thứ 5</td>
                            <td></td>
                            <td>60.000đ</td>
                        </tr>
                        <tr>
                            <td>Thứ 6</td>
                            <td></td>
                            <td>60.000đ</td>
                        </tr>
                        <tr>
                            <td>Cuối tuần</td>
                            <td></td>
                            <td>80.000đ</td>
                        </tr>
                    </tbody>
                </table>    
            </div>
            <Footer></Footer>
        </>
    )
}

export default TicketPrice