import useAuth from "../../../Hooks/useAuth";
import * as l from "./MyOrdersElements";
import img from "../../../Images/restoLogodark.png";
import { TiTick } from "react-icons/ti";
import { BsHourglassSplit } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FormButton, RegularButton } from "../../shared/SharedElements/Buttons";
import notfound from "../../../Images/notFound/NoResults.png";
import { useState } from "react";
const MyOrdersComponent = (props) => {
  console.log(props.data);
  const [Items, setItems] = useState(props.data);
  const { user } = useAuth();
  const [clickedIndex, setClickedIndex] = useState({});

  const handleClick = async (index) => {
    setClickedIndex((state) => ({
      ...state, //copy previous state
      [index]: !state[index], //update value by index key
    }));
  };
  const cancleOrder = async ({ id }) => {
    try {
      const formdata = { id };
      await toast.promise(
        axios.delete(`api/v1/Customer/Orders/${id}`),
        {
          loading: `Cancelling order....`,
          success: (data) => {
            return data?.data?.message;
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
  const removeOrder = async (index) => {
    const item = Items[index];
    const id = item.OrderId;
    console.log(id);
    handleClick(index);
    await cancleOrder({ id });
    const newJoin = [...Items];
    newJoin.splice(index, 1);
    setItems(newJoin);
  };
  return (
    <>
      <l.Container>
        <l.SubContainer>
          <l.SubSection1>
            <l.OrderUserDetails>
              <l.ProfileImage>
                <l.Image
                  src={`http://localhost:5000/images/${user?.ProfileImage}`}
                />
              </l.ProfileImage>
              <l.UserDetails>Name : {user?.Name}</l.UserDetails>
              <l.UserDetails>
                Contact Number : {user?.ContactNumber}
              </l.UserDetails>
              <l.UserDetails>Address : {user?.Address}</l.UserDetails>
              <l.UserDetails>Email : {user?.Email}</l.UserDetails>
            </l.OrderUserDetails>
            <l.LogoSection>
              <l.Logo src={img} />
            </l.LogoSection>
          </l.SubSection1>
          <l.SubSection3>
            {props.data.length === 0 ? (
              <l.NotFound>
                <l.Image1 src={notfound} />
                <l.Text1>No Results Found</l.Text1>
              </l.NotFound>
            ) : (
              <l.Left>
                {Items.map((cart, index) => {
                  return (
                    <l.CartSection>
                      <l.ItemsCard>
                        <l.SubText>
                          <l.Text>Order Id : {cart.OrderId}</l.Text>
                          <l.Text>Price : Rs. {cart.TotalPrice}</l.Text>
                          <l.Text>
                            Status :{cart.Status}
                            <l.Icon1>
                              {cart.Status === "Confirm" ? (
                                <TiTick />
                              ) : (
                                <BsHourglassSplit />
                              )}
                            </l.Icon1>
                          </l.Text>
                          <l.Text>
                            Delivery Status :{cart.DeliveryStatus}
                            <l.Icon1>
                              {cart.DeliveryStatus === "Delivered" ? (
                                <TiTick />
                              ) : (
                                <BsHourglassSplit />
                              )}
                            </l.Icon1>
                          </l.Text>
                          {cart.Status === "Pending" ? (
                            <l.ButtonSection1>
                              <FormButton onClick={() => removeOrder(index)}>
                                Cancle
                              </FormButton>
                            </l.ButtonSection1>
                          ) : null}
                        </l.SubText>
                        <l.Section>
                          <l.Text>Items</l.Text>
                          <l.ItemSection>
                            {cart.food.map((food) => {
                              return (
                                <l.CartSection1>
                                  {/* <l.SelectIcon onClick={()=>{selectOne(index)}}>
                                                                        {change && selectItem === index ? <MdCheckBox/> : <MdCheckBoxOutlineBlank />}
                                                                    </l.SelectIcon> */}
                                  <l.ItemsCard1>
                                    <l.FoodImage>
                                      <l.Food
                                        src={`http://localhost:5000/${
                                          food.Foodid == null
                                            ? "offerimages"
                                            : "Foodimages"
                                        }/${food.image}`}
                                      />
                                    </l.FoodImage>
                                    <l.Details>
                                      <l.MainText>
                                        <l.FoodName>{food.FoodName}</l.FoodName>
                                      </l.MainText>
                                      <l.SubText>
                                        {/* <l.Text>
                                                                                    {cart.Size}
                                                                                </l.Text> */}
                                        <l.Text>
                                          Quantity : {food.quantity}
                                        </l.Text>
                                        {/* <l.Text>
                                                                                    Price : {food.quantity * cart.price}
                                                                                </l.Text> */}
                                      </l.SubText>
                                    </l.Details>
                                  </l.ItemsCard1>
                                </l.CartSection1>
                              );
                            })}
                          </l.ItemSection>
                        </l.Section>
                      </l.ItemsCard>
                    </l.CartSection>
                  );
                })}
              </l.Left>
            )}
          </l.SubSection3>
        </l.SubContainer>
        <l.ButtonSection>
          <Link to={props.BackRoutes} className="btn">
            <RegularButton>Back</RegularButton>
          </Link>
        </l.ButtonSection>
      </l.Container>
    </>
  );
};

export default MyOrdersComponent;
