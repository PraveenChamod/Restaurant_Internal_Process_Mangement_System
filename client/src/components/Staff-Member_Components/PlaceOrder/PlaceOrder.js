import React,{ useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { RegularButton } from "../../shared/SharedElements/Buttons";

import{
    page,
    SubSection,
    FormSection,
    Div1,
    Div2,
    Div3,
    h1,
    ButtonSection,
    ButtonSection1,
}
from "./PlaceOrderElements";

import { Container, Header } from "../../shared/SharedElements/SharedElements";


const PlaceOrderComponent = () => {
    return (
        <Container>
        <SubSection>
            <Header>
                PLACE ORDER
            </Header>
            <FormSection>
                <Div1>

                <TextField id="standard-basic" label="Customer Name" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} /> 
                <InputLabel id="ItemList" >Item List</InputLabel>
                <FormControl  sx={{ m: 1, width: "35ch" }} variant="standard">
                             <Select
                        labelId="ItemList"
                            defaultValue={30}
                            inputProps={{
                                name: "role",
                                id: "uncontrolled-native",
                            }}
                            sx={{
                                color: "white",
                                '.MuiSvgIcon-root ': {
                                fill: "white !important",
                                marginBottom:'10%'
                                }
                            }}
                            
                            >
                                <MenuItem value={1} >1</MenuItem>
                                <MenuItem value={2} >2</MenuItem>
                                <MenuItem value={3} >3</MenuItem>
                            </Select> 
                        </FormControl>
                <Div3>
                <h1>
                  Total Price
                </h1>
                </Div3>
                </Div1>
                <Div2>
                 <FormControl  sx={{ m: 1, width: "35ch" }} variant="standard">
                     <TextField id="standard-basic" label="Contact No" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} 
                        />
                  </FormControl>
                    
  
                  <ButtonSection>
                     <RegularButton >PLACE ORDER</RegularButton>
                  </ButtonSection>
                </Div2>
            </FormSection>
        </SubSection>
        <ButtonSection1>
          <RegularButton>Back</RegularButton>
        </ButtonSection1>

    </Container>

      );
}
 
export default PlaceOrderComponent;

