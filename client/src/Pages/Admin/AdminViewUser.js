import ViewUserComponent from "../../components/shared/ViewUser/ViewUser";

const AdminViewUser = (props) => {
    return ( 
        <>
            <ViewUserComponent BackRoutes={props.BackRoutes}/>
        </>
     );
}
 
export default AdminViewUser;