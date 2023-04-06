import React, { useState } from "react";
import styled from "styled-components";

const PopupContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PopupContent = styled.div`
    background-color: #1A1E21;
    color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20px;
`;

const H2 = styled.h2`
    justify-content: center;
    text-transform: uppercase;
    align-items: center;
    text-align: center;
    margin-top: 2%;
    background: linear-gradient(
        60deg,
        rgb(178, 108, 41) 0%,
        rgb(253, 190, 16) 100%
    );
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    letter-spacing: 1rem;
    margin-bottom: 15px;
`;

const P = styled.p``;

const Label = styled.span`
    margin-top: 10px;
    margin-left: 20px;
    font-weight: bold;
`;

const Detail = styled.span`
    margin-left: 10px;
`;

const PopupInput = styled.input`
    width: 50%;
    max-width: 100px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid gray;
    margin-bottom: 20px;
    margin-left: 10px;
`;

const Buttonsection = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
`;

const PopupButton = styled.button`
    width: 100px;
    height: 40px;
    color:#fff;
    background: linear-gradient(to right, #FFBF00, #B26C29);
    border: none;
    cursor: pointer;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-weight: 500;
    text-transform: uppercase;
`;

const Popup = ({ item, onAdd, onClose }) => {
    const [quantity, setQuantity] = useState(1);
  
    const handleAddClick = () => {
      onAdd(quantity);
      onClose();
    };
  
    return (
      <PopupContainer>
        <PopupContent>
          <H2>{item.ItemName}</H2>
          <P> <Label>Category:</Label> <Detail>{item.Category}</Detail> </P>
          <P> <Label>Unit Price:</Label> <Detail>{item.Price}</Detail> </P>
          <P> <Label>Quantity:</Label>  
          <PopupInput
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          /></P>
          <Buttonsection>
            <PopupButton onClick={handleAddClick}>Add</PopupButton>
            <PopupButton onClick={onClose}>Cancel</PopupButton>
          </Buttonsection>
          
        </PopupContent>
      </PopupContainer>
    );
  };

export default Popup;