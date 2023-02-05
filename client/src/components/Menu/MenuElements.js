import styled from "styled-components";
export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: fit-content;
    padding: 0 0 3% 0;
`
export const Column1 = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    background: #161A1D;
    height: 100%;
    width: 33.33%;
`
export const Column2 = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    background: #B16C29;
    height: 100%;
    width: 33.33%;
`
export const Column3 = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    background: #161A1D;
    height: 100%;
    width: 33.33%;
`
export const Items1  =styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin:3% 0;
    height: auto;
`
export const Items2  =styled.div`

`
export const Items3 =styled.div`

`
export const ImageSection1 = styled.div`
    display: flex;
    width: 200px;
      height: 300px;
      border-radius: 0 12rem 12rem 0;
    border: 5px solid #B16C29;
    position: relative;
    left: -40%
`
export const Image1 = styled.img`
    width: 200px;
      height: 300px;
      border-radius: 0 12rem 12rem 0;
    object-fit: cover;
    object-position: 100% 0;
`
export const ImageSection2 = styled.div`
    display: flex;
    width: 200px;
      height: 300px;
      border-radius:12rem 0 0 12rem;
    border: 5px solid #B16C29;
    position: relative;
    right: -40%
`
export const Image2 = styled.img`
width: 200px;
      height: 300px;
      border-radius:12rem 0 0 12rem;
`
export const Category1 = styled.div`
    font-size: 26px;
    font-weight: 600;
    color: #B26C29;
    font-style: italic;
`
export const Category2 = styled.div`
    font-size: 26px;
    font-weight: 600;
    color: #fff;
    font-style: italic;
`
export const Category3 = styled.div`
    font-size: 26px;
    font-weight: 600;
    color: #B26C29;
    font-style: italic;
`
export const Meals = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    margin-left: 5%;
`
export const ItemDetails = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: #fff;
    margin: 2% 0;
`
export const ItemDetails1 = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: #000;
    margin: 2% 0;
`
export const Price = styled.div`
    width: 30%;
    margin-left: 5%;
`
export const ItemName = styled.div`
    width: 70%;
    margin-right: 5%;
`