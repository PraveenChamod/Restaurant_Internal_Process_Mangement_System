import FoodDetails from "../../components/shared/FoodDetails/FoodDetails";

const StaffMemberViewFoods = (props) => {
    return (  
        <>
            <FoodDetails BackRoutes={props.BackRoutes}/>
        </>
    );
}
 
export default StaffMemberViewFoods;