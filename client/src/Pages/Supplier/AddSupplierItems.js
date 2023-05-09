import SupplierItemsComponent from "../../components/Supplier/AddSupplierItems/SupplierItems";

const AddSupplierItems = (props) => {
    return ( 
        <SupplierItemsComponent BackRoutes = {props.BackRoutes}/>
     );
}
 
export default AddSupplierItems;