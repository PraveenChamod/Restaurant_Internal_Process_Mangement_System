import AddFoodsComponent from "../../components/shared/AddFoods/AddFoods";

const AdminAddFoods = (props) => {
    return ( 
        <>
            <AddFoodsComponent BackRoutes={props.BackRoutes}/>
        </>
     );
}
 
export default AdminAddFoods;