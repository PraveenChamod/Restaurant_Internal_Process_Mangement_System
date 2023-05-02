import { useState } from "react";
import React from "react";
import { FormButton, RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import * as l from "./FoodDetailElements";
<<<<<<< HEAD
import { toast } from 'react-hot-toast';
import axios from "axios";
import { Link } from "react-router-dom";
const FoodDetailComponent = (props) => {
    console.log(props.BackRoutes);
    const[FoodName,setName] = useState(props.food.FoodName);
    const[Category,setCategory] = useState(props.food.Category);
    const[Price,setPrice] = useState(props.food.Price);
    const[Status,setStatus] = useState(props.food.Status);
    
    const update = async (e)=>{
        e.preventDefault();
        try {
            const Data = new FormData();
            Data.append("FoodName",FoodName);
            Data.append("Category", Category);
            Data.append("Price", Price);
            Data.append("Status", Status);
            console.log(Data);
            await toast.promise(
                axios.patch('api/v1/Food/:id',Data),
                {
                    loading:'Food is Updating....',
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
                        zIndex:'99999999',
                    },
                }

            )

        } catch (error) {
            console.log(error.message);
        }
    };
    
    return ( 
=======
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
const FoodDetail = (props) => {
  const [FoodName, setName] = useState(props.food.FoodName);
  const [Category, setCategory] = useState(props.food.Category);
  const [Price, setPrice] = useState(props.food.Price);
  const [Status, setStatus] = useState(props.food.Status);
  const { user } = useAuth();
  return (
>>>>>>> 128acc57749faf3812f21cb75b3f066233e9b3a2
    <Container>
      <Header>Food Details</Header>
      <l.Div onSubmit={update}>
        <l.Div1>
          <l.Img
            src={`http://localhost:5000/Foodimages/${props.food.FoodImage}`}
          ></l.Img>
          <l.TextSection>
            <l.Text>Food Name</l.Text>
            <l.TextFeild
              type="text"
              placeholder="Name"
              value={FoodName}
              onChange={(e) => setName(e.target.value)}
            />
          </l.TextSection>
          <l.TextSection>
            <l.Text>Category</l.Text>
            <l.TextFeild
              type="text"
              placeholder="Category"
              value={Category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </l.TextSection>
          <l.TextSection>
            <l.Text>Price</l.Text>
            <l.TextFeild
              type="text"
              placeholder="Price"
              value={"Rs." + Price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </l.TextSection>
          <l.RadioButtonSection>
            <l.RadioButton>
              <l.Radio
                type="radio"
                name="Availablility"
                value="Available"
                onChange={(e) => setStatus(e.target.value)}
                checked={Status === "Available" ? true : false}
              />
              <l.Label>Available</l.Label>
            </l.RadioButton>
            <l.RadioButton>
              <l.Radio
                type="radio"
                name="Availablility"
                value="Not Available"
                onChange={(e) => setStatus(e.target.value)}
                checked={Status === "Not Available" ? true : false}
              />
              <l.Label>Not Available</l.Label>
            </l.RadioButton>
          </l.RadioButtonSection>
        </l.Div1>
        <l.Div2>
<<<<<<< HEAD
            <l.Sec>
            <FormButton>
              <Link className="btn">
                Delete
              </Link>
            </FormButton>
            </l.Sec>
            <l.Sec>
                <FormButton>
                    <Link to = "./login" className="btn">
                    Update
                    </Link>
                </FormButton>
            </l.Sec>
        </l.Div2>
      </l.Div>
      <l.Div3>
      <RegularButton>
          <Link to= "./FoodDetails" className="btn">
            Back
          </Link>
        </RegularButton>  
      </l.Div3>
    </Container>
     );
}

export default FoodDetailComponent;
=======
          <l.Sec>
            <FormButton>Delete</FormButton>
          </l.Sec>
          <l.Sec>
            <FormButton>Update</FormButton>
          </l.Sec>
        </l.Div2>
      </l.Div>
      <l.Div3>
        <Link
          to={user.Role == "Admin" ? "/AdminView-Foods" : "/ManagerView-Foods"}
          className="btn"
        >
          <RegularButton>Back</RegularButton>
        </Link>
      </l.Div3>
    </Container>
  );
};

export default FoodDetail;
>>>>>>> 128acc57749faf3812f21cb75b3f066233e9b3a2
