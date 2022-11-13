import Carousel from 'react-bootstrap/Carousel';
import Banner1 from './univbanner1.png'
import Banner2 from './univbanner2.png'
import Banner3 from './univbanner3.png'

function Banner() {
  return (
    <Carousel variant="dark">
      <Carousel.Item>
        <img
          className="d-block"
          src={Banner1}
          alt="First slide"
          style={{height:'600px' ,width:'100%'}}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block"
          src={Banner2}
          alt="Second slide"
          style={{height:'600px' ,width:'100%'}}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block"
          src={Banner3}
          alt="Third slide"
          style={{height:'600px' ,width:'100%'}}
        />
      </Carousel.Item>
    </Carousel>

  );
}

export default Banner;