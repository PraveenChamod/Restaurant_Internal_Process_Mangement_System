import React, { useState } from "react";
import Background_Img from "../../Images/Background_Cover.png";
import styled from "styled-components";
import "./Testimonial.css";
import Rating from "@mui/material/Rating";
import Slider from "react-slick";

const Testimonials = (props) => {
  const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 90vh;
    /* position: relative;
        z-index: 1; */
    background: url(${Background_Img}) right center no-repeat;
    background-size: auto 100%;
    margin: 5% 0;
    @media screen and (max-width: 900px) {
      background-color: red;
      height: auto;
      background: none;
      flex-direction: column;
      align-items: center;
      justif-content: center;
      padding: 0;
    }
  `;
  const H1 = styled.div`
    letter-spacing: 0.1em;
    font-size: 2em;
    color: #b26c29;
    position: relative;
    text-align: center;
    margin: 1rem auto;
    @media screen and (max-width: 800px) {
      font-size: 1em;
    }
  `;
  const H2 = styled.h1`
    letter-spacing: 0.2em;
    font-size: 40px;
    font-weight: 500;
    color: #fff;
    text-align: center;
    @media screen and (max-width: 800px) {
      font-size: 1.2em;
    }
  `;
  const Sec = styled.div`
    flex-basis: 100%;
    margin: 5px 5px;
    width: 100%;
  `;
  const Sec2 = styled.div`
    border-radius: 25px;
    background: #1a1e21;
    width: 900px;
    height: 380px;
    margin: 10px 10px 10px 10px;
    padding: 10px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 3px 3px 3px #000;
    @media screen and (max-width: 900px) {
      width: 80%;
      height: 50%;
      background: none;
      flex-direction: column;
      align-items: center;
      justif-content: center;
      padding: 2% 5%;
    }
  `;

  const Div2 = styled.div`
    justify-content: center;
    align-items: center;
    text-align: center;
  `;

  const SubSec = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    margin-top: 5%;
    @media screen and (max-width: 800px) {
      height: 250px;
    }
  `;
  const P = styled.p`
    font-size: 1.1em;
    color: white;
    text-align: center;
    @media screen and (max-width: 900px) {
      font-size: 12px;
    }
  `;
  const [slideIndex, setSlideIndex] = useState(0);

  const settings = {
    className: "center",
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
    arrows: false,
  };

  return (
    <Container>
      <Sec>
        <H1 data-aos={"zoom-in"}>Testimonial</H1>
        <H2 data-aos={"zoom-in-up"} data-aos-duration={"1500"}>
          What They Are Saying
        </H2>
      </Sec>
      <Sec2 data-aos={"zoom-out-up"}>
        <Slider {...settings}>
          {props.data.map((review, index) => {
            return (
              <SubSec key={index}>
                <img
                  alt="person"
                  className="image1"
                  src={`http://localhost:5000/blogimages/${review.Customer.ProfileImage}`}
                  data-aos="zoom-in-down"
                  data-aos-duration="1500"
                />
                <P data-aos={"zoom-in"} data-aos-duration={"2000"}>
                  {review.Review}
                </P>
                <Div2>
                  <Rating
                    name="read-only"
                    value={review.Rate}
                    readOnly
                    size="large"
                  />
                </Div2>
                <P data-aos="fade-right">{review.Customer.Name}</P>
              </SubSec>
            );
          })}
        </Slider>
      </Sec2>
    </Container>
  );
};

export default Testimonials;
