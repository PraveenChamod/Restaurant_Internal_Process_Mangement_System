import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`
export const SubContainer = styled.div`
    width: 60%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
`
export const Section = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 300px;
    flex-direction: column;
    margin: 0 2%;
`
export const Member = styled.div`
    width: 150px;
    height: 150px;
    margin: 2% 0;
    border-radius: 100px;
`
export const Image = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 100%;
`
export const Name = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
`