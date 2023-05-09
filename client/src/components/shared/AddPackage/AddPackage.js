import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Container, Header } from "../SharedElements/SharedElements";
import { FormButton, RegularButton } from "../SharedElements/Buttons";
import * as l from "./AddPackageElements";
import { Link } from "react-router-dom";
import { useState } from "react";
import notfound from "../../../Images/notFound/NoResults.png";
import { MdDelete } from 'react-icons/md';
import { toast } from "react-hot-toast";
import axios from "axios";

const AddPackages = (props) => {
    const[Name,setName] = useState("");
    const[Price,setPrice] = useState();
    const[Type,setType] = useState("");
    const [join, setJoin] = useState([]);

      const removeItem = (index, item) => {
        const newJoin = [...join];
        newJoin.splice(index, 1);
        setJoin(newJoin);
      };
      const handleItemClick = (item) => {
        const newItem = { ...item};
        setJoin([...join, newItem]);
      };
      let item;
      let Items=[];
      join.forEach((item) => {
        if (item.ItemName !== undefined) {
          item = item.id;
          Items.push({
            item
          });
        }
      });

      const AddPackage = async (e) => {
        e.preventDefault();
        try {
          const formData = { Name, Price, Items, Type };
          await toast.promise(
            axios.post("api/v1/packages", formData),
            {
              loading: "Package is adding....",
              success: (data) => {
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
          setName(null);
          setPrice(null);
        } catch (error) {
          console.log(error.message);
        }
      };
  return (
    <Container>
      <l.SubSection>
        <Header>Add Package</Header>
        <l.FormSection onSubmit={AddPackage}>
          <l.Div1>
            <TextField
              InputProps={{
                style: { color: "#fff" },
              }}
              id="standard-basic"
              label="Package Name"
              variant="standard"
              InputLabelProps={{ className: "textFeild_Label" }}
              sx={{ marginBottom: "10%" }}
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              InputProps={{
                style: { color: "#fff" },
              }}
              id="standard-basic"
              label="Package Price"
              variant="standard"
              InputLabelProps={{ className: "textFeild_Label" }}
              sx={{ marginBottom: "10%" }}
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              InputProps={{
                style: { color: "#fff" },
              }}
              id="standard-basic"
              label="Package Type"
              variant="standard"
              InputLabelProps={{ className: "textFeild_Label" }}
              sx={{ marginBottom: "10%" }}
              value={Type}
              onChange={(e) => setType(e.target.value)}
            />
            <InputLabel id="ItemList" sx={{ color: "#fff" }}>
              Item List
            </InputLabel>
            <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
              <Select
                labelId="ItemList"
                defaultValue={30}
                inputProps={{
                  name: "role",
                  id: "uncontrolled-native",
                }}
                sx={{
                  color: "white",
                  ".MuiSvgIcon-root ": {
                    fill: "white !important",
                    marginBottom: "10%",
                  },
                }}
              >
                {props.data.map((data) => {
                  console.log(data);
                  if(data.ItemType === "Special Event"){
                    return (
                      <MenuItem
                        value={data.ItemName}
                        onClick={() => handleItemClick(data)}
                      >
                        <l.CartSection>
                          {/* <l.SelectIcon onClick={()=>{selectOne(index)}}>
                                                      {change && selectItem === index ? <MdCheckBox/> : <MdCheckBoxOutlineBlank />}
                                                  </l.SelectIcon> */}
                          <l.ItemsCard>
                            <l.FoodImage>
                              <l.Food
                                src={`http://localhost:5000/tableitemimages/${data.TableItemImage}`}
                              />
                            </l.FoodImage>
                            <l.Details>
                              <l.MainText>
                                <l.FoodName>{data.ItemName}</l.FoodName>
                              </l.MainText>
                              <l.SubText>
                                <l.Text>Price : {data.ItemPrice}</l.Text>
                              </l.SubText>
                            </l.Details>
                          </l.ItemsCard>
                        </l.CartSection>
                      </MenuItem>
                    );
                  }
                })}
              </Select>
            </FormControl>
          </l.Div1>
          <l.Div2>
            <l.ItemSection>
              {join.length == 0 ? (
                <l.NotFound>
                  <l.Image1 src={notfound} />
                  <l.Text2>No Items Selected</l.Text2>
                </l.NotFound>
              ) : (
                join.map((data, index) => {
                  console.log(data.ItemName);
                  return (
                    <l.CartSection>
                      <l.ItemsCard>
                        <l.FoodImage>
                          <l.Food
                            src={`http://localhost:5000/tableitemimages/${data.TableItemImage}`}/>
                        </l.FoodImage>
                        <l.Details>
                          <l.MainText>
                            <l.FoodName>
                              {data.ItemName}
                            </l.FoodName>
                          </l.MainText>
                          <l.SubText>
                            <l.Text>Price : {data.ItemPrice}</l.Text>
                          </l.SubText>
                        </l.Details>
                        <l.IconSection>
                          <l.Icon onClick={() => removeItem(index, data)}>
                            <MdDelete />
                          </l.Icon>
                        </l.IconSection>
                      </l.ItemsCard>
                    </l.CartSection>
                  );
                })
              )}
            </l.ItemSection>
            <l.ButtonSection>
              <RegularButton>Add</RegularButton>
            </l.ButtonSection>
          </l.Div2>
        </l.FormSection>
      </l.SubSection>
      <l.ButtonSection1>
        <Link to={props.BackRoutes} className="btn">
          <RegularButton>Back</RegularButton>
        </Link>
      </l.ButtonSection1>
    </Container>
  );
};

export default AddPackages;
