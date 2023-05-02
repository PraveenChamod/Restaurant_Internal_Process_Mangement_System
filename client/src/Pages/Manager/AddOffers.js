import AddOffersComponent from "../../components/shared/AddOffers/AddOffers";

const ManagerAddOffers = (props) => {
  return (
    <>
      <AddOffersComponent
        BackRoutes={props.BackRoutes}
        axiosInstance={props.axiosInstance}
      />
    </>
  );
};

export default ManagerAddOffers;
