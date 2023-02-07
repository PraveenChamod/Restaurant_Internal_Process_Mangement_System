import { Container, Header } from "../../shared/SharedElements/SharedElements";
import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import * as l from './ItemDetailsElements';

const ItemDetails = () => {
    return ( 
        <Container>
            <Header>ITEM DETAILS</Header>
            <l.FormSection>
                <l.LeftSide>
                    <FormControl  sx={{ m: 1, width: "40ch" }} variant="standard">
                        <TextField id="standard-basic" label="Item Name" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                        <TextField id="standard-basic" label="Qty" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                        <TextField id="standard-basic" label="Supplier Name" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                        <TextField id="standard-basic" label="Ordered Date" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                    </FormControl>
                </l.LeftSide>
                <l.RightSide>
                    <FormControl  sx={{ m: 1, width: "40ch" }} variant="standard">
                        <TextField id="standard-basic" label="Category" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                        <TextField id="standard-basic" label="Price" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                        <TextField id="standard-basic" label="Contact No" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                        <TextField id="standard-basic" label="Available Stock" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                    </FormControl>
                </l.RightSide>
            </l.FormSection>
        </Container>
     );
}
 
export default ItemDetails;