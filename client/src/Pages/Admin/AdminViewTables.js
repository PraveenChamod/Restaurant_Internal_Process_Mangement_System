import ViewAllComponent from "../../components/shared/ViewAll/ViewAll";

const AdminViewTables = (props) => {
    return ( 
        <>
            <ViewAllComponent Tables1 = {props.Tables}/>
        </>
     );
}
 
export default AdminViewTables;