import AddFoodsComponent from "../../components/shared/AddFoods/AddFoods";

const ManagerAddFoods = (props) => {
    return ( 
        <>
            <AddFoodsComponent BackRoutes={props.BackRoutes}/>
        </>
     );
}
 
export default ManagerAddFoods;