import Carousel from 'react-bootstrap/Carousel';

function Banner() {
  return (
    <Carousel className='bg-dark'>
      <Carousel.Item>
        <img
          className="banner-img"
          height="620"
          width="100%"
          object-fit="cover"
          src="https://f.ptcdn.info/887/050/000/opbngmxmorGzq3CJ4xn-o.jpg"
          alt="First slide"
        />
        <Carousel.Caption className='carousel-caption'>
          <h3>Bill Gates</h3>
          <p>“When I wanted to learn something outside of school as a kid, cracking open my World Book encyclopedia was the best I could do. Today, all you have to do is go online.”</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="banner-img"
          height="620"
          width="100%"
          object-fit="cover"
          src="https://www.wallpaperup.com/uploads/wallpapers/2013/01/31/32236/9aa80ec4e473f395eea47565ef7191ec.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Barack Obama</h3>
          <p>“Technology is not a silver bullet. It’s only as good as the teachers … using it as one more tool to help inspire, and teach, and work through problems.”</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="banner-img"
          height="620"
          width="100%"
          object-fit="cover"
          src="https://images.pexels.com/photos/7120937/pexels-photo-7120937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Connie Malamed</h3>
          <p>
          “One of the most important areas we can develop as professionals is competence in accessing and sharing knowledge.”
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

  );
}

export default Banner;