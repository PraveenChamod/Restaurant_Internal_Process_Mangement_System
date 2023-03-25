import Stripe from "stripe";
const stripe = Stripe('sk_test_51MbCY3GuiFrtKvgKRlTswuS2ZIlFZdYvBKP9TKGA4OdrqC5pgCreZkQJpNrX0d09pccyDr2iuXrTDrVBEkXKV9S000q80NzIvV');
export const pay = async (req, res) => {
    const TotalPrice = req.body.amount * 100;
    const Email = req.body.receipt_email;
    console.log(TotalPrice);
    console.log("Payment Request recieved for this ruppess", TotalPrice);
  
    const payment = await stripe.paymentIntents.create({
      amount: TotalPrice,
      currency: "lkr",
      receipt_email:Email,
    });
  
    res.status(201).send({
      clientSecret: payment.client_secret,
    });
  }