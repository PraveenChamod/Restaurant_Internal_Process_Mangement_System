import {
  Container,
  Section1,
  Section2,
  Heading,
  SubSec,
  Section3,
  Images,
  Img,
  Description,
  SubHeading,
  Name,
  H2
} from './DealsElements'
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { card } from "../../Data/Content";
import { Link } from 'react-router-dom';
import { RegularButton } from '../shared/SharedElements/Buttons';
const Deals = (props) => {
  const [slideIndex,setSlideIndex] = useState(0);
  const[view,setView] = useState(window.innerWidth >= 800 ? true : false);
  useEffect(()=>{
    const resize = ()=>{
      if(window.innerWidth >= 800){
          setView(true);
      }else{
          setView(false);
      }
    }
    window.addEventListener('resize',resize);
  })
  const[num,setNum] = useState(view ? 3 : 1)
  console.log(num);
  const settings = {
      className:"center",
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: num,
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
                      props.data.map((cardData,index)=>{
                          return(
                              <SubSec className={index === slideIndex ? 'slider sliderActive' : 'slider'} key={index}>
                                <Images>
                                  <Img src={`http://localhost:5000/offerimages/${cardData.OfferImage}`}/>
                                </Images>
                                    <div className="text">
                                      <Description>
                                        <SubHeading>Today Special Offer</SubHeading>
                                        <Name>{cardData.OfferName}</Name>
                                        <p>{cardData.SpecialPrice}</p>
                                      </Description>
                                    </div>
                              </SubSec>
                          )
                      })
                  }
              </Slider>
          </Section2>
          <Section3>
              <Link to="./Menu" className='btn' onClick={props.ScrollToTop1}><RegularButton data-aos={"zoom-in"}>View Menu</RegularButton></Link>
          </Section3>
      </Container>
   );
}

export default Deals;