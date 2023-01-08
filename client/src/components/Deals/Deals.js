import React from 'react';
import OwlCarasel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import { card, responsive } from '../../Data/Content';
import './DealsStyles.css';

function Deals() {
  return (
    <div>
      <h1>Today Hot Deals</h1>
      <OwlCarasel
        className='owl-theme'
        items='3'
        autoplay
        loop
        margin={10}
        responsive={responsive}
      >
      {card.map((card) => {
        return (
          <div className='card'>
            <img className='product--image' src={card.img} alt='' />
            <h2>{card.Name}</h2>
            <p className='price'>{card.price}</p>
            {/* <button>Add to Cart</button> */}
          </div>
        );
      })}
    </OwlCarasel>
    </div>
  );
}

export default Deals;
