import { FormButton, RegularButton } from "../../shared/SharedElements/Buttons";
import { Header } from "../../shared/SharedElements/SharedElements";
import * as l from "./CartElements";
import { useRef, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useFetch from "../../../Hooks/useFetch";
import notfound from '../../../Images/notFound/NoResults.png';
const CartComponent = ({ data }) => {
  const { user } = useAuth();
  const [Items, setItem] = useState(data);
  console.log(data);
  const [clickedIndex, setClickedIndex] = useState({});
  const [Quantity, setQuantity] = useState(1);
  const quantityRef = useRef(Quantity);
  const [price, setPrice] = useState();

  //   const navigate = useNavigate();

  //Select Item Independelntly
  const handleClick = async (index) => {
    setClickedIndex((state) => ({
      ...state, //copy previous state
      [index]: !state[index], //update value by index key
    }));
  };

  //Delete Cart Item
  const deleteCartItem = async ({ cartId, foodId, offerId }) => {
    try {
      const formData = { cartId, foodId, offerId };
      await toast.promise(
        axios.patch("api/v1/FoodItem", formData),
        {
          loading: `Removing from cart`,
          success: (data) => {
            console.log({ data });
            return "Item is Removed";
          },
          error: (err) => `${err.response.data.message}`,
        },
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: "1rem",
            zIndex: "99999999",
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  const selectOne = async (index) => {
    const item = Items[index];
    const cartId = item.cartId;
    const foodId = item.Foodid;
    const offerId = item.Offerid;
    handleClick(index);
    await deleteCartItem({ cartId, foodId, offerId });
    const newJoin = [...Items];
    newJoin.splice(index, 1);
    setItem(newJoin);
  };
  console.log(Items);
  //Increase Quantity
  const AddQuantity = async ({ foodId, quantity, offerId }) => {
    try {
      const formData = { foodId, quantity, offerId };
      const res = await axios.post("api/v1/CartItem", formData);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  const increaseQTY = async (index) => {
    const item = Items[index];
    const offerId = item.Offerid;
    const foodId = item.Foodid;
    handleClick(index);
    const newQuantity = item.quantity + 1;
    setQuantity(newQuantity);
    item.quantity = newQuantity;
    setItem([...data]); // update the state of the data array
    await AddQuantity({
      foodId: foodId,
      quantity: newQuantity,
      offerId: offerId,
    });
  };

  const decreseQTY = async (index) => {
    const item = Items[index];
    const offerId = item.Offerid;
    const foodId = item.Foodid;
    handleClick(index);
    const newQuantity = item.quantity - 1;
    setQuantity(newQuantity);
    item.quantity = newQuantity;
    setItem([...data]); // update the state of the data array
    await AddQuantity({
      foodId: foodId,
      quantity: newQuantity,
      offerId: offerId,
    });
  };
  // console.log(quantity);
  let Price = 0;
  Items.forEach((element) => {
    Price += element.quantity * element.price;
    console.log(Price);
  });
  console.log(Items.length);
  return (
    <>
      <l.Container>
        <l.SubContainer>
          <l.SubSection1>
            <l.ProfileImage>
              <l.Image
                src={`https://resto-f3zu.onrender.com/images/${user?.ProfileImage}`}
              />
            </l.ProfileImage>
            <l.Name>{user?.Name}</l.Name>
          </l.SubSection1>
          <l.SubSection2>
            <Header>MY CART</Header>
          </l.SubSection2>
          <l.SubSection3>
            <l.Left>
              {Items.length == 0 ?
                <l.NotFound>
                  <l.Image1 src={notfound} />
                  <l.Text1>No Results Found</l.Text1>
                </l.NotFound> : 
                Items.map((cart, index) => {
                  console.log(cart);
                  return (
                    <l.CartSection>
                      {/* <l.SelectIcon onClick={()=>{selectOne(index)}}>
                                      {change && selectItem === index ? <MdCheckBox/> : <MdCheckBoxOutlineBlank />}
                                  </l.SelectIcon> */}
                      <l.ItemsCard>
                        <l.FoodImage>
                          <l.Food
                            src={`https://resto-f3zu.onrender.com/${
                              cart.Foodid == null ? "offerimages" : "Foodimages"
                            }/${cart.image}`}
                          />
                        </l.FoodImage>
                        <l.Details>
                          <l.MainText>
                            <l.FoodName>{cart.name}</l.FoodName>
                          </l.MainText>
                          <l.SubText>
                            {/* <l.Text>
                                                  {cart.Size}
                                              </l.Text> */}
                            <l.Text>
                              Quantity :{" "}
                              {clickedIndex[index] ? Quantity : cart.quantity}
                            </l.Text>
                            <l.Text>
                              Price :{" "}
                              {clickedIndex[index]
                                ? Quantity * cart.price
                                : cart.quantity * cart.price}
                            </l.Text>
                          </l.SubText>
                        </l.Details>
                        <l.Icon onClick={() => increaseQTY(index)}>
                          <AiFillPlusCircle />
                        </l.Icon>
                        <l.Icon onClick={() => decreseQTY(index)}>
                          <AiFillMinusCircle />
                        </l.Icon>
                        <l.Icon>
                          <MdDelete onClick={() => selectOne(index)} />
                        </l.Icon>
                      </l.ItemsCard>
                    </l.CartSection>
                  );
                })
              }
            </l.Left>
            <l.Right>
              <l.Description>
                <Header style={{ fontSize: "18px" }}> Order Summery </Header>
                <l.TextSection>
                  <l.ItemTexts> Sub Total : </l.ItemTexts>
                  <l.ItemTexts> {"Rs." + Price} </l.ItemTexts>
                </l.TextSection>
                <l.ButtonSection>
                  <Link to="/CustomerOrdering" className="btn">
                    <FormButton>Order</FormButton>
                  </Link>
                </l.ButtonSection>
              </l.Description>
            </l.Right>
          </l.SubSection3>
        </l.SubContainer>
        <Link to="/CustomerPlace-Order" className="btn">
          <RegularButton>Back</RegularButton>
        </Link>
      </l.Container>
    </>
  );
};

export default CartComponent;
