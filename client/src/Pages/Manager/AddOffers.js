import AddOffersComponent from "../../components/shared/AddOffers/AddOffers";

const ManagerAddOffers = (props) => {
  return (
    <>
      <AddOffersComponent BackRoutes={props.BackRoutes} />
    </>
  );
};

export default ManagerAddOffers;
