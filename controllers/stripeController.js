const stripe = require("stripe")(process.env.STRIPE_KEY);

const stripeController = async (req, res) => {
  const { total_amount, shipping_fee, purchase } = req.body;

  const calculateOrderAmount = () => {
    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "inr",
  });

  console.log(paymentIntent);
  res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;
