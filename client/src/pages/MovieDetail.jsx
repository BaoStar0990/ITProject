import Header from '../components/header/Header'
import Banner from '../components/banner/Banner'
import Footer from '../components/footer/Footer'
import Copyright from '../components/copyright/Copyright'
import MovieDescription from '../components/moviedetail/MovieDescription'

import { useParams, Link } from 'react-router-dom'

import { useEffect, useState } from 'react'
import axios from 'axios'

function MovieDetail(){
    const [selectedRadio, setSelectedRadio] = useState("btnradio1");
    const [schedule, setSchedule] = useState([])
    const [time, setTime] = useState([])

    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/moviedetail/${id}`)
        .then((res) => {
            // setData(res.data)
            setSchedule(res.data[1])
        })
        .catch(err => console.log(err))
    }, [])

    const DuplicateDate = () => {
        if(schedule){
            const unique = schedule.filter((obj, index, array) => {
                return (schedule.findIndex((item) => {
                    return item.ShowDate === obj.ShowDate
                })) == index
            });
            return unique
            
        }
    }

    const Date_MovieTime = (date) => {
        if(schedule){
            const unique = schedule.filter((obj, index, array) => {
                return(new Date(obj.ShowDate).toLocaleDateString() ===  new Date(date).toLocaleDateString())
            });
            return unique
            
        }
    }
    
    return(
        <>
            <Banner/>
            <Header/>
            <MovieDescription/>
            <div className="container">
                <h2 className='text-center text-danger'>Khung giờ</h2>
                <div className="row">
                    <div className='my-5 d-flex justify-content-center col-md-4'>
                        {schedule.length > 0 
                        ? <div className="btn-group-vertical btn-group-lg" role="group" aria-label="Basic radio toggle button group">
                            {DuplicateDate().map((item, index) => {
                                return(
                                    <>
                                        <input onChange={() => {setSelectedRadio(item.ShowTimeID); setTime(Date_MovieTime(item.ShowDate))}} type="radio" className="btn-check" name="btnradio" id={item.ShowTimeID} autoComplete="off" checked={selectedRadio == item.ShowTimeID}/>
                                        <label key={index} className="btn btn-outline-danger" htmlFor={item.ShowTimeID}>{`${new Date(item.ShowDate).getDate()}/${new Date(item.ShowDate).getUTCMonth() + 1}`}</label>
                                    </>
                                )
                            })}
                        </div>
                        : <h1 className='text-center text-danger'>Không có lịch</h1>}
                    </div>
                    <div className="col-md-8 my-auto">
                        <div className="row">
                            {time.length > 0 
                            ? time.map((item, index) => {
                                return(
                                    <div className="d-flex flex-column justify-content-center align-items-center col-3">
                                        <Link to="/movies/id_demo/order" className="btn btn-outline-danger">{`${item.ShowTime}`}</Link>
                                        <p>80 chỗ trống</p>
                                    </div>
                                )
                            })
                            : <h1 className='text-center text-danger'>Chọn khung giờ</h1>
                            }
                            
                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            <Copyright/>
        </>
    )
}

export default MovieDetail