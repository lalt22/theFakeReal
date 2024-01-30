// const express = require("express");
// const app = express();
// require("dotenv").config();

// const stripe = require("stripe");
// const Stripe = stripe(process.env.SECRET_TEST_KEY);

// const bodyParser = require("body-parser");
// const cors = require("cors");

// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());
// app.use(cors());

// app.post("/payment", cors(), async (req, res) => {
//     let {amount, id} = req.body;
//     try {
//         const payment = await Stripe.paymentIntents.create({
//             amount,
//             currency: "AUD",
//             description: "Eshop",
//             payment_method: id,
//             confirm: true,
//             automatic_payment_methods : {
//                 enabled: true,
//                 allow_redirects: "never"
//             }
//         })
//         console.log("Payment", payment);
//         res.json({
//             message: "Payment Successful",
//             success: true
//         })
//         res.render("checkout", {client_secret: payment.client_secret});
//     } catch(error) {
//         console.log("error", error);
//         res.json({
//             message: "Payment failed",
//             success: false
//         })
//     }
// })


// // app.post("/create-checkout-session", cors(), async (req, res) => {
// //     const DOMAIN = 'http://localhost:5173/theFakeReal/cart'
// //     const session = await Stripe.checkout.sessions.create({
// //         payment_method_types: ['card'],
// //         mode: 'payment',
// //         success_url: `${DOMAIN}?success=true`,
// //         cancel_url: `${DOMAIN}?cancelled=true`
// //     })
// //     res.redirect(303, session.url);
// // })

// app.listen(process.env.PORT || 4000, () => {
//     console.log(process.env.PORT ? `Server listening on port ${process.env.PORT}` : "Server listening on 4000");
// })