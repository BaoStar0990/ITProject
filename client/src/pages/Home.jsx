import Header from "../components/header/Header"
import Banner from "../components/banner/Banner"
import Footer from "../components/footer/Footer"
import FilmList from "../components/filmlist/FilmList"
import Copyright from "../components/copyright/Copyright"
import Slider from "../components/slider/Slider"

function Home(){
    return(
        <>
            <Banner></Banner>
            <Header></Header>
            <Slider></Slider>   
            <FilmList></FilmList>
            <Footer></Footer>
            <Copyright></Copyright>

        </>
    )
}

export default Home