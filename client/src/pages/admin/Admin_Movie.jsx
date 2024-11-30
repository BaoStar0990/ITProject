import { useEffect, useState } from "react"
import Sidebar from "./components/Sidebar"

import axios from "axios"

function Admin_Movie(){
    const [movie, setMovie] = useState([])
    const [movieDetail, setMovieDetail] = useState([])
    const [movieType, setMovieType] = useState([])
    const [showMovieDetail, setShowMovieDetail] = useState()

    useEffect(() => {
        axios.get("http://localhost:8000/admin/movie").then((res) => {
            setMovie(res.data[0])
            setMovieDetail(res.data[1])
            setMovieType(res.data[2])
          })
          .catch(err => console.log(err))
    }, [])

    const getMovieDetail = (event) => {
        let res = (movieDetail.find((item) => {
            return item.MovieID == event.currentTarget.cells[1].innerHTML
        }))
        setShowMovieDetail(res)
    }

    const getTypeFields = (type, id) => {
        document.getElementById("editTypeID").value = id
        document.getElementById("editMovieType").value = type
    }

    const DateFormat = (date) => {
        let res = ""
        if(movie){
            res = new Date(date).getDate() < 10 
            ? (new Date(date).getMonth() < 9
                ? new Date(date).getFullYear() + "-0" + (new Date(date).getMonth() + 1) + "-0" + new Date(date).getDate() 
                : new Date(date).getFullYear() + "-" + (new Date(date).getMonth() + 1) + "-0" + new Date(date).getDate())
            : (new Date(date).getMonth() < 9
            ? new Date(date).getFullYear() + "-0" + (new Date(date).getMonth() + 1) + "-" + new Date(date).getDate()
            : new Date(date).getFullYear() + "-" + (new Date(date).getMonth() + 1) + "-" + new Date(date).getDate())
        }
        return res
    }

    const DuplicateMovieDetail = () => {
        if(movieDetail)
        {
            return movieDetail.filter((item, index, arr) => {
                return (index === arr.findIndex(obj => {
                    return(obj.MovieID == item.MovieID)
                }))
            })
        }
    }

    const MovieType = (id) => {
        if(movieDetail){
            const res = []
            for(let x of movieDetail.filter(item =>{return item.MovieID === id}).map(item => {return item.MovieTypeID})){
                res.push(movieType.find(item => {return item.MovieTypeID === x}))
            }
            return res.map(item => {return item.Type})
        }
    }

    const getFields = (id, name, open ,close, showMovieDetail) => {
        console.log(id)
        document.getElementById("editMovieid").value = id
        document.getElementById("editName").value = name
        document.getElementById("editStart_date").value = open
        document.getElementById("editEnd_date").value = close

        if(showMovieDetail){
            document.getElementById("editPoster").value = showMovieDetail.MoviePoster
            document.getElementById("editDescription").value = showMovieDetail.Description
            document.getElementById("editDirectors").value = showMovieDetail.Director
            document.getElementById("editDuration").value = showMovieDetail.Duration
            document.getElementById("editLanguage").value = showMovieDetail.Language
            document.getElementById("editSubtitle").value = showMovieDetail.Subtitle
            document.getElementById("editTrailer").value = showMovieDetail.Trailer
        }

        for(let i of document.getElementsByClassName("editType")){
            if(MovieType(id).includes(i.childNodes[1].innerHTML)){
                i.childNodes[0].checked = true
                i.childNodes[0].disabled = true
            }
            else{
                i.childNodes[0].checked = false
                i.childNodes[0].disabled = false
            }
        }
    

    }

    return(
        <>
            <div className="container-fluid">
                <div className="row p-3">
                    <div className="col-md-3">
                        <Sidebar/>
                    </div>
                    <div className="col-md-9">
                        <div className="fs-1 text-danger text-center my-3">KHU VỰC QUẢN LÝ RẠP CHIẾU PHIM</div>

                        <div className="container-fluid d-flex align-items-center justify-content-between">
                            <h2 className="text-danger">Phim rạp</h2>
                            <div className="">
                                <button className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#addMovieModal">Thêm phim</button>
                                <div className="modal fade fw-medium" id="addMovieModal" tabindex="-1" aria-labelledby="addCategoryModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <form action="http://localhost:8000/admin/movie" method="post">
                                                <input type="hidden" name="action" value="add_movie"/>
                                                <div className="modal-header">
                                                    <h5 className="modal-title fw-semibold" id="addCategoryModalLabel">Thêm phim</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                
                                                <div className="modal-body">
                                                <div className="mb-3">
                                                    <label for="name" className="form-label">Tên phim</label>
                                                    <input type="text" className="form-control" id="name" name="name" required/>
                                                </div>
                                                <div className="mb-3">
                                                    <label for="start_date" className="form-label">Ngày bắt đầu</label>
                                                    <input type="date" className="form-control" id="start_date" name="start_date" required/>
                                                </div>
                                                <div className="mb-3">
                                                    <label for="end_date" className="form-label">Ngày kết thúc</label>
                                                    <input type="date" className="form-control" id="end_date" name="end_date" required/>
                                                </div>
                                                <div className="mb-3">
                                                    <label for="poster" className="form-label">Áp phích</label>
                                                    <input type="text" className="form-control" id="poster" name="poster" required/>
                                                </div>
                                                <div className="mb-3">
                                                    <label for="description" className="form-label">Mô tả phim</label>
                                                    <textarea className="form-control" name="description" id="description" required></textarea>
                                                </div>
                                                <div className="mb-3">
                                                    <label for="directors" className="form-label">Đạo diễn</label>
                                                    <input type="text" className="form-control" id="directors" name="directors" required/>
                                                </div>
                                                <p>Thể loại</p>
                                                {movieType.map(item => {
                                                    return(
                                                        <>
                                                            <div className="form-check">
                                                                <input name="type" className="form-check-input bg-danger" type="checkbox" value={item.Type} id={item.Type}/>
                                                                <label className="form-check-label" for={item.Type}>
                                                                    {item.Type}
                                                                </label>
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                                <div className="mb-3">
                                                    <label for="duration" className="form-label">Thời lượng</label>
                                                    <input type="number" className="form-control" id="duration" name="duration" required/>
                                                </div>
                                                <div className="mb-3">
                                                    <label for="language" className="form-label">Ngôn ngữ</label>
                                                    <input type="text" className="form-control" id="language" name="language" required/>
                                                </div>
                                                <div className="mb-3">
                                                    <label for="subtitle" className="form-label">Phụ đề</label>
                                                    <input type="text" className="form-control" id="subtitle" name="subtitle" required/>
                                                </div>
                                                <div className="mb-3">
                                                    <label for="trailer" className="form-label">Trailer</label>
                                                    <input type="text" className="form-control" id="trailer" name="trailer" required/>
                                                </div>
                                                
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" className="btn btn-danger">Save</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr className="table-danger">
                                        <th></th>
                                        <th>ID</th>
                                        <th>Phim</th>
                                        <th>Ngày bắt đầu</th>
                                        <th>Ngày kết thúc</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {movie.length !=0 
                                    ? <>
                                        {movie.map((item) => {
                                            return(
                                                <>
                                                    <tr onClick={(e) => getMovieDetail(e)}>
                                                        <td className="d-flex gap-2">
                                                            <button onClick={() => getFields(item.MovieID, item.MovieName, DateFormat(item.Movie_OpenTime), DateFormat(item.Movie_CloseTime), showMovieDetail)} className="p-1 rounded bg-warning" data-bs-toggle="modal" data-bs-target="#editMovieModal"><i className="fa-solid fa-wrench"></i></button>

                                                            <form method="post" action="http://localhost:8000/admin/movie">
                                                                <input type="hidden" name="movieid" value={item.MovieID} />
                                                                <input type="hidden" name="action" value="delete_movie" />
                                                                <button className="p-1 rounded bg-danger"><i className="fa-solid fa-trash"></i></button>
                                                            </form>
                                                        </td>
                                                        <td>{item.MovieID}</td>
                                                        <td>{item.MovieName}</td>
                                                        <td>{DateFormat(item.Movie_OpenTime)}</td>
                                                        <td>{DateFormat(item.Movie_CloseTime)}</td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </>
                                    : <>Loading...</>
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="container-fluid d-flex align-items-center justify-content-between">
                            <h2 className="text-danger">Chi tiết phim</h2>
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr className="table-danger">
                                        {/* <th></th> */}
                                        <th>Áp phích</th>
                                        <th>Mô tả</th>
                                        <th>Đạo diễn</th>
                                        <th>Thể loại</th>
                                        <th>Thời lượng</th>
                                        <th>Ngôn ngữ</th>
                                        <th>Phụ đề</th>
                                        <th>Trailer</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {showMovieDetail
                                    ?
                                                    <tr>
                                                        <td><img src={showMovieDetail.MoviePoster} alt="" width="150px" /></td>
                                                        <td>{showMovieDetail.Description}</td>
                                                        <td>{showMovieDetail.Director}</td>
                                                        <td>{MovieType(showMovieDetail.MovieID).length > 0
                                                            ? MovieType(showMovieDetail.MovieID).map((item) => {
                                                                return (<>
                                                                    <form action="http://localhost:8000/admin/movie" method="post" className="d-flex mb-2">
                                                                        <input className="border border-0" type="text" name="detail_type" value={item} />
                                                                        <input type="hidden" name="action" value="delete_detail" />
                                                                        <button className="mx-3 p-1 rounded bg-danger"><i className="fa-solid fa-trash"></i></button>
                                                                    </form>
                                                                </>)
                                                            })
                                                            :<></>}</td>
                                                        <td>{showMovieDetail.Duration}</td>
                                                        <td>{showMovieDetail.Language}</td>
                                                        <td>{showMovieDetail.Subtitle}</td>
                                                        <td>{showMovieDetail.Trailer}</td>
                                                    </tr>
                                    : <>Loading...</>
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="container-fluid d-flex align-items-center justify-content-between">
                            <h2 className="text-danger">Thể loại phim</h2>
                            <div className="">
                                <button className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#addTypeModal">Thêm thể loại</button>
                                <div className="modal fade fw-medium" id="addTypeModal" tabindex="-1" aria-labelledby="addCategoryModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <form action="http://localhost:8000/admin/movie" method="post">
                                                <input type="hidden" name="action" value="add_type"/>
                                                <div className="modal-header">
                                                    <h5 className="modal-title fw-semibold" id="addCategoryModalLabel">Thêm thể loại</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                
                                                <div className="modal-body">
                                                <div className="mb-3">
                                                    <label for="type" className="form-label">Thể loại</label>
                                                    <input type="text" className="form-control" id="type" name="type" required/>
                                                </div>
                                                
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" className="btn btn-danger">Save</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr className="table-danger">
                                        <th></th>
                                        <th>ID</th>
                                        <th>Thể loại</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {movieType.length !=0 
                                    ? <>
                                        {movieType.map((item) => {
                                            return(
                                                <>
                                                    <tr>
                                                        <td className="d-flex gap-2">
                                                            <button className="p-1 rounded bg-warning" onClick={() => getTypeFields(item.Type, item.MovieTypeID)} data-bs-toggle="modal" data-bs-target="#editModal"><i className="fa-solid fa-wrench"></i></button>
                                                            <div className="modal fade fw-medium" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                                                                <div className="modal-dialog">
                                                                    <div className="modal-content">
                                                                        <form action="http://localhost:8000/admin/movie" method="post">
                                                                            <input type="hidden" name="action" value="edit_type"/>
                                                                            <input type="hidden" id="editTypeID" name="typeid" value=""/>
                                                                            <div className="modal-header">
                                                                            <h5 className="modal-title fw-semibold" id="editModalLabel">Sửa nhân viên</h5>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                            </div>
                                                                            
                                                                            <div className="modal-body">
                                                                            <div className="mb-3">
                                                                                <label for="editMovieType" className="form-label">Thể loại</label>
                                                                                <input type="text" className="form-control" id="editMovieType" name="type" required/>
                                                                            </div>
                                                                            

                                                                            </div>
                                                                            <div className="modal-footer">
                                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                <button type="submit" className="btn btn-danger">Save</button>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <form method="post" action="http://localhost:8000/admin/movie">
                                                                <input type="hidden" name="typeid" value={item.MovieTypeID} />
                                                                <input type="hidden" name="action" value="delete_type" />
                                                                <button className="p-1 rounded bg-danger"><i className="fa-solid fa-trash"></i></button>
                                                            </form>
                                                        </td>
                                                        <td>{item.MovieTypeID}</td>
                                                        <td>{item.Type}</td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </>
                                    : <>Loading...</>
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>

            <div className="modal fade fw-medium" id="editMovieModal" tabindex="-1" aria-labelledby="editMovieModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form action="http://localhost:8000/admin/movie" method="post">
                            <input type="hidden" name="action" value="edit_movie"/>
                            <input type="hidden" id="editMovieid" name="movieid"/>
                            <div className="modal-header">
                                <h5 className="modal-title fw-semibold" id="addCategoryModalLabel">Thêm thể loại</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            
                            <div className="modal-body">
                            <div className="mb-3">
                                <label for="editName" className="form-label">Tên phim</label>
                                <input type="text" className="form-control" id="editName" name="name" required/>
                            </div>
                            <div className="mb-3">
                                <label for="editStart_date" className="form-label">Ngày bắt đầu</label>
                                <input type="date" className="form-control" id="editStart_date" name="start_date" required/>
                            </div>
                            <div className="mb-3">
                                <label for="editEnd_date" className="form-label">Ngày kết thúc</label>
                                <input type="date" className="form-control" id="editEnd_date" name="end_date" required/>
                            </div>
                            <div className="mb-3">
                                <label for="editPoster" className="form-label">Áp phích</label>
                                <input type="text" className="form-control" id="editPoster" name="poster" required/>
                            </div>
                            <div className="mb-3">
                                <label for="editDescription" className="form-label">Mô tả phim</label>
                                <textarea className="form-control" name="description" id="editDescription" required></textarea>
                            </div>
                            <div className="mb-3">
                                <label for="editDirectors" className="form-label">Đạo diễn</label>
                                <input type="text" className="form-control" id="editDirectors" name="directors" required/>
                            </div>
                            <p>Thể loại</p>
                            {movieType.map(item => {
                                return(
                                    <>
                                        <div className="editType form-check">
                                            <input name="type" className="form-check-input bg-danger" type="checkbox" value={item.Type} id={`edit${item.Type}`}/>
                                            <label className="form-check-label" htmlFor={`edit${item.Type}`}>
                                                {item.Type}
                                            </label>
                                        </div>
                                    </>
                                )
                            })}
                            <div className="mb-3">
                                <label for="editDuration" className="form-label">Thời lượng</label>
                                <input type="number" className="form-control" id="editDuration" name="duration" required/>
                            </div>
                            <div className="mb-3">
                                <label for="editLanguage" className="form-label">Ngôn ngữ</label>
                                <input type="text" className="form-control" id="editLanguage" name="language" required/>
                            </div>
                            <div className="mb-3">
                                <label for="editSubtitle" className="form-label">Phụ đề</label>
                                <input type="text" className="form-control" id="editSubtitle" name="subtitle" required/>
                            </div>
                            <div className="mb-3">
                                <label for="editTrailer" className="form-label">Trailer</label>
                                <input type="text" className="form-control" id="editTrailer" name="trailer" required/>
                            </div>
                            
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-danger">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin_Movie