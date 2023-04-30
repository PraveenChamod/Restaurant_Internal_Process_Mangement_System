import { useParams } from "react-router-dom";
import OfferDetails from "../../components/shared/OfferDetails/OfferDetails";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";

const ManagerViewOffer = (props) => {
  const { id } = useParams();
  console.log(id);
  const { data, isPending } = useFetch(`/api/v1/Offer/${id}`);
  console.log(data);
  const offer = data?.data?.Offer;
  console.log(offer);
  return (
    <>
      {isPending && <Spinner />}
      {offer && <OfferDetails offer={offer} />}
    </>
  );
};

export default ManagerViewOffer;
