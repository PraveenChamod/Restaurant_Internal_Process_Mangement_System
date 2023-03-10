import CartComponent from '../../components/Customer/Cart/CartComponent';
import Spinner from '../../components/shared/Spinner/Spinner';
import useFetch from '../../Hooks/useFetch';
 const Cart = (props) => {

  const {data,isPending} = useFetch('api/v1/CartItems');


  return ( 
    <>
    {isPending && <Spinner/> }
      {data && <CartComponent data={data} cartData1 = {props.cartData}/>}
    </>
   );
 }
  
 export default Cart;
