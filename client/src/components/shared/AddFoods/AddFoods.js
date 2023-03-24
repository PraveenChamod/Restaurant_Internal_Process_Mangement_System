import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { FormButton, RegularButton, UploadButton } from '../SharedElements/Buttons';
import { Container, Header } from '../SharedElements/SharedElements';
import * as l from './AddFoodsElements';
import { FaCamera } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
const AddFoodsComponent = (props) => {
    const[FoodName,setFoodName] = useState('');
    const[Price,setPrice] = useState('');
    const[Category,setCategory] = useState('');
    const[image,setImage] = useState(null);

    const addFood = async (e)=>{
        e.preventDefault();
        try {
            const Data = new FormData();
            Data.append('image',image);
            Data.append('FoodName',FoodName);
            Data.append('Price',Price);
            Data.append('Category',Category);
            console.log(Data);
            await toast.promise(
                axios.post('api/v1/Food',Data),
                {
                    loading:'Food is Adding....',
                    success:(data)=>{
                        return ` ${data.data?.message} ` || "success";
                    },
                    error: (err) => `${err.response.data.message}`,
                },
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                        fontSize:'1rem',
                        zIndex:'99999999'
                    }
                }
            )
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
                    Add Foods
                </Header>
                <l.FormSection onSubmit={addFood}>
                    <l.LeftSide>
                    <FormControl  sx={{ m: 1, width: "40ch" }} variant="standard">
                        <TextField 
                            id="standard-basic" 
                            label="Item" 
                            variant="standard" 
                            InputLabelProps={{className:'textFeild_Label'}} 
                            sx={{marginBottom:'10%'}} 
                            value={FoodName} 
                            onChange={e=>setFoodName(e.target.value)}
                            InputProps={{
                                style: { color: '#fff' },
                                }}  
                        />    
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
                                }
                            }}
                            onChange={e=>setCategory(e.target.value)}
                            >
                                <MenuItem value='Burgers'>Burgers</MenuItem>
                                <MenuItem value='Pizza'>Pizza</MenuItem>
                                <MenuItem value='Rice'>Rice</MenuItem>
                                <MenuItem value='Soup'>Soup</MenuItem>
                                <MenuItem value='Noodles'>Noodles</MenuItem>
                                <MenuItem value='Beverages'>Beverages</MenuItem>
                            </Select>
                        </>
                        <TextField 
                            id="standard-basic" 
                            label="Price" 
                            variant="standard" 
                            InputLabelProps={{className:'textFeild_Label'}} 
                            sx={{marginTop:'10%'}} 
                            value={Price} 
                            onChange={e=>setPrice(e.target.value)}
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
 
export default AddFoodsComponent;