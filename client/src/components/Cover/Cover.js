import React from 'react';
import './CoverStyles.css';

const Cover = () => (

    <div className='container'>
        <div className='left'>
                <div className='foodImage'>
                    <img alt="Burger" className='imgBurger' src={require('../../Images/Burger.png')} />
                </div>
                <div className='descriptionBox'>
                    <p className='title'>Your Favourite Food <br/>Delevered Hot &<br/>Fresh</p>
                    <p className='description'>Indulge in our handcrafted, artisanal burger, made with the freshest, locally sourced ingredients. The patty is made from 100% grass-fed, free-range beef, grilled to perfection and topped with a medley of aromatic, organic vegetables. Nestled in a toasty, artisanal bun, this juicy, savory creation is sure to satisfy your cravings and delight your taste buds. Don't miss out on this delectable, mouthwatering treat! </p>
                    <button className='loginBtn'>Login</button>
                </div>
        </div>
        <div className='right'/>
    </div>


);

export default Cover;
