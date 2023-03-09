import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckOut";



const Pay = () => {
    const [clientSecret, setClientSecret] = useState("");
    const stripePromise = loadStripe("pk_test_51MbCY3GuiFrtKvgKd8w5qdphJciL87lB1ITs2nFL1FUNQnfIqxPA4hX2A3qrhDd7Gfcsab01gcVNpXlTJs6ArcyF00t5WxYsrg");  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
 
export default Pay;