import Header from '../components/header/Header'
import Banner from '../components/banner/Banner'
import Footer from '../components/footer/Footer'
import Copyright from '../components/copyright/Copyright'
import FilmList from '../components/filmlist/FilmList'

function Movies(){
    return(
        <>
            <Banner/>
            <Header/>
            <FilmList/>
            <Footer/>
            <Copyright/>
        </>
    )
}

export default Movies