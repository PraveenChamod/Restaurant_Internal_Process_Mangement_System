//structure


import { Container, Header } from '../../shared/SharedElements/SharedElements';
import { BottomArea, Hr, LeftForm, MainFormDiv, RightForm, TitleText, ToptArea,BottomLeftForm,BottomRightForm, BackButton } from "./OrderDetailsElements";
import { FormControl ,TextField,Select,MenuItem,InputLabel} from '@mui/material';
import { FormButton, RegularButton } from '../../shared/SharedElements/Buttons';




const OrderDetailsComponent = ()=>{
    return(
        <Container>
            <Header>Order details</Header>
            <MainFormDiv>
                <ToptArea>
                    <LeftForm>
                         <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
                            <TextField id="standard-basic" label="Customer Name" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                            <TextField id="standard-basic" label="Address" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                            <FormControl sx={{marginBottom:'10%'}}>
                             <InputLabel id="demo-simple-select-label" sx={{color:"#fff"}}>Item List</InputLabel>
                             <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"   
                              label="Item List"
                              sx={{color:"#fff"}}
                             >  
                                <MenuItem value={10}>Item1</MenuItem>
                                <MenuItem value={20}>Item2</MenuItem>
                                <MenuItem value={30}>Item3</MenuItem>
                            </Select>
                           </FormControl>
                         </FormControl>
                    </LeftForm>
                    <RightForm> 
                        <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
                        <TextField id="standard-basic" label="Contact No" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                        <TextField id="standard-basic" label="Payment Method" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                        <TextField id="standard-basic" label="Total Price" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />

                        </FormControl>

                    </RightForm>
                    
                </ToptArea>
                    
                    
                <BottomArea>
                <Hr/>
                <BottomLeftForm sx={{ m: 1, width: "40ch" }}>
                    <TitleText>
                        select deliverer
                    </TitleText>
                    <FormControl sx={{marginBottom:'10%',width:'100%'}}>
                             <InputLabel id="demo-simple-select-label" sx={{color:"#fff"}}>Select Deliverer</InputLabel>
                             <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"   
                              label="Select Deliverer"
                              sx={{color:"#fff"}}
                             >  
                                <MenuItem value={10}>Deliverer 1</MenuItem>
                                <MenuItem value={20}>Deliverer 2</MenuItem>
                                <MenuItem value={30}>Deliverer 3</MenuItem>
                            </Select>
                           </FormControl>
                </BottomLeftForm>
                   
                    <BottomRightForm>
                        <RegularButton>Confirm order</RegularButton>
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
export default OrderDetailsComponent