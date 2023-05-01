import AddFoodsCategoriesComponent from "../../components/shared/AddCategories/AddFoodsCategories";

const ManagerAddCategories = (props) => {
  return (
    <>
      <AddFoodsCategoriesComponent BackRoutes={props.BackRoutes} />
    </>
  );
};

export default ManagerAddCategories;
