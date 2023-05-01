import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import * as l from "./OrderingElement";
import { Header } from "../../shared/SharedElements/SharedElements";

import icon1 from "../../../Images/OrderIcon/OrderIcon1.png";
import icon2 from "../../../Images/OrderIcon/OrderIcon2.png";
import icon3 from "../../../Images/OrderIcon/OrderIcon3.png";
import icon4 from "../../../Images/OrderIcon/OrderIcon4.png";
import icon5 from "../../../Images/OrderIcon/OrderIcon5.png";
import icon6 from "../../../Images/OrderIcon/OrderIcon6.png";
import icon7 from "../../../Images/OrderIcon/OrderIcon7.png";
import icon8 from "../../../Images/OrderIcon/OrderIcon8.png";
import icon9 from "../../../Images/OrderIcon/noodles.png";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import useFetch from "../../../Hooks/useFetch";
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { toast } from "react-hot-toast";
const Ordering = (props) => {
  const [search, setSerach] = useState("");
  const [Items, setItems] = useState(props.data1);
  const [Offers, setOffers] = useState(props.data2);

  //Add items into the cart
  const AddToCart = async (foodId) => {
    try {
      await toast.promise(
        axios.post("api/v1/CartItem", { foodId: foodId }),
        {
          loading: ` Adding to the cart`,
          success: (data) => {
            console.log({ data });
            return ` ${data.data?.message} ` || "success";
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

  const AddOfferToCart = async (offerId) => {
    try {
      console.log(offerId);
      await toast.promise(
        axios.post("api/v1/CartItem", { offerId: offerId }),
        {
          loading: `Adding to the cart`,
          success: (data) => {
            console.log({ data });
            return ` ${data.data?.message} ` || "success";
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

  //Add To Cart Option Manage
  const handleAddToCart = async (index) => {
    const item = Items[index];
    await AddToCart(item.id);
  };

  const handleAddOfferToCart = async (index) => {
    const item = Offers[index];
    console.log(item.id);
    await AddOfferToCart(item.id);
  };

  //Search Items
  const handleSearch = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = props.data1.filter((user) => {
        return (
          user.FoodName.toLowerCase().startsWith(keyword.toLowerCase()) ||
          user.Category.toLowerCase().startsWith(keyword.toLowerCase())
        );
      });
      const results1 = props.data2.filter((user) => {
        return (
          user.OfferName.toLowerCase().startsWith(keyword.toLowerCase()) ||
          user.Category.toLowerCase().startsWith(keyword.toLowerCase())
        );
      });
      setItems(results);
      setOffers(results1);
    } else {
      setItems(props.data1);
      setOffers(props.data2);
    }

    setSerach(keyword);
  };

  return (
    <l.Page>
      <l.Section>
        <Header>SELECT ITEMS</Header>
        <l.Div>
          <Paper
            component="form"
            sx={{
              p: "2px 2px",
              display: "flex",
              alignItems: "center",
              width: 500,
              borderRadius: 20,
              height: 35,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              value={search}
              onChange={handleSearch}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              disabled
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </l.Div>
        <l.Div>
          <l.Button1>
            <l.Img src={icon1} alt="buttonpng" />
          </l.Button1>
          <l.Button1>
            <l.Img src={icon2} alt="buttonpng" />
          </l.Button1>
          <l.Button1>
            <l.Img src={icon3} alt="buttonpng" />
          </l.Button1>
          <l.Button1>
            <l.Img src={icon4} alt="buttonpng" />
          </l.Button1>
          <l.Button1>
            <l.Img src={icon5} alt="buttonpng" />
          </l.Button1>
          <l.Button1>
            <l.Img src={icon6} alt="buttonpng" />
          </l.Button1>
          <l.Button1>
            <l.Img src={icon7} alt="buttonpng" />
          </l.Button1>
          <l.Button1>
            <l.Img src={icon8} alt="buttonpng" />
          </l.Button1>
        </l.Div>
        <l.Div>
          {Items && Items.length > 0 ? (
            Items.map((data, index) => {
              return (
                <l.Div1 key={data.id}>
                  <l.Div2>
                    <l.Img1
                      src={`http://localhost:5000/Foodimages/${data.FoodImage}`}
                      alt="buttonpng"
                    ></l.Img1>
                    <l.P>{data.FoodName}</l.P>
                  </l.Div2>
                  <l.Div3>
                    <l.Div4>
                      <l.P1>Reguler</l.P1>
                      <l.P1>{"Rs." + data.Price}</l.P1>
                    </l.Div4>
                    <l.Div5
                      onClick={() => {
                        handleAddToCart(index);
                      }}
                    >
                      <l.Button2>
                        <FaShoppingCart />
                      </l.Button2>
                    </l.Div5>
                  </l.Div3>
                </l.Div1>
              );
            })
          ) : (
            <h1>No Result Found</h1>
          )}
        </l.Div>
        <Header>Today's Special</Header>
        <l.Div>
          {Offers && Offers.length > 0 ? (
            Offers.map((data, index) => {
              return (
                <l.Div1 key={data.id}>
                  <l.Div2>
                    <l.Img1
                      src={`http://localhost:5000/offerimages/${data.OfferImage}`}
                      alt="buttonpng"
                    ></l.Img1>
                    <l.P>{data.OfferName}</l.P>
                  </l.Div2>
                  <l.Div3>
                    <l.Div4>
                      <l.P1>Reguler</l.P1>
                      <l.P1>{"Rs." + data.SpecialPrice}</l.P1>
                    </l.Div4>
                    <l.Div5
                      onClick={() => {
                        handleAddOfferToCart(index);
                      }}
                    >
                      <l.Button2>
                        <FaShoppingCart />
                      </l.Button2>
                    </l.Div5>
                  </l.Div3>
                </l.Div1>
              );
            })
          ) : (
            <h1>No Result Found</h1>
          )}
        </l.Div>
        <l.Div>
          <Link to="/CustomerMyCart" className="btn">
            <RegularButton>ORDER</RegularButton>
          </Link>
        </l.Div>
      </l.Section>
      <l.ButtonSection>
        <Link to={props.BackRoutes} className="btn">
          <RegularButton>Back</RegularButton>
        </Link>
      </l.ButtonSection>
    </l.Page>
  );
};

export default Ordering;
