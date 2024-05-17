import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import Slide1 from '../images/musiccow.jpg'
import Slide2 from '../images/milking2.jpg';
import Slide3 from '../images/millkcow3.jpg'
const SimpleCarousel = () => {
  const [index, setIndex] = useState(0);
  const images = [Slide1, Slide2, Slide3]
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Change interval duration as needed (milliseconds)

    return () => clearInterval(intervalId);
  }, [images.length]);
  return (
    <div className="carousel-container">
      <Carousel>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img className="d-block carousel-image w-100" src={image} alt={`Slide ${index + 1}`} />

          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default SimpleCarousel;