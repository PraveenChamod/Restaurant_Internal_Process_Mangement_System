import Dashboard from "../../components/shared/Dashboard/Dashboard";

const ManagerDashBoard = (props) => {
    return ( 
        <>
            <Dashboard Navs1 = {props.Navs} cards1={props.Card}/>
        </>
     );
}
 
export default ManagerDashBoard;