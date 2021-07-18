const express=require('express');
require('dotenv').config()

const User = require('../models/user');
const Transaction = require('../models/transactions')
const jwt=require('jsonwebtoken');
var yahooFinance = require('yahoo-finance');

const auth=require('../middleware/auth');

const router=express.Router();

router.get('/company/:ticker',async(req,res)=>{
    try{
      const quotes = await yahooFinance.quote({
        symbol: req.params.ticker,
        modules: ['price', 'summaryDetail']
      });

      const data = {
          name: quotes.price.shortName,
          ticker: req.params.ticker,
          price: quotes.price.regularMarketPrice
      };
      res.status(200).json({
        data
      })
    }catch(err){
      console.log(err);
      res.status(500).json({
        data:{
            message:'Internal Server Error'
        }
      })
    }
      

})






module.exports=router;