import ItemViewComponent from "../../components/shared/ItemView/ItemView";

const AdminViewTable = (props) => {

    //const[TableNo,setTableNo] = useState('');


    return ( 
        <>
            <ItemViewComponent View1 = {props.View}/>
        </>
     );
}
 
export default AdminViewTable;