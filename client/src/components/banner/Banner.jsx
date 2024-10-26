import banner from "../../assets/banner.png"
import "../banner/banner.css"

function Banner(){
    return(
        <>
            <div className="banner-wrapper">
                <a className="" href="#">
                    <img className="banner-img" src={banner} width="100%" alt="banner" />
                </a>
            </div>
        </> 
    );
}

export default Banner;