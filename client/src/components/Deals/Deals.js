import {
  Container,
  Section1,
  Section2,
  Heading,
  SubSec,
  Section3,
  Button,
  Images,
  Img,
  Description,
  SubHeading,
  Name,
  H2
} from './DealsElements'
import Slider from "react-slick";
import { useState } from "react";
import { card } from "../../Data/Content";
const Deals = () => {
  const [slideIndex,setSlideIndex] = useState(0);
  const settings = {
      className:"center",
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 3,
      centerMode:true,
      beforeChange : (current,next) => setSlideIndex(next)
    };
    
  return ( 
      
      <Container>
          <Section1>
              <Heading>
                  Today Hot Deals
              </Heading>
              <H2>Get Your Meal</H2>
          </Section1>
          <Section2>
              <Slider {...settings}>
                  {
                      card.map((cardData,index)=>{
                          return(
                              <SubSec className={index === slideIndex ? 'slider sliderActive' : 'slider'} key={index}>
                                <Images>
                                  <Img src={cardData.img}/>
                                </Images>
                                    <div className="text">
                                      <Description>
                                        <SubHeading>Today Special Offer</SubHeading>
                                        <Name>{cardData.Name}</Name>
                                        <p>{cardData.price}</p>
                                      </Description>
                                    </div>
                              </SubSec>
                          )
                      })
                  }
              </Slider>
          </Section2>
          <Section3>
              <Button>Order Now</Button>
          </Section3>
      </Container>
   );
}

export default Deals;