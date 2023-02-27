import Dashboard from "../../components/shared/Dashboard/Dashboard";

const StaffMemberDashBoard = (props) => {
    return ( 
        <>
                <Dashboard Navs1 = {props.Navs} cards1={props.Card} ScrollToTop1={props.ScrollToTop}/>
        </>
     );
}
 
export default StaffMemberDashBoard;