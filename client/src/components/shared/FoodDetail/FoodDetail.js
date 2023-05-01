import { useState } from "react";
import { FormButton, RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import * as l from "./FoodDetailElements";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
const FoodDetail = (props) => {
  const [FoodName, setName] = useState(props.food.FoodName);
  const [Category, setCategory] = useState(props.food.Category);
  const [Price, setPrice] = useState(props.food.Price);
  const [Status, setStatus] = useState(props.food.Status);
  const { user } = useAuth();
  return (
    <Container>
      <Header>Food Details</Header>
      <l.Div>
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
