import AddUserComponent from "../../components/shared/AddUser/AddUser";


const AdminAddUser = (props) => {
    return ( 
        <>
            <AddUserComponent BackRoutes={props.BackRoutes}/>
        </>
     );
}
 
export default AdminAddUser;