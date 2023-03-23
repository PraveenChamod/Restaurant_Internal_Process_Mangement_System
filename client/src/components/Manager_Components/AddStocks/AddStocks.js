import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import { InputLabel, MenuItem, NativeSelect, Select } from "@mui/material";

import { 
  Page,
  Div,
  Div1,
  Div2,
  Div3,
  H1
} from'./AddStocksElements';
import { createTheme } from '@mui/material/styles';
import { FormButton, RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import axios from "axios";

const AddStocks = (props) => {

  const [ItemName,setItemName] = useState('');
  const [Category,setCategory] = useState('');
  const [Quantity,setQuantity] = useState('');
  const [UnitPrice,setUnitPrice] = useState('');
  const [WholeSalePrice,setWholeSalePrice] = useState('');


  const onSubmit = async (e)=>{
    e.preventDefault();
    try {
      const formData = {ItemName,Category,Quantity,UnitPrice,WholeSalePrice};
      console.log(formData);
      const res = await axios.post('api/v1/Item',formData);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Container>
      <Header>ADD STOCK</Header>
      <Div onSubmit={onSubmit}>
        <FormControl  sx={{ m: 1, width: "40ch" }} variant="standard">
          <TextField id="standard-basic" label="Item Name" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'5%'}} value={ItemName} onChange={e=>setItemName(e.target.value)} />
          <>
            <Select
              defaultValue={30}
              inputProps={{
                name: "role",
                id: "uncontrolled-native",
              }}
              sx={{
                color: "white",
                '.MuiSvgIcon-root ': {
                  fill: "white !important",
                },
                marginBottom:'5%'
              }}
              value={Category}
              onChange={e=>setCategory(e.target.value)}
            >
              <MenuItem value={'Vegitable'}>Vegitable</MenuItem>
              <MenuItem value={'Meat'}>Meat</MenuItem>
              <MenuItem value={'Fruits'}>Fruits</MenuItem>
              <MenuItem value={'Other'}>Other</MenuItem>
            </Select>
          </>
          <TextField id="standard-basic" label="Quantity" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'5%'}} value={Quantity} onChange={e=>setQuantity(e.target.value)} />
          <TextField id="standard-basic" label="Price" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'5%'}} value={UnitPrice} onChange={e=>setUnitPrice(e.target.value)}/>
          <TextField id="standard-basic" label="Whole Sale Price" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'0'}} value={WholeSalePrice} onChange={e=>setWholeSalePrice(e.target.value)} />
        </FormControl>
        <Div1>
          <Div2>
            <FormButton>
                Add
            </FormButton>
          </Div2>
          
            <FormButton>
              <Link to="./login" className="btn">
                Reset
              </Link>
            </FormButton>
          
        </Div1>
      </Div>
      <Div3>
        <RegularButton>
          <Link to={props.BackRoutes} className="btn">
            Back
          </Link>
        </RegularButton>
      </Div3>
    </Container>
  );
};

export default AddStocks;
