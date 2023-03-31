import React from 'react'
import AboutUs from '../components/AboutUs/AboutUs'
import ContactUs from '../components/ContactUs/ContactUs'
import Cover from '../components/Cover/Cover'
import Deals from '../components/Deals/Deals'
import Services from '../components/Services/Services'
import Spinner from '../components/shared/Spinner/Spinner'
import Testimonials from '../components/Testimonial/Testimonial'
import useFetch from '../Hooks/useFetch'


export const Home = (props) => {
  const{data,isPending} = useFetch('/api/v1/public/offers');
  console.log(data);
  return (
    <>
        <Cover ScrollToTop1={props.ScrollToTop}/>
        {isPending && <Spinner/>}
        {data && <Deals ScrollToTop1={props.ScrollToTop} data={data}/>}
        <AboutUs/>
        <Services/>
        <Testimonials/> 
        <ContactUs/>
    </>
  )
}