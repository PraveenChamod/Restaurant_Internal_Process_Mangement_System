import CustomerDashboardComponent from "../../components/Customer/CustomerDashboard/CustomerDashBoardComponent";

const CustomerDashBoard = (props) => {
  return (
    <>
      <CustomerDashboardComponent Navs1={props.Navs} />
    </>
  );
};

export default CustomerDashBoard;
