import ViewAllComponent from "../../components/shared/ViewAll/ViewAll";

const ViewStock = (props) => {
    return ( 
        <>
            <ViewAllComponent Tables1={props.Tables}/>
        </>
     );
}
 
export default ViewStock;