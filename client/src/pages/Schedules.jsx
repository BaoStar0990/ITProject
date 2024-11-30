import Header from '../components/header/Header'
import Banner from '../components/banner/Banner'
import Footer from '../components/footer/Footer'
import Copyright from '../components/copyright/Copyright'
import { useEffect, useState } from 'react'
import axios from "axios"

import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"


function Schedules(){
    const [schedule, setSchedule] = useState([])
    const [showedMovie, setShowedMovie] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:8000/schedules").then(res => {
            setSchedule(res.data)
        })
    }, [])

    const Last7Days = () => {
        let temp = []
        
        for(let i = 0; i <= 6;i++){
            var date = new Date();
        
            date.setDate(date.getDate() + i);
            temp.push(`${date.getMonth() + 1}/${date.getDate()}`)
        }
        return temp
    }

    const set_showed_movie = (date) => {
        let temp = []
        for(let x of schedule){
            if(new Date(x.showdate).getDate() === new Date(date).getDate()){
                temp.push(x)
            }
        }
        setShowedMovie(temp)
    }

    const handleSubmit = (e, item) => {
        e.preventDefault();
        
        if(!Cookies.get("user")){
            navigate("/signin")
        }
        else{
            axios
            .post(`http://localhost:8000/moviedetail/${item.movieid}/order`, {
                "showdate": item.showdate,
                "showtime": item.showtime,
                "showtimeid": item.showtimeid,
                "room" : item.roomid
            })
            .then((response) => {
                navigate(`/moviedetail/${item.movieid}/order`, { state: { data : response.data } });
            })
            .catch((error) => {
                console.error('There was an error!', error);
                setResponseMessage('There was an error submitting the form.');
            });
        }
        
    };

    const DuplicateMovie = (movie) => {
        return(
            movie.filter((item, index, arr) => {
                return(index === arr.findIndex(obj => {return obj.movieid == item.movieid}))
            })
        )
    }

    const DuplicateType = (id) => {
        return(new Set(showedMovie.filter(item => {return item.movieid == id}).map(item => {return item.type})))
    }

    const DuplicateShowTime = (id) => {
        return(showedMovie.filter(item => {return(item.movieid == id)}).filter((item, index, arr) => {
            return(index === arr.findIndex(obj => {return obj.showtimeid == item.showtimeid}))
        }))
    }

    console.log(DuplicateShowTime(3).sort(function(a,b){return a.showtime.split(":")[0] - b.showtime.split(":")[0]}))



    return(
        <>
            <Banner/>
            <Header/>
            <div className="container">
                <h1 className='text-danger text-center mt-5'>Lịch chiếu</h1>
                <div className='my-5 d-flex justify-content-center'>
                    <div className="btn-group btn-group-lg" role="group" aria-label="Basic radio toggle button group">
                        {Last7Days().map(item => {
                            return <>
                                <input type="radio" className="btn-check" name="btnradio" id={item} autoComplete="off" onClick={() => set_showed_movie(item)}/>
                                <label className="btn btn-outline-danger" htmlFor={item}>{`${new Date(item).getDate()}/${new Date(item).getMonth() + 1}`}</label>
                            </>
                        })}
                    </div>
                </div>
           </div>
           <div className="container">
                {showedMovie.length > 0
                ? DuplicateMovie(showedMovie).map(item => {
                    return <>
                        <div className="container my-4 shadow p-0 rounded">
                            <div className="row">
                                <div className="col-lg-3">
                                    <img src={item.movieposter} alt=""  width="200px"/>
                                </div>
                                <div className="col-lg-9">
                                    <h2 className='text-danger'>{item.moviename}</h2>
                                    <p><b>Thể loại :</b> {[...DuplicateType(item.movieid)].join(", ")}</p>
                                    <p><b>Thời lượng :</b> {item.duration} phút</p>
                                    <div className="container-fluid d-flex gap-4">
                                        {DuplicateShowTime(item.movieid).sort(function(a,b){return a.showtime.split(":")[0] - b.showtime.split(":")[0]}).map(movie => {
                                            return <>
                                                <form onSubmit={(e) => handleSubmit(e, movie)}>
                                                    <input type="hidden" name="showdate" value={movie.showdate} />
                                                    <input type="hidden" name="movie" value={movie.movieid} />
                                                    <input type="hidden" name="showtime" value={movie.showtime} />
                                                    <input type="hidden" name="showtimeid" value={movie.showtimeid} />
                                                    <input type="hidden" name="room" value={movie.roomid} />
                                                    <input className='btn btn-outline-danger rounded' type="submit" value={movie.showtime} />
                                                </form>
                                            </>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                })
                :<>Không có suất chiếu...</>}
           </div>
            <Footer/>
            <Copyright/>
        </>
    )
}

export default Schedules