import './filmlist.css'

import axios from 'axios'
import { useEffect, useState } from 'react'

import { Link, Outlet } from 'react-router-dom';

import Cookies from "js-cookie"


function FilmList(){

    const [data, setData] = useState([]);
    const [showData, setShowData] = useState([]);
    const [selectedRadio, setSelectedRadio] = useState("btnradio1");

    useEffect(() => {
        axios.get("http://localhost:8000").then((res) => {
            setData(res.data)
            setShowData(res.data[0])
          })
          .catch(err => console.log(err))
    }, [])

    const DuplicateMovie = () => {
        if(showData){
            const unique = showData.filter((obj, index, array) => {
                return (showData.findIndex((item) => {
                    return item.MovieID === obj.MovieID
                })) == index
            });
            return unique
            
        }
    }

    const ButtonAvailable = (date, id) => {
        return(!(new Date(date).getMonth() - new Date().getMonth()) 
        ? (JSON.parse(Cookies.get("user") == undefined) 
            ? <Link to="/signin" className="btn btn-danger">Mua vé</Link>
            : <Link to={`/moviedetail/${id}`} className="btn btn-danger">Mua vé</Link>
            ) 
        : <Link to="/" className="btn btn-danger d-none">Mua vé</Link>)
    }

    const MovieType = (id) => {
        if(showData){
            let id_array = DuplicateMovie().map((item) => {return item.MovieID})
            let temp = (id_array.find(x => x == id))
            let res = (showData.filter(x => x.MovieID == temp))
            return (res.map((item) => {return item.Type})).join(", ")
        }
    }

    return(
        <>
            <div className='my-5 d-flex justify-content-center'>
                <div className="btn-group btn-group-lg" role="group" aria-label="Basic radio toggle button group">
                    <input onChange={() => {setShowData(data[0]); setSelectedRadio("btnradio1")}} type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked={selectedRadio == "btnradio1"}/>
                    <label className="btn btn-outline-danger" htmlFor="btnradio1">Phim đang chiếu</label>

                    <input onChange={() => {setShowData(data[1]); setSelectedRadio("btnradio2")}} type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" checked={selectedRadio == "btnradio2"}/>
                    <label className="btn btn-outline-danger" htmlFor="btnradio2">Phim sắp chiếu</label>

                </div>
            </div>

            <div className="container mb-5" id='filmlist'>
                {/* <button onClick={res}>asasd</button> */}

                <div className="row row-gap-5">
                    {showData ? DuplicateMovie().map((film, index) => {
                        return(
                            <div className="col-xxl-3 col-xl-4 col-md-6" key={index}>
                                <div className="card mx-auto" style={{"width": "15rem"}}>
                                    {JSON.parse(Cookies.get("user") == undefined)
                                    ? <Link className="card-image-container" to={`/signin`}>
                                        <img src={film.MoviePoster} className="card-img-top" alt="poster" width="200px"/>
                                    </Link>
                                    : <Link className="card-image-container" to={`/moviedetail/${film.MovieID}`}>
                                        <img src={film.MoviePoster} className="card-img-top" alt="poster" width="200px"/>
                                    </Link>
                                    }
                                    <div className="card-body d-flex flex-column justify-content-between" style={{"height":"200px"}}>
                                        <div>
                                            <h5 className="card-title text-danger">{film.MovieName}</h5>
                                            <p className="card-text mb-0"><b>Thể loại: </b>{MovieType(film.MovieID)}</p>
                                            <p className="card-text"><b>Thời lượng: </b>{film.Duration} phút</p>
                                        </div>
                                        {ButtonAvailable(film.Movie_OpenTime, film.MovieID)}
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <>Loading...</>}

                </div>
            </div>
        </>
    )
}

export default FilmList;