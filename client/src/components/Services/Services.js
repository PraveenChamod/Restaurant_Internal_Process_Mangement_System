import React from 'react';
import styled from 'styled-components'
import './ServicesStyles.css'

const Services = () => {
    const Div = styled.div`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        height: 100%;
        @media screen and (max-width:800px){
            margin: 0;
        }
    `
    const H1 = styled.div`
        color: #B26C29;
        letter-spacing: 0.1em;
        font-size: 2em;
        position: relative;
        text-align: center;
        margin: 1rem auto;
        @media screen and (max-width:800px){
            font-size: 20px;
        }
    `
    const H3 = styled.h1`
    letter-spacing: 0.2em;
        font-size: 40px;
        font-weight: 500;
        color: #fff;
        text-align: center;
    @media screen and (max-width:800px){
        font-size: 20px;
    }
`
    const Main = styled.div`
        display: flex;
        @media screen and (max-width:800px){
            margin: 0;
        }
    `
    const Sec1 = styled.div`
        flex-basis: 100%;
        margin: 10px 10px;
        width: 100%;
        
    `
    const Sec2 = styled.div`
        width: 50%;
        margin: 15px;
        text-align: center;
        @media screen and (max-width:800px){
            margin: 5px;
        }
    `

    
    const H2 = styled.h2`
        margin: 10px 10px 10px 10px;
        color: #fff;
        @media screen and (max-width:800px){
            font-size: 15px;
        }
    `

    return (
        <Div>
            <Sec1>
                <H1>OUR SERVICES</H1>
                <H3>What We Offer</H3>
            </Sec1>
            <Sec1>
                <Main>
                    <Sec2>
                        
                        <img alt="easy" className='imag' src={require('../../Images/Services/easy.png')} />
                       
                        
                        <H2>EASY DELIVER</H2>
                    </Sec2>
                    <Sec2>
                        <img alt="table" className='image' src={require('../../Images/Services/table.png')} />
                        
                        <H2>TABLE RESRVATION</H2>
                    </Sec2>
                </Main>
            </Sec1> 
        </Div>
     );
}
 
export default Services;