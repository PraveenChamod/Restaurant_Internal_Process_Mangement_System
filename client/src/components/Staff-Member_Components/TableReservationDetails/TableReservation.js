import { Container, Header } from '../../shared/SharedElements/SharedElements';
import { BottomArea, Hr, LeftForm, MainFormDiv, RightForm, TitleText, ToptArea,BottomLeftForm,BottomRightForm, BackButton } from "./TableReservationElelments";
import { FormControl ,TextField,Select,MenuItem,InputLabel} from '@mui/material';
import { FormButton, RegularButton } from '../../shared/SharedElements/Buttons';
const TableReservationComponent = () => {
    return ( 
        <Container>
            <Header>Table Reservation details</Header>
            <MainFormDiv>
                <ToptArea>
                    <LeftForm>
                         <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
                            <TextField id="standard-basic" label="Customer Name" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                            <TextField id="standard-basic" label="No of tables" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                            <TextField id="standard-basic" label="No of persons" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                            
                         </FormControl>
                    </LeftForm>
                    <RightForm> 
                        <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
                        <TextField id="standard-basic" label="Contact No" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                        <TextField id="standard-basic" label="Table No" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                        <TextField id="standard-basic" label="Date and time" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />

                        </FormControl>

                    </RightForm>
                    
                </ToptArea>
                    
                    
                <BottomArea>
                <Hr/>
                
                   
                    <BottomRightForm>
                        <RegularButton>Confirm reservation</RegularButton>
                    </BottomRightForm>
                </BottomArea>
            </MainFormDiv>
            <BackButton>
                <FormButton>
                Back
            </FormButton>
            </BackButton>
            
            
        </Container>
     );
}
 
export default TableReservationComponent;