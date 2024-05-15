
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
          <img src="image1.jpg" alt="Slide 1" />
        </div>
        <div>
          <img src="image2.jpg" alt="Slide 2" />
        </div>
        <div>
          <img src="image3.jpg" alt="Slide 3" />
        </div>
        {/* Add more slides as needed */}
      </Slider>
    );
  };
  
  export default SimpleCarousel;