import { FormControl, TextField, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { FormButton, RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import * as l from "./AddSpecialEventElements";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";


const AddSpecialEventComponent = (props) => {

  const [EventName, setEventName] = useState("");
  const [Item1, setItem1] = useState("");
  const [Item2, setItem2] = useState("");
  const [Item3, setItem3] = useState("");

  const [BronzePrice, setBronzePrice] = useState("");
  const [SilverPrice, setSilverPrice] = useState("");
  const [GoldPrice, setGoldPrice] = useState("");

  const addSpecialEvent = async (e) => {
    e.preventDefault();
    try {
      const Data = new FormData();

      Data.append("EventName", EventName);
      Data.append("Item1", Item1);
      Data.append("Item2", Item2);
      Data.append("Item3", Item3);
      Data.append("BronzePrice", BronzePrice);
      Data.append("SilverPrice", SilverPrice);
      Data.append("GoldPrice", GoldPrice);
      
      console.log(Data);

      await toast.promise(
        axios.post("api/v1/SpecialEvent", Data),
        {
          loading: "Event is Adding....",
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
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <l.SubSection>
        <Header>Add Special Event</Header>
        <l.FormSection onSubmit={addSpecialEvent}>
          <l.LeftSide>
            <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
              <TextField
                id="standard-basic"
                label="Event Name"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginTop: "10%" }}
                value={EventName}
                onChange={(e) => setEventName(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
              <TextField
                id="standard-basic"
                label="Item 1"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginTop: "10%" }}
                value={Item1}
                onChange={(e) => setItem1(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
              <TextField
                id="standard-basic"
                label="Item 2"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginTop: "10%" }}
                value={Item2}
                onChange={(e) => setItem2(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
              <TextField
                id="standard-basic"
                label="Item 3"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginTop: "10%" }}
                value={Item3}
                onChange={(e) => setItem3(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
            </FormControl>
          </l.LeftSide>
          <l.RightSide>
          <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
              <TextField
                id="standard-basic"
                label="Price of Bronze Package"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginTop: "10%" }}
                value={BronzePrice}
                onChange={(e) => setBronzePrice(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
              <TextField
                id="standard-basic"
                label="Price of Silver Package"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginTop: "10%" }}
                value={SilverPrice}
                onChange={(e) => setSilverPrice(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
              <TextField
                id="standard-basic"
                label="Price of Gold Package"
                variant="standard"
                InputLabelProps={{ className: "textFeild_Label" }}
                sx={{ marginTop: "10%" }}
                value={GoldPrice}
                onChange={(e) => setGoldPrice(e.target.value)}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
            </FormControl>
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
};

export default AddSpecialEventComponent;
