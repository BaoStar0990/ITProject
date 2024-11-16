import { useParams, Link } from 'react-router-dom'

import { useEffect, useState } from 'react'
import axios from 'axios'

function MovieDescription()
{
    const [data, setData] = useState([])
    const [movieDetail, setMovieDetail] = useState([])
    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/moviedetail/${id}`)
        .then((res) => {
            setData(res.data)
            setMovieDetail(res.data[0])
        })
        .catch(err => console.log(err))
    }, [])

    const DuplicateMovie = () => {
        if(movieDetail){
            const unique = movieDetail.filter((obj, index, array) => {
                return (movieDetail.findIndex((item) => {
                    return item.MovieID === obj.MovieID
                })) == index
            });
            return unique
            
        }
    }

    const MovieType = (id) => {
        if(movieDetail){
            let id_array = DuplicateMovie().map((item) => {return item.MovieID})
            let temp = (id_array.find(x => x == id))
            let res = (movieDetail.filter(x => x.MovieID == temp))
            return (res.map((item) => {return item.Type})).join(", ")
        }
    }


    return(
        <>
            {movieDetail ? 
                DuplicateMovie().map((detail, index) => {
                    return(
                        <>
                            <div className="container-fluid text-center my-3 py-3 bg-dark">
                            <h1 className='text-center text-danger'>Trailer</h1>
                            <iframe width="80%" height="600px" src={detail.Trailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6 text-center">
                                        <img src={detail.MoviePoster} alt="poster" width="300px"/>
                                    </div>
                                    <div className="col-md-6 d-flex justify-content-center flex-column my-3">
                                        <h2>{detail.MovieName}</h2>
                                        <p><b>Ngày phát hành : </b>{new Date(detail.Movie_OpenTime).toLocaleDateString()}</p>
                                        <p><b>Đạo diễn : </b>{detail.Director}</p>
                                        <p><b>Thời lượng : </b>{detail.Duration} phút</p>
                                        <p><b>Ngôn ngữ : </b>{detail.Language}</p>
                                        <p><b>Phụ đề : </b>{detail.Subtitle}</p>
                                        <p><b>Thể loại : </b>{MovieType(detail.MovieID)}</p>
                                    </div>
                                </div>
                                <div className="my-4">
                                    <h3>Tóm tắt</h3>
                                    <p>{detail.Description}</p>
                                </div>
                            </div>
                        </>
                    )
                })
            : <h1>Loading</h1>
            }
        </>
    )
}

export default MovieDescription