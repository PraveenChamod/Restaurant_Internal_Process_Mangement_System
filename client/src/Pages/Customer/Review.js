import Blog from "../../components/Customer/Blog/Blog";

const AddReview = (props) => {
  return (
    <>
      <Blog BackRoutes={props.BackRoutes} axiosInstance={props.axiosInstance} />
    </>
  );
};

export default AddReview;
