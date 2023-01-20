import styled from "styled-components";
import Background_Img from '../../Images/Background_AboutUs.png';
import foodImg_2 from '../../Images/foods/plate_2.png';
import foodImg_1 from '../../Images/foods/plate_1.png';

const AboutUs = () => {
    const Container = styled.div`
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 85vh;
        position: relative;
        z-index: 1;
        background: 
            url(${foodImg_1}) right center no-repeat,
            url(${Background_Img}) left center no-repeat;
        background-size: auto 100%;
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
    const Heading = styled.div`
        width: 100%;
        height: 10%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #B26C29;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 2em;
    `
    const Content = styled.div`
        width: 100%;
        height: 90%;
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: center;
        @media screen and (max-width:900px){
            align-items: center;
        }
    `
    const About = styled.div`
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: center;
        margin: 0;  
        padding: 0;
        @media screen and (max-width:900px){
            text-align: center;
            width: 100%;
        }    
    `
    const Para = styled.div`
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: left;
        margin: 15%;
        color: #fff;
        @media screen and (max-width:900px){
            width: 100%;
            margin: 0;

        } 
    `
    const Image = styled.div`
        display: none;
        @media screen and (max-width:900px){
            width: 100%;
            height: 40%;
            display: block;
        } 
    `
    const Img = styled.img`
        @media screen and (max-width:900px){
            width: 100%;
            height: 100%;
        } 
    `
    const P = styled.p`
        font-size: 1.1em;
        @media screen and (max-width:900px){
            font-size: 1em;
            text-align: center;
        }
    `
    const H1 = styled.h1`
        letter-spacing: 0.2em;
        font-size: 40px;
        font-weight: 500;
        @media screen and (max-width: 900px){
            text-align: center;
            font-size: 1.5em;
            margin: 15px 0 5px 0;
        }
    `
    return(
        <Container>
            <Heading>This is our story</Heading>
            <Content>
                <About>
                    <Para>
                        <H1>About Us</H1>
                        <P>"Welcome to RESTO, where we've been serving up delicious French for over 10 years. Our mission is to provide our customers with a truly authentic dining experience, using only the freshest ingredients and traditional cooking methods. Our family-owned and operated restaurant is a labor of love, and our team is dedicated to creating a warm and inviting atmosphere for all of our guests. We take pride in our commitment to sourcing local and sustainable ingredients, and our menu changes seasonally to reflect the best of what's available. Thank you for choosing RESTO for your next meal, we can't wait to serve you!"</P>
                    </Para>
                </About>
                <Image>
                    <Img src={foodImg_2}/>
                </Image>
             </Content>
        </Container>
        
    );
}

export default AboutUs;