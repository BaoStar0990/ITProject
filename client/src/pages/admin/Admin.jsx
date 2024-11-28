import Sidebar from "./components/Sidebar"

function Admin(){
    return(
        <>
            <div className="container-fluid">
                <div className="row p-3">
                    <div className="col-md-3">
                        <Sidebar/>
                    </div>
                    <div className="col-md-9">
                        <div className="fs-1 text-danger text-center my-3">KHU VỰC QUẢN LÝ RẠP CHIẾU PHIM</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin