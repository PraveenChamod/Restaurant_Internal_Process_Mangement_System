import AddUserComponent from "../../components/shared/AddUser/AddUser";

const AddOutletStaff = (props) => {
    return ( 
        <>
            <AddUserComponent BackRoutes={props.BackRoutes}/>
        </>
     );
}
 
export default AddOutletStaff;