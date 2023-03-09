import React from "react";
import Ordering from "../../components/Customer/Ordering/Ordering";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";

const Order = () => {
    const {data,isPending} = useFetch('api/v1/serviceProvider/food/getFoods');
    return ( 
        <div>
            {isPending && <Spinner/>}
            {data && <Ordering data1={data}/>}
        </div>
     );
}
 
export default Order;