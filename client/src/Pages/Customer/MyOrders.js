import React from "react";
import { useParams } from "react-router-dom";
import MyOrdersComponent from "../../components/Customer/MyOrders/MyOrders";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";

const MyOrders = () => {
    const{Email} = useParams();
    const{data,isPending} = useFetch(`/api/v1/Customer/Orders`);
    console.log(data);
    return ( 
        <div>
            {isPending && <Spinner/>}
            {data && <MyOrdersComponent data={data?.data?.customerorders}/>}
        </div>
     );
}
 
export default MyOrders;