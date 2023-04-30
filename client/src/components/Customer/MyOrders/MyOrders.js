import useAuth from "../../../Hooks/useAuth";
import * as l from "./MyOrdersElements";
import img from "../../../Images/restoLogodark.png";
import { TiTick } from "react-icons/ti";
import { BsHourglassSplit } from "react-icons/bs";
import { Link } from "react-router-dom";
import { RegularButton } from "../../shared/SharedElements/Buttons";
const MyOrdersComponent = (props) => {
  console.log(props.data);
  const { user } = useAuth();
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
            <l.Left>
              {props.data.map((cart) => {
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
