import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import { FormButton, RegularButton } from "../../shared/SharedElements/Buttons";
import * as l from "./PackageDetailsElements";
import { Link } from "react-router-dom";
import { useState } from "react";
import notfound from "../../../Images/notFound/NoResults.png";
import { MdDelete } from 'react-icons/md';
import { toast } from "react-hot-toast";
import axios from "axios";
import useFetch from "../../../Hooks/useFetch";
import { Oval } from "react-loader-spinner";

const PackageDetailsComponent = (props) => {
    const[Name,setName] = useState("");
    const[price,setPrice] = useState();
    const[id,setId] = useState("");
    const[join, setJoin] = useState([]);
    const[click1, setClick1] = useState(false);
    const[serachText,setSearchText] = useState("");
    const {data,isPending} = useFetch('api/v1/TableItems');

    let itemIds = [];

    const removveItemFromModel = async ({itemId,id})=>{
        try {
            const data = {itemId,id}
            await toast.promise(
                axios.patch('api/v1/packageitem',data),
                {
                    loading: "Item is removing....",
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
            )
        } catch (error) {
            console.log(error.message);
        }
    }
      const removeItem = async (index) => {
        const itemId = join[index].id;
        const packageid = id;
        await removveItemFromModel({id:packageid,itemId:itemId})
        const newJoin = [...join];
        newJoin.splice(index, 1);
        setJoin(newJoin);
      };
      const handleItemClick = (item) => {
        const newItem = { ...item};
        setJoin([...join, newItem]);
        console.log(item);
        itemIds.push(item.id);
      };

      const handlePackageChange = (event) => {
        setSearchText(event.target.value);
      };
      const handleKeyPress = (e)=>{
        if(e.key === "Enter"){
            setName(serachText);
            props.data.map((Package) => {
            if (Package.packageName === serachText) {
                setClick1(true);
                setId(Package.id);
                setName(Package.packageName);
                setPrice(Package.Price)
                Package.Items.map(item=>{
                    itemIds.push(item.ItemId);
                    join.push({
                        id : item.ItemId,
                        ItemName : item.ItemName,
                        ItemImage : item.ItemImage
                    });
                })
            } else {
                console.log("NO Such Kind Of Category");
            }
            });
        }
      }

      const updatePacakge = async (e) => {
        e.preventDefault();
        try {
          const formData = { id, itemIds, price };
          await toast.promise(
            axios.patch("api/v1/packages", formData),
            {
              loading: "Package is updating....",
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
      console.log(join);
  return (
    <Container>
      <l.SubSection>
        <Header>Package Details</Header>
        <l.FormSection >
        <l.Div>
            <l.Searchbar
                type="text"
                placeholder="Enter the Package Name"
                onChange={handlePackageChange}
                onKeyPress={handleKeyPress}
            />
        </l.Div>
        <l.Div>
        {
            !click1? 
            <l.NotFound>
                <l.Image1 src={notfound} />
                <l.Text1>No Results Found</l.Text1>
            </l.NotFound>
          :
          <>
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
                {
                    isPending && 
                    <Oval
                    height={150}
                    width={150}
                    color="#FFBF00"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#FFBF00ed"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                }
                {data?.data?.TableItems.map((data) => {
                  if(data.ItemType === "Special Event"){
                    return (
                      <MenuItem
                        value={data.ItemName}
                        onClick={() => handleItemClick(data)}
                      >
                        <l.CartSection>
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
                  console.log(data);
                  return (
                    <l.CartSection>
                      <l.ItemsCard>
                        <l.FoodImage>
                          <l.Food
                            src={`http://localhost:5000/tableitemimages/${data.ItemImage || data.TableItemImage}`}/>
                        </l.FoodImage>
                        <l.Details>
                          <l.MainText>
                            <l.FoodName>
                              {data.ItemName}
                            </l.FoodName>
                          </l.MainText>
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
              <RegularButton onClick={updatePacakge}>Update</RegularButton>
            </l.ButtonSection>
          </l.Div2>
          </>
        }
        </l.Div>
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

export default PackageDetailsComponent;
