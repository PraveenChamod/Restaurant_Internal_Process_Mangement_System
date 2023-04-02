import { RegularButton } from "../shared/SharedElements/Buttons";
import { useState } from "react";
import { Header } from "../shared/SharedElements/SharedElements";
import * as l from './SupplierItemsElement' 
import { FormLabel, FormControl, RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast';
import axios from 'axios';

const SupplierItemsComponent = (props) => {
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('available');
    const [category, setCategory] = useState('');

    const [items, setItems] = useState([]);
    

    const handleAddItem = () => {
        const newItem = { itemName, price, status, category };
        setItems([...items, newItem]);
        setItemName('');
        setPrice('');
        setCategory('');
        setStatus('available');

        console.log(items);
    };

    const handleDeleteItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);

        console.log(items);
    };

    const handleAddSupplyItems = async (e) => {
        e.preventDefault();
        try {
          console.log("Final items"+items)
          await toast.promise(
            axios.post('api/v1/SupplierItems', items),
            {
              loading: 'Supply items are Adding....',
              success: (items) => {
                return ` ${items.data?.message} ` || "success";
              },
              error: (err) => `${err.response.data.message}`,
            },
            {
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
                fontSize: '1rem',
                zIndex: '99999999'
              }
            }
          )
        } catch (error) {
          console.log(error.message);
        }
    }
    return ( 
        <l.Container>
            <Header>ADD SUPPLY ITEM DETAILS</Header>
            <l.FormSection onSubmit={handleAddSupplyItems}>
                <l.LeftSide>
                <FormControl sx={{ m: 1, width: "40ch" }} component="fieldset" variant="standard">
                    <TextField 
                        id="standard-basic" 
                        label="Item Name" 
                        variant="standard" 
                        value={itemName} 
                        onChange={e => setItemName(e.target.value)} 
                        InputLabelProps={{className:'textFeild_Label'}} 
                        sx={{marginBottom:'10%'}}
                        InputProps={{style: { color: '#fff' },}}
                    />
                    <TextField 
                        id="standard-basic" 
                        label="Category" 
                        variant="standard" 
                        value={category} 
                        onChange={e => setCategory(e.target.value)} 
                        InputLabelProps={{className:'textFeild_Label'}} 
                        sx={{marginBottom:'10%'}} 
                        InputProps={{style: { color: '#fff' },}}
                    />
                    <TextField 
                        id="standard-basic" 
                        label="Unit Price" 
                        variant="standard" 
                        value={price} 
                        onChange={e => 
                        setPrice(e.target.value)} 
                        InputLabelProps={{className:'textFeild_Label'}} 
                        sx={{marginBottom:'10%'}} 
                        InputProps={{style: { color: '#fff' },}}
                    />
                    <FormControl component="fieldset">
                    <FormLabel component="legend" className="textFeild_Label">Status</FormLabel>
                    <RadioGroup row defaultValue="available" value={status} onChange={e => setStatus(e.target.value)}>
                        <FormControlLabel value="available" control={<Radio sx={{ color: 'white' }} />} label="Available" sx={{ color: 'white' }} />
                        <FormControlLabel value="out-of-stock" control={<Radio sx={{ color: 'white' }} />} label="Out of Stock" sx={{ color: 'white' }} />
                    </RadioGroup>
                    </FormControl>
                    <l.AddButton onClick={handleAddItem}>+</l.AddButton>
                </FormControl>
                </l.LeftSide>
                <l.RightSide>
                <l.Table>
                    <thead>
                        <l.Tr>
                            <l.Th>Item Name</l.Th>
                            <l.Th>Unit Price</l.Th>
                            <l.Th>Status</l.Th>
                            <l.Th>Price</l.Th>
                            <l.Th>Category</l.Th>
                            <l.Th>Remove</l.Th>
                        </l.Tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                                <l.Tr key={index}>
                                    <l.Td>{item.itemName}</l.Td>
                                    <l.Td>{item.price}</l.Td>
                                    <l.Td>{item.status}</l.Td>
                                    <l.Td>{item.price}</l.Td>
                                    <l.Td>{item.category}</l.Td>
                                    <l.Td onClick={() => handleDeleteItem(index)}><l.RemoveButton>x</l.RemoveButton></l.Td>
                                </l.Tr>      
                        ))}        
                    </tbody>
                </l.Table>
                <l.OkButton onClick={() => handleAddSupplyItems()}>OK</l.OkButton>
                </l.RightSide>
            </l.FormSection>
            <l.Div3>
                <RegularButton>
                <Link to="./login" className="btn">
                    Back
                </Link>
                </RegularButton>
            </l.Div3>
        </l.Container>
     );
}
 
export default SupplierItemsComponent;