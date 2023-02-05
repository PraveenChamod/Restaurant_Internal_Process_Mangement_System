import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import {
  Page,
  Div,
  Div1,
  Div2,
  Div3,
  H1,
  Searchbar

} from './ItemViewElements';
import { FormButton, RegularButton } from "../SharedElements/Buttons";
import { Container } from "../SharedElements/SharedElements";

const ItemViewComponent = (props) => {
    const Labels = Array.from(props.View1.TextFeilds);
  return (
    <Container>
      <H1>{props.View1.Title}</H1>
      <Div>
        <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
            {
                Labels.map(Label=>{
                    return(
                        <TextField
                            id="standard-basic"
                            label={Label.text}
                            type="email"
                            variant="standard"
                            InputLabelProps={{className:'textFeild_Label'}} 
                            sx={{marginBottom:'5%'}}
                        />
                    )
                })
            }
        </FormControl>
        <Div1>
          <Div2>
            <FormButton>
              <Link to="./login" className="btn">
                DELETE
              </Link>
            </FormButton>
          </Div2>
          
            <FormButton>
              <Link to="./login" className="btn">
                UPDATE
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

export default ItemViewComponent;
