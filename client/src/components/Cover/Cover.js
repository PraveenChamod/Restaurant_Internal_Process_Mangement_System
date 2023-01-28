import React from 'react';
import './CoverStyles.css';
import img from '../../Images/fast-food-png-41602.png'
import { Link } from 'react-router-dom';
const Cover = () => (

    <div className='container'>
            <div className='foodImage' data-aos="fade-right">
                <img alt="Burger" className='imgBurger' src={img} />
            </div>
            <div className='descriptionBox'>
                <p className='title' data-aos="fade-right">Your Favourite Food <br/>Delevered Hot &<br/>Fresh</p>
                <p className='description' data-aos="fade-right">Indulge in our handcrafted, artisanal burger, made with the freshest, locally sourced ingredients. The patty is made from 100% grass-fed, free-range beef, grilled to perfection and topped with a medley of aromatic, organic vegetables. Nestled in a toasty, artisanal bun, this juicy, savory creation is sure to satisfy your cravings and delight your taste buds. Don't miss out on this delectable, mouthwatering treat! </p>
                <button className='loginBtn'><Link to='./login' data-aos="fade-left">Login</Link></button>
            </div>
    </div>


);

export default Cover;
