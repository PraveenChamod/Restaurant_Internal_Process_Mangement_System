import AddDatingTableItemsComponent from "../../components/shared/AddDatingTableItems/AddDatingTableItems";

const ManagerAddDatingItems = (props) => {
    return ( 
        <>
            <AddDatingTableItemsComponent BackRoutes={props.BackRoutes}/>
        </>
     );
}
 
export default ManagerAddDatingItems;