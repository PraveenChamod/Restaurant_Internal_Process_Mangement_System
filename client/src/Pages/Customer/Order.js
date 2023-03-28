import React from "react";
import Ordering from "../../components/Customer/Ordering/Ordering";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";

const Order = () => {
    const {data:food,isPending:isPending1} = useFetch('api/v1/Foods') ;
    const {data:offer,isPending:isPending2} = useFetch('api/v1/Offers');
    console.log(food?.data?.foods);
    return ( 
        <div>
            {isPending1 && isPending2 && <Spinner/>}
            {food && offer && <Ordering data1={food?.data?.foods} data2={offer}/>}
        </div>
     );
}
 
export default Order;