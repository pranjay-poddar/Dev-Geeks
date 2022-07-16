require("dotenv").config();
const path = require('path');

const express = require("express")
const app = express()
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const stripe=require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Donate" }],
  ])
  app.post("/create-checkout-session",async(req,res)=>{
    try{
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items.map(item => {
          const storeItem = storeItems.get(item.id)
          return {
            'amount':item.amount,
            'currency':'inr',
            'quantity':1,
            'name':'Donation'
          }
        }),
        success_url: `https://leprosy.herokuapp.com/#banner`,
        cancel_url: `https://leprosy.herokuapp.com/#banner`,


      })
      res.json({url:session.url})
    }
    catch(e){
      res.status(500).json({error:e.message})
    }
  })

  app.listen(process.env.PORT || 3000);