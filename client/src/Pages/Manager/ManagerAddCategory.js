import AddFoodsCategoriesComponent from "../../components/shared/AddCategories/AddFoodsCategories";

const ManagerAddCategory = (props) => {
  return (
    <>
      <AddFoodsCategoriesComponent BackRoutes={props.BackRoutes} />
    </>
  );
};

export default ManagerAddCategory;
