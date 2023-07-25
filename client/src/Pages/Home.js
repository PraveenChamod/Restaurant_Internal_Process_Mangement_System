import React from "react";
import AboutUs from "../components/AboutUs/AboutUs";
import ContactUs from "../components/ContactUs/ContactUs";
import Cover from "../components/Cover/Cover";
import Deals from "../components/Deals/Deals";
import Services from "../components/Services/Services";
import Spinner from "../components/shared/Spinner/Spinner";
import Testimonials from "../components/Testimonial/Testimonial";
import useFetch from "../Hooks/useFetch";

export const Home = (props) => {
  const { data: data1, isPending: isPending1 } = useFetch(
    "/api/v1/public/offers"
  );
  const { data: data2, isPending: isPending2 } = useFetch(
    "/api/v1/public/blogs"
  );
  console.log(data1);
  return (
    <>
      <Cover ScrollToTop1={props.ScrollToTop} />
      {isPending1 && <Spinner />}
      {data1 && <Deals ScrollToTop1={props.ScrollToTop} data={data1} />}
      <AboutUs />
      <Services />
      {isPending2 && <Spinner />}
      {data2 && <Testimonials ScrollToTop1={props.ScrollToTop} data={data2} />}
      <ContactUs />
    </>
  );
};
