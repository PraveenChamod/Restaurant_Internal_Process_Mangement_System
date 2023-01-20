import {  faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect } from "react";
import styled from "styled-components";
import { FaArrowUp } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ScrollToTop = () => {

    const Icon = styled.div`
        &{
            position: fixed;
            bottom: 20px;
            right: 20px;
            font-size: 20px;
            cursor: pointer;
            border: none;
            color: #fff;
            background: linear-gradient(to right, #ba9035, #a0522d);
            z-index: 4;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;

    }
    &:active{
        transform: scale(0.8);
    }
    @media screen and (max-width:800px){
            bottom: 20px;
            right: 10px;
            font-size: 30px;
    }
    `

    const[ScrollToTop,setScrollToTop] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll",()=>{
            if(window.pageYOffset > 200){
                setScrollToTop(true);
            }
            else{
                setScrollToTop(false)
            }
        })
    }, [])
    const scrollToTop = ()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    return ( 
        <div>
            {ScrollToTop && <Icon onClick = {scrollToTop}>
                    <FaArrowUp/>
                </Icon> }
        </div>
     );
}
 
export default ScrollToTop;