import ViewAllComponent from "../../components/shared/ViewAll/ViewAll";

const ViewFoods = (props) => {
    return (  
        <>
            <ViewAllComponent Tables1={props.Tables}/>
        </>
    );
}
 
export default ViewFoods;