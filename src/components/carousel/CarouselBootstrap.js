import Carousel from "react-bootstrap/Carousel";

function CarouselBootsrap({ props }) {
  return (
    <Carousel fade>
      <Carousel.Item>{props}</Carousel.Item>
    </Carousel>
  );
}

export default CarouselBootsrap;
