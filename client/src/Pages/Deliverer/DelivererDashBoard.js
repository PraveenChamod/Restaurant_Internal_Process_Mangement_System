import Dashboard from "../../components/shared/Dashboard/Dashboard";

const DelivererDashBoard = (props) => {
    return ( 
        <>
                <Dashboard Navs1 = {props.Navs} cards1={props.Card} ScrollToTop1={props.ScrollToTop}/>
        </>
     );
}
 
export default DelivererDashBoard;