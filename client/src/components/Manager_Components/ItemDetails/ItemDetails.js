import { Container, Header } from "../../shared/SharedElements/SharedElements";
import { FormControl, TextField } from '@mui/material';
import * as l from './ItemDetailsElements';
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Link } from "react-router-dom";
import { useState } from "react";

const ItemDetails = (props) => {
    console.log(props.item)
    const[ItemName,setItemName] = useState(props.item.ItemName);
    const[Quantity,setQuantity] = useState(props.item.Quantity);
    const[createdAt,setcreatedAt] = useState(props.item.createdAt);
    const[Category,setCategory] = useState(props.item.Category);
    const[WholeSalePrice,setWholeSalePrice] = useState(props.item.WholeSalePrice);
    return ( 
        <Container>
            <Header>ITEM DETAILS</Header>
            <l.FormSection>
                <l.LeftSide>
                    <FormControl  sx={{ m: 1, width: "40ch" }} variant="standard">
                        <TextField id="standard-basic" label="Item Name" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} value={ItemName} onChange={e=>setItemName(e.target.value)}/>
                        <TextField id="standard-basic" label="Qty" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} value={Quantity} onChange={e=>setQuantity(e.target.value)}/>
                        <TextField id="standard-basic" label="Supplier Name" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} value={ItemName} onChange={e=>setItemName(e.target.value)}/>
                        <TextField id="standard-basic" label="Ordered Date" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} value={createdAt} onChange={e=>setcreatedAt(e.target.value)}/>
                    </FormControl>
                </l.LeftSide>
                <l.RightSide>
                    <FormControl  sx={{ m: 1, width: "40ch" }} variant="standard">
                        <TextField id="standard-basic" label="Category" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} value={Category} onChange={e=>setCategory(e.target.value)}/>
                        <TextField id="standard-basic" label="Price" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} value={WholeSalePrice} onChange={e=>setWholeSalePrice(e.target.value)}/>
                        <TextField id="standard-basic" label="Contact No" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} value={ItemName} onChange={e=>setItemName(e.target.value)}/>
                        <TextField id="standard-basic" label="Available Stock" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} value={Quantity} onChange={e=>setQuantity(e.target.value)}/>
                    </FormControl>
                </l.RightSide>
            </l.FormSection>
            <l.Div3>
                <RegularButton>
                <Link to={props.BackRoutes} className="btn">
                    Back
                </Link>
                </RegularButton>
            </l.Div3>
        </Container>
     );
}
 
export default ItemDetails;