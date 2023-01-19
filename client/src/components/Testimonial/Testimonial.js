import React from 'react';
import Background_Img from '../../Images/Background_Cover.png';
import styled from "styled-components";
import './Testimonial.css';

const Testimonials = () => {

    const Container = styled.div`
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 90vh;
        /* position: relative;
        z-index: 1; */
        background: 
            url(${Background_Img}) right center no-repeat;
        background-size: auto 100%;
        padding: 5px;
        @media screen and (max-width:900px){
            background-color: red;
            height: auto;
            background: none;
            flex-direction: column;
            align-items: center;
            justif-content: center;
            padding: 0;
        }
    `
        const H1 = styled.h1`
        font-size: 35px;
        color: #B26C29;
        font-weight: bold;
        position: relative;
        text-align: center;
        margin: 1rem auto;
        @media screen and (max-width:800px){
            font-size: 20px;
        }
    `
        const H2 = styled.h1`
        font-size: 50px;
        color: #fff;
        font-family: Ubuntu;
        font-weight: bold;
        position: relative;
        text-align: center;
        margin: 1rem auto;
        @media screen and (max-width:800px){
            font-size: 20px;
    }
    `
        const Sec = styled.div`
        flex-basis: 100%;
        margin: 5px 5px;
        width: 100%;   
        `
        const Sec2 = styled.div`
            border-radius: 25px;
            background: #000000;
            width: 900px;
            height: 380px;
            margin: 10px 10px 10px 10px;
            padding : 10px;
            display: block;
            margin-left: auto;
            margin-right: auto;
            box-shadow: 8px 8px 3px #888888;
            @media screen and (max-width:900px){
            height: auto;
            background: none;
            flex-direction: column;
            align-items: center;
            justif-content: center;
            padding: 0;}
            `

    const P = styled.p`
    font-size: 1.1em;
    color : white ;
    text-align: center;
    @media screen and (max-width:900px){
    font-size: 1em;
    }
    `


    return ( 
        <Container>
            <Sec>
                <H1>Testmonial</H1>
            </Sec>
            <Sec>
                <H2>What They Are Saying</H2>
            </Sec>
            <Sec2>
                <img alt="person"  className='image1' src={require('../../Images/Services/person.jpg')} />
                <P>IT SPORTSMAN EARNESTLY YE PRESERVED AN ON. MOMENT LED FAMILY SOONER CANNOT HER WINDOW PULLED ANY. OR RAILLERY 
                    IF IMPROVED LANDLORD TO SPEAKING HASTENED DIFFERED HE. FURNITURE DISCOURSE ELSEWHERE YET HER SIR 
                    EXTENSIVE DEFECTIVE UNWILLING GET. WHY RESOLUTION ONE MOTIONLESS YOU HIM THOROUGHLY. NOISE IS ROUND TO 
                </P>
                <img alt="stars"  className='image2' src={require('../../Images/Services/stars.png')} />
                <P>JENNY</P>
                
            </Sec2>

        </Container>
     );
}
 
export default Testimonials;