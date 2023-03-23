import AddTableComponent from "../../components/shared/AddTables/AddTable";

const AdminAddTables = (props) => {
    return ( 
        <>
            <AddTableComponent BackRoutes={props.BackRoutes}/>
        </>
     );
}
 
export default AdminAddTables;