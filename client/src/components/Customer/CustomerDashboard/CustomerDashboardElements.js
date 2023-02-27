import styled from "styled-components";
import Img from '../../../Images/Bolgbg.png';
import { RegularButton } from "../../shared/SharedElements/Buttons";
export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background:url(${Img}) bottom no-repeat;
`
export const Section = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 8% 0 0 0;
`
export const Profile = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`
export const Picture = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50px;
`
export const Image = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50px;
`
export const Name = styled.div`
    color: #fff;
    font-size: 28px;

`
export const Options = styled.div`
    margin: 5% 0;
`
export const Content = styled.div`
    padding: 3% 0;
    width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 3px 3px 3px #000;
    border-radius: 20px;
    background-color: #1A1E21;
`
export const ButtonSection = styled.div`
    margin: 2%;
`
export const Button = styled(RegularButton)`
    width: 250px;
    display: flex;
    justify-content: center;
`
export const Icon = styled.div`
    width: 40%;
    text-align: right;
    margin: 0 3%;
`
export const Text = styled.div`
    width: 60%;
    text-align: left;
`