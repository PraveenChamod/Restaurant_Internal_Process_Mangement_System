import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import {
  Page,
  Page1,
  Div,
  H2,
  Input,
  Texrarea,
} from "./BlogElement";
import {  RegularButton } from "../../shared/SharedElements/Buttons";
import { Header } from "../../shared/SharedElements/SharedElements";
import AuthState from "../../../Context/Auth/AuthState";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import { RotatingLines } from "react-loader-spinner";

const Blog = () => {
  const[Review,setReview] = useState('');
  const[Rate,setRate] = useState('');

  const{loadUser,loading,user} = useAuth();
  useEffect(() => {
    loadUser()
  }, [])
  
  const addReview = async (e)=>{
    e.preventDefault();
    try {
      const formData = {Review,Rate}
      const res = await axios.post('api/v1/customer/Review',formData)
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <Page>
      <Page1>
        <Header>SHARE YOUR OPINION WITH US</Header>
        <Div onSubmit={addReview}>
          <FormControl sx={{ m: 1, width: "50ch" }} variant="standard">
            <H2>NAME</H2>
            <Input type="text" id="name" name="name" placeholder="JOHNNY ANN" value={user?.Name}></Input>
            <H2>WRITE A REVIEW</H2>
            <Texrarea id="review" name="review" value={Review} onChange={e=>setReview(e.target.value)}></Texrarea>
            <H2>RATE US</H2>
            <Texrarea id="review" name="review" value={Rate} onChange={e=>setRate(e.target.value)}></Texrarea>
          </FormControl>
          <>
            {!loading && <RegularButton>Submit</RegularButton> }
            {loading && <RegularButton>
                          <RotatingLines
                              strokeColor="#fff"
                              strokeWidth="2"
                              animationDuration="1"
                              width="20"
                              visible={true}
                          />
                      </RegularButton>
            }
          </>
        </Div>
      </Page1>
    </Page>
  );
};

export default Blog;
