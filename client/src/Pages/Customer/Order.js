import React from "react";
import Ordering from "../../components/Customer/Ordering/Ordering";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";

const Order = () => {
    const {data,isPending} = useFetch('api/v1/Foods');
    console.log(data);
    return ( 
        <div>
            {isPending && <Spinner/>}
            {data && <Ordering data1={data?.data?.foods}/>}
        </div>
     );
}
 
export default Order;