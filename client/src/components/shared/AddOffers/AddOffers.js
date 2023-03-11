import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import { FormButton, RegularButton, UploadButton } from '../SharedElements/Buttons';
import { Container, Header } from '../SharedElements/SharedElements';
import * as l from './AddOffersElements';
const AddOffersComponent = () => {
        
    return ( 
        <Container>
            <l.SubSection>
            <Header>
                    Add Offers
                </Header>
                <l.FormSection>
                    <l.LeftSide>
                    <FormControl  sx={{ m: 1, width: "40ch" }} variant="standard">
                        <TextField id="standard-basic" label="Meal Name" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                        <TextField id="standard-basic" label="Special Price" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                        <TextField id="standard-basic" label="Validity" variant="standard" InputLabelProps={{className:'textFeild_Label'}} />
                        </FormControl>
                    </l.LeftSide>
                    <l.RightSide>
                        <l.ImageSection>
                            
                        </l.ImageSection>
                        <l.UploadButtonSection>
                            <UploadButton>Upload</UploadButton>
                        </l.UploadButtonSection>
                        <l.ButtonSection>
                            <FormButton>Add</FormButton>
                        </l.ButtonSection>
                    </l.RightSide>
                </l.FormSection>
            </l.SubSection>
            <l.ButtonSection1>
                <RegularButton>Back</RegularButton>
            </l.ButtonSection1>
        </Container>
     );
}
 
export default AddOffersComponent;