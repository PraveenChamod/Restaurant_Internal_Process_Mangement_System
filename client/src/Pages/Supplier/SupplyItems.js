import SupplierItemsComponent from "../../components/Supplier/SupplierItems";

const SupplierItems = (props) => {
    return ( 
        <>
            <SupplierItemsComponent BackRoutes={props.BackRoutes}/>
        </>
     );
}
 
export default SupplierItems;