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
import { Link } from 'react-router-dom';
const Deals = (props) => {
  const [slideIndex,setSlideIndex] = useState(0);
  const settings = {
      className:"center",
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 3,
      centerMode:true,
      beforeChange : (current,next) => setSlideIndex(next)
    };
    
  return ( 
      
      <Container id="Menu">
          <Section1>
              <Heading data-aos={"zoom-in"}>
                  Today Hot Deals
              </Heading>
              <H2 data-aos={"zoom-in-up"}>Get Your Meal</H2>
          </Section1>
          <Section2 data-aos={"zoom-out-up"}>
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
              <Link to="./Menu" className='btn' onClick={props.ScrollToTop1}><Button data-aos={"zoom-in-up"}>View Menu</Button></Link>
          </Section3>
      </Container>
   );
}

export default Deals;