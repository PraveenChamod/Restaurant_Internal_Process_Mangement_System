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

const AddStocks = () => {

  const [Email,setEmail] = useState('');
  const [StockCategory,setStockCategory] = useState('');
  const [Qty,setQty] = useState('');
  const [Price,setPrice] = useState('');
  const [SupplierID,setSupplierID] = useState('');

  const onSubmit = async (e)=>{
    e.preventDefault();
    try {
      const formData = {Email,StockCategory,Qty,Price,SupplierID};
      console.log(formData);
      // const res = await axios.post('api/v1/admin/RegisterServiceProvider',formData);
      // console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Container>
      <Header>ADD STOCK</Header>
      <Div onSubmit={onSubmit}>
        <FormControl  sx={{ m: 1, width: "40ch" }} variant="standard">
          <TextField id="standard-basic" label="Email" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'5%'}} value={Email} onChange={e=>setEmail(e.target.value)} />
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
              value={StockCategory}
              onChange={e=>setStockCategory(e.target.value)}
            >
              <MenuItem value={1}>Vegitable</MenuItem>
              <MenuItem value={2}>Meats</MenuItem>
              <MenuItem value={3}>fruits</MenuItem>
            </Select>
          </>
          <TextField id="standard-basic" label="Quantity" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'5%'}} value={Qty} onChange={e=>setQty(e.target.value)} />
          <TextField id="standard-basic" label="Price" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'5%'}} value={Price} onChange={e=>setPrice(e.target.value)}/>
          <TextField id="standard-basic" label="Supplier ID" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'0'}} value={SupplierID} onChange={e=>setSupplierID(e.target.value)} />
        </FormControl>
        <Div1>
          <Div2>
            <FormButton>
              <Link to="./login" className="btn">
                Add
              </Link>
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
          <Link to="./login" className="btn">
            Back
          </Link>
        </RegularButton>
      </Div3>
    </Container>
  );
};

export default AddStocks;
