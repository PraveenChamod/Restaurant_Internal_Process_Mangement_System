import React from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import {
  Page,
  Div,
  Div1,
  Div2,
  Div3,
  Div4,
  Div5,
  P,
  P1,
  Button1,
  Button2,
  RegularButton,
  Img,
  Img1
} from "./OrderingElement";
import { Header } from "../../shared/SharedElements/SharedElements";

import icon1 from '../../../Images/OrderIcon/OrderIcon1.png';
import icon2 from '../../../Images/OrderIcon/OrderIcon2.png';
import icon3 from '../../../Images/OrderIcon/OrderIcon3.png';
import icon4 from '../../../Images/OrderIcon/OrderIcon4.png';
import icon5 from '../../../Images/OrderIcon/OrderIcon5.png';
import icon6 from '../../../Images/OrderIcon/OrderIcon6.png';
import icon7 from '../../../Images/OrderIcon/OrderIcon7.png';
import icon8 from '../../../Images/OrderIcon/OrderIcon8.png';
import icon9 from '../../../Images/OrderIcon/noodles.png';

const Ordering = () => {

  return (
    <Page>
        <Header>SELECT ITEMS</Header>

          <Paper
      component="form"
      sx={{ p: '2px 2px', display: 'flex', alignItems: 'center', width: 500 , borderRadius: 20 , height : 35}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        // placeholder="Search Google Maps"
        // inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
          <Div>
          <Button1 ><Img src={icon1} alt="buttonpng" /></Button1>
          <Button1 ><Img src={icon2} alt="buttonpng" /></Button1>
          <Button1><Img src={icon3} alt="buttonpng" /></Button1>
          <Button1><Img src={icon4} alt="buttonpng" /></Button1>
          <Button1><Img src={icon5} alt="buttonpng" /></Button1>
          <Button1><Img src={icon6} alt="buttonpng" /></Button1>
          <Button1><Img src={icon7} alt="buttonpng" /></Button1>
          <Button1><Img src={icon8} alt="buttonpng" /></Button1>
          </Div>
          <Div>
            <Div1>
              <Div2>
                <Img1 src={icon9} alt="buttonpng"></Img1>
                <P>Chicken Noodles</P>
              </Div2>
              <Div3>
                <Div4>
                    <P1>Reguler</P1>
                    <P1>Rs.1000</P1>
                </Div4>
                <Div5>
                  <Button2><P>-</P></Button2>
                  <P>0</P>
                  <Button2><P>+</P></Button2>
                </Div5>
              </Div3>
              

            </Div1>

            <Div1></Div1>
            <Div1></Div1>
            <Div1></Div1>

          </Div>
          <Div>
          <RegularButton>
            <Link to="#" className="btn">
              ORDER
            </Link>
          </RegularButton>
          <RegularButton>
            <Link to="#" className="btn">
              ADD TO CART
            </Link>
          </RegularButton>
          </Div>
    </Page>
  );
};

export default Ordering;
