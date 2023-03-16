import PendingOrdersComponent from "../../components/shared/PendingOrders/PendingOrders";

const PendingOrders = (props) => {
    return ( 
        <>
            <PendingOrdersComponent BackRoutes={props.BackRoutes}/>
        </>
     );
}
 
export default PendingOrders;