import ViewAllComponent from "../../components/shared/ViewAll/ViewAll";

const AdminViewFoods = (props) => {
    return (  
        <>
            <ViewAllComponent Tables1={props.Tables}/>
        </>
    );
}
 
export default AdminViewFoods;