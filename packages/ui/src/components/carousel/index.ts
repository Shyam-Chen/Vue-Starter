import Carousel from './Carousel.vue';
import CarouselSlide from './CarouselSlide.vue';

Carousel.Slide = CarouselSlide;

export default Carousel as typeof Carousel & {
  Slide: typeof CarouselSlide;
};
