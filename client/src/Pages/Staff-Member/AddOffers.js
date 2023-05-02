import AddOffersComponent from "../../components/shared/AddOffers/AddOffers";

const StaffMemberAddOffers = (props) => {
  return (
    <>
      <AddOffersComponent
        BackRoutes={props.BackRoutes}
        axiosInstance={props.axiosInstance}
      />
    </>
  );
};

export default StaffMemberAddOffers;
