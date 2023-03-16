import { FormControl, TextField } from '@mui/material';
import { FormButton, RegularButton, UploadButton } from '../SharedElements/Buttons';
import { Container, Header } from '../SharedElements/SharedElements';
import { useState } from "react";
import axios from 'axios';
import { FaCamera } from 'react-icons/fa';
import * as l from './AddOffersElements';
import { Link } from 'react-router-dom';
const AddOffersComponent = (props) => {
    const[image,setImage] = useState(null);
    const [SpecialPrice,setSpecialPrice] = useState('');
    const [Category,setCategory] = useState('');
    const [OfferImage, setOfferImage] = useState('');
    console.log(OfferImage,12);

    const onSubmit = async (e)=>{
        e.preventDefault();
        try {
            const formData = {SpecialPrice, Category, OfferImage}
            const res = await axios.post('api/v1/Offer',formData)
            console.log(res);
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleUpload = (e)=>{
        setImage(e.target.files[0]);
    }
    return ( 
        <Container>
            <l.SubSection>
            <Header>
                    Add Offers
                </Header>
                <l.FormSection onSubmit={onSubmit}>
                    <l.LeftSide>
                    <FormControl  sx={{ m: 1, width: "40ch" }} variant="standard">
                        <TextField 
                            id="standard-basic" 
                            label="Meal Category" 
                            variant="standard" 
                            InputLabelProps={{className:'textFeild_Label'}} 
                            sx={{marginBottom:'10%'}} 
                            value={Category} 
                            onChange={e=>setCategory(e.target.value)} 
                            InputProps={{
                            style: { color: '#fff' },
                            }}
                        />
                        <TextField 
                            id="standard-basic" 
                            label="Special Price" 
                            variant="standard" 
                            InputLabelProps={{className:'textFeild_Label'}} 
                            sx={{marginBottom:'10%'}} 
                            value={SpecialPrice} 
                            onChange={e=>setSpecialPrice(e.target.value)} 
                            InputProps={{
                            style: { color: '#fff' },
                            }}
                        />
                        </FormControl>
                    </l.LeftSide>
                    <l.RightSide>
                    <l.ImageSection>
                            <l.ImageSubSec>
                            {image ? (
                                <l.Image src={URL.createObjectURL(image)} />
                                ) : (
                                <p></p>
                            )}
                            </l.ImageSubSec>
                            <l.Icon>
                                <FaCamera/>
                                    <input type='file' id='file' accept="image/*" onChange={handleUpload}/>
                            </l.Icon>
                        </l.ImageSection>
                        <l.ButtonSection>
                            <FormButton>Add</FormButton>
                        </l.ButtonSection>
                    </l.RightSide>
                </l.FormSection>
            </l.SubSection>
            <l.ButtonSection1>
                <Link to={props.BackRoutes} className="btn">
                    <RegularButton>Back</RegularButton>
                </Link>
            </l.ButtonSection1>
        </Container>
     );
}
 
export default AddOffersComponent;