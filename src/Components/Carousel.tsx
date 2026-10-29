import { Carousel as BootstrapCarousel } from 'react-bootstrap';
import Slide1 from '../images/musiccow.jpg';
import Slide2 from '../images/milking2.jpg';
import Slide3 from '../images/millkcow3.jpg';

const slides = [Slide1, Slide2, Slide3];

/** Displays the application's promotional images in a Bootstrap carousel. */
const SimpleCarousel = (): JSX.Element => (
  <div className="carousel-container">
    <BootstrapCarousel>
      {slides.map((image, index) => (
        <BootstrapCarousel.Item key={image}>
          <img
            className="d-block carousel-image w-100"
            src={image}
            alt={`Slide ${index + 1}`}
          />
        </BootstrapCarousel.Item>
      ))}
    </BootstrapCarousel>
  </div>
);

export default SimpleCarousel;
