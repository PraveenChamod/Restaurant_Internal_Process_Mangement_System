import CartComponent from '../../components/Customer/Cart/CartComponent';
 const Cart = (props) => {
  return ( 
    <>
      <CartComponent cartData1 = {props.cartData}/>
    </>
   );
 }
  
 export default Cart;
