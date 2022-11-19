import express from "express";
import Stripe from "stripe";
const app = express();
const port = 3000;

const PUBLISHABLE_KEY = "pk_test_51LqS2zHLApxlfaOJry3T8l00eZ6nG71LgDo2VyM4jOgeXqp4tGai54e9iscDBuzO97KIXWVnwABFkrkWnxZSoSXB00aaTYABJ2";
const SECRET_KEY = "sk_test_51LqS2zHLApxlfaOJd8MLWJEvuLTowz8A2HrfYJR1X2RbDhauMpv3CwpyT7RXqg3LD8VzNDcmDDq7jZ7oqrfShLkH00WzFoW9XZ";

const stripe = Stripe(SECRET_KEY, { apiVersion: "2022-11-15" })
app.listen(port, () => {
    console.log(`exemple app listening at http://localhost:${port}`)
})
app.post("create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntent.create(
            {
                amount: 1099,
                currency: "usd",
                payment_method_types: ["card"],

            }

        );
        const clientSecret = paymentIntent.client_secret;
        res.json({
            clientSecret: clientSecret,
        })


    } catch (e) {
        console.log(e.message);
        res.json({ error: e.message })
    }
})