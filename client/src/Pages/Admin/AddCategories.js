import AddFoodsCategoriesComponent from "../../components/shared/AddCategories/AddFoodsCategories";

const AdminAddCategories = (props) => {
  return (
    <>
      <AddFoodsCategoriesComponent BackRoutes={props.BackRoutes} axiosInstance={props.axiosInstance}/>
    </>
  );
};

export default AdminAddCategories;
