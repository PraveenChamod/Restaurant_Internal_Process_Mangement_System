import { FormControl, Table, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FormButton, RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import * as l from './AddTableElements';
import axios from 'axios';
const AddTableComponent = () => {
    const[TableNo,setTableNo] = useState('');
    const[NoOfPersons,setNoOfPersons] = useState('');
    const[price,setprice] = useState('');


    const onSubmit = async (e)=>{
        e.preventDefault();
        try {
            const formData = {TableNo, NoOfPersons, price}
            const res = await axios.post('api/v1/serviceProvider/Tables/AddTable',formData)
            console.log(res);
        } catch (error) {
            
        }
    }
    return ( 
        <Container>
            <Header>ADD TABLE</Header>
            <l.Div onSubmit={onSubmit}>
                <FormControl  sx={{ m: 1, width: "40ch" }} variant="standard">
                    <TextField id="standard-basic" label="Table No" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} value={TableNo} onChange={e=>setTableNo(e.target.value)}/>
                    <TextField id="standard-basic" label="Maximum No of Peoples" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} value={NoOfPersons} onChange={e=>setNoOfPersons(e.target.value)} />
                    <TextField id="standard-basic" label="Reservation Charge" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} value={price} onChange={e=>setprice(e.target.value)}/>
                </FormControl>
                <l.Div1>
                <l.Div2>
                    <FormButton>
                        Add
                    </FormButton>
                </l.Div2>
                </l.Div1>
            </l.Div>
            <l.Div3>
                <RegularButton>
                <Link to="./login" className="btn">
                    Back
                </Link>
                </RegularButton>
            </l.Div3>
            </Container>
     );
}
 
export default AddTableComponent;