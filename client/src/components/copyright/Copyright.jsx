import logo from '../../assets/logo.png'

function Copyright(){
    return(
        <>
            {/* <div className="container-fluid py-2 text-bg-dark d-flex flex-column-md justify-content-center align-items-center" id="copyright">
                <h2 className='me-3 text-center'>Copyright &copy; 2024. All rules belong to</h2>
                <img className='my-2' src={logo} alt="logo" width="100px"/>
            </div> */}
            <div className="row container-fluid py-2 text-bg-dark mx-0 border-top">
                <div className="col-md-8 text-center"><h2 className='my-3'>Copyright &copy; 2024. All rules belong to</h2></div>
                <div className="col-md-4 text-center"><img className='my-2' src={logo} alt="logo" width="100px"/></div>
            </div>
        </>
    )
}

export default Copyright