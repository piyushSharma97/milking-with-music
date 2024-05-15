
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slide1 from '../images/musiccow.jpg'
import Slide2 from '../images/milking2.jpg';
import Slide3 from '../images/millkcow3.jpg'
const SimpleCarousel = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    };
  
    return (
      <Slider {...settings}>
        <div>
          <img src={Slide1} alt="Slide 1" />
        </div>
        <div>
          <img src={Slide2} alt="Slide 2" />
        </div>
        <div>
          <img src={Slide3} alt="Slide 3" />
        </div>
        {/* Add more slides as needed */}
      </Slider>
    );
  };
  
  export default SimpleCarousel;