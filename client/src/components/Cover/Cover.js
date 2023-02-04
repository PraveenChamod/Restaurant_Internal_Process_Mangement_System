import React from 'react';
import './CoverStyles.css';
import img from '../../Images/Untitled-1_1-removebg-preview.png'
import { Link } from 'react-router-dom';
const Cover = (props) => (

    <div className='container' id="Cover">
            <div className='foodImage' data-aos="fade-right"
                                        data-aos-duration="1000">
                <img alt="Burger" className='imgBurger' src={img} />
            </div>
            <div className='descriptionBox'>
                <p className='title' data-aos="fade-left"
                                    data-aos-duration="1500">Your Favourite Food <br/>Delivered Hot &<br/>Fresh</p>
                <p className='description' data-aos="fade-left"
                                            data-aos-duration="1800">Indulge in our handcrafted, artisanal burger, made with the freshest, locally sourced ingredients. The patty is made from 100% grass-fed, free-range beef, grilled to perfection and topped with a medley of aromatic, organic vegetables. Nestled in a toasty, artisanal bun, this juicy, savory creation is sure to satisfy your cravings and delight your taste buds. Don't miss out on this delectable, mouthwatering treat! </p>
                <button className='loginBtn' data-aos="fade-left"
                                                data-aos-duration="2100" onClick={props.ScrollToTop1}><Link to='./login'>Login</Link></button>
            </div>
    </div>


);

export default Cover;
