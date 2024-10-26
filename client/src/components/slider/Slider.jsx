// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import '../../../node_modules/swiper/'
import './slider.css';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

function Slider(){
    return(
        <>
            <div className="my-3 container-fluid slider-wrapper p-0">
                <Swiper
                    cssMode={true}
                    navigation={true}
                    pagination={true}
                    mousewheel={true}
                    keyboard={true}
                    rewind={true}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                    className="mySwiper">
                    <SwiperSlide><a href="#" className="slider-link"><img className="slider-img" src="/sliderimages/spiderverse.png" alt="slider" /></a></SwiperSlide>
                    <SwiperSlide><a href="#" className="slider-link"><img className="slider-img" src="/sliderimages/it2.png" alt="slider" /></a></SwiperSlide>
                    <SwiperSlide><a href="#" className="slider-link"><img className="slider-img" src="/sliderimages/spiderverse.png" alt="slider" /></a></SwiperSlide>
                    <SwiperSlide><a href="#" className="slider-link"><img className="slider-img" src="/sliderimages/it2.png" alt="" /></a></SwiperSlide>
                    <SwiperSlide><a href="#" className="slider-link"><img className="slider-img" src="/sliderimages/spiderverse.png" alt="slider" /></a></SwiperSlide>
                    <SwiperSlide><a href="#" className="slider-link"><img className="slider-img" src="/sliderimages/it2.png" alt="slider" /></a></SwiperSlide>
                </Swiper>
            </div>
        </>
    )
}

export default Slider;