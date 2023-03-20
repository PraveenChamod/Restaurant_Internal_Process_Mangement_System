import React from "react";
import Ordering from "../../components/Customer/Ordering/Ordering";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";

const Order = () => {
    const {data,isPending} = useFetch('api/v1/Foods');
    console.log(data?.data?.foods);
    const foods = data?.data?.foods;
    return ( 
        <div>
            {isPending && <Spinner/>}
            {data && <Ordering data1={foods}/>}
        </div>
     );
}
 
export default Order;