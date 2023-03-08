import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";

import { 
  Div,
  Div1,
  Div2,
  Div3,

} from'./AddSupplierOrderElement.js';
import { FormButton, RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import { useState } from "react";
import axios from 'axios';

const AddSupplierOrder = () => {
    const[Item,setItem] = useState('');
    const[Quantity,setQuantity] = useState('');
    const[Date,setDate] = useState('');


    const onSubmit = async (e)=>{
        e.preventDefault();
        try {
            const formData = {Item, Quantity, Date}
            const res = await axios.post('api/v1/serviceProvider/AddSupplierOrder',formData)
            console.log(res);
        } catch (error) {
            console.log(error.message);
        }
    }

  return (
    <Container>
      <Header>ADD SUPPLIER ORDER</Header>
      <Div onSubmit={onSubmit}>
        <FormControl  sx={{ m: 1, width: "40ch" }} variant="standard" >
          <TextField id="standard-basic" label="Item" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'5%'}} value={Item} onChange={e=>setItem(e.target.value)}/>
          <TextField id="standard-basic" label="Quantity" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'5%'}} value={Quantity} onChange={e=>setQuantity(e.target.value)} />
          <TextField id="standard-basic" label="Date" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'0'}} value={Date} onChange={e=>setDate(e.target.value)}/>
          <FormButton>
                Add
            </FormButton>
        </FormControl>
        <Div1>
          <Div2>
            
          </Div2>
          
            <FormButton>
                Reset
            </FormButton>
          
        </Div1>
      </Div>
      <Div3>
        <RegularButton>
          <Link to="#" className="btn">
            Back
          </Link>
        </RegularButton>
      </Div3>
    </Container>
  );
};

export default AddSupplierOrder;