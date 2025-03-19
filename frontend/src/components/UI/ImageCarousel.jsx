import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from 'styled-components';

// Images imports for VITE
import one from '../../assets/images/Carousel/one.webp';
import two from '../../assets/images/Carousel/two.png';
import three from '../../assets/images/Carousel/three.webp';
import four from '../../assets/images/Carousel/four.jpeg';

const CarouselContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const StyledCarousel = styled(Carousel)`
    .carousel .slide img {
        width: 100%;
        height: 450px;
        object-fit: cover;
        border-radius: 1rem;
    }

    @media( max-width: 768px){

        .carousel .slide img {
            height: 300px;
        }
    }
`;

export default function ImageCarousel() {
    const images = [one, two, three, four];

    return (
        <CarouselContainer>
            <StyledCarousel 
                autoPlay 
                interval={5000} 
                infiniteLoop 
                showArrows={false} 
                showThumbs={false} 
                showIndicators={false} 
                showStatus={false} 
                swipeable={false}
            >
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Image ${index + 1}`} />
                    </div>
                ))}
            </StyledCarousel>
        </CarouselContainer>
    );
};
