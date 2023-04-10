import AddFoodsCategoriesComponent from "../../components/shared/AddCategories/AddFoodsCategories";

const AdminAddCategories = (props) => {
    return ( 
        <>
            <AddFoodsCategoriesComponent BackRoutes={props.BackRoutes}/>
        </>
     );
}
 
export default AdminAddCategories;