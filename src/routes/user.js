const express=require('express');
require('dotenv').config()

const User = require('../models/user');
const Transaction = require('../models/transactions')
const jwt=require('jsonwebtoken');
var yahooFinance = require('yahoo-finance');

const auth=require('../middleware/auth');

const router=express.Router();

router.post('/createuser',async(req,res)=>{

    console.log(req.body);

    try{

        const check=await User.findOne({email:req.body.email});

        if(check){
            res.status(409).json({
                data:{
                    message:'User Already exists.Please Login'
                }
            })
        }
        const user=new User(req.body);
        console.log(user)
        const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);
        user.tokens=user.tokens.concat({token})
        console.log(user);
        await user.save();
        console.log('done');
        res.status(200).json({
            data:{
                token,
                email:user.email,
                name:user.name,
                
            }
        })
        
    }catch(e){
        console.log(e);
        res.status(500).json({
            data:{
                message:'Internal Server Error'
            }
        })
    }

})

router.post('/login',async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    try{
        const user=await User.findOne({email});
        if(!user){
            res.status(404).json({
                data:{
                    message:'User Not found.Please register first.'
                }
            })
        }
        if(user.password === password){
            const token =jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);
            user.tokens=user.tokens.concat({token})
            await user.save();
            res.status(200).json({
                data:{
                    token,
                    email:user.email,
                    name:user.name,
                    
                }
            })

        }else{
            res.status(401).json({
                data:{
                    message:'Invalid Credentials'
                }
            })
        }
    }catch(err){
        res.status(500).json({
            data:err
        })
    }
})





router.post('/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.user.save()
        res.status(200).json({
            data:{
                message:'Logged out successfully'
            }
        })
    }catch(e){
        res.status(500).json({
            data:{
                message:'Internal Server Error'
            }
        })
    }
})


router.post('/dashboard',auth,async(req,res)=>{


    
    
    const topCompanies = ['AAPL','MSFT','AMZN','GOOG','NFLX','TSLA']
    const companyData=[]
    
    

    try{
        
        console.log(companyData)

        var stockAmount=0;

        await Promise.all(req.user.currentHoldings.map(async (holding)=>{
            const transaction = await Transaction.findOne({ _id:holding});
            console.log(transaction)
            const quotes = await yahooFinance.quote({
                symbol: transaction.ticker,
                modules: ['price', 'summaryDetail']
            });
            stockAmount = stockAmount + (transaction.quantity * quotes.price.regularMarketPrice)
        }))

        
        await Promise.all(topCompanies.map(async (company) => {
            const quotes = await yahooFinance.quote({
                symbol: company,
                modules: ['price', 'summaryDetail']
            });

            const data = {
                name: quotes.price.shortName,
                ticker: company,
                price: quotes.price.regularMarketPrice
            };
            console.log(data);
            companyData.push(data);

            req.user.stockAmount = stockAmount;
            req.user.portfolioAmount = stockAmount +req.user.cashAmount;
            

            

        }))
        await req.user.save();
            const personalData = {
                cashAmount:req.user.cashAmount,
                stockAmount,
                portfolioAmount:req.user.portfolioAmount
            }
            res.status(200).json({
                data:{
                    personalData,
                    companyData
                }
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

router.post('/buy',auth,async(req,res)=>{
    const data = req.body;
    try{
        const amount = data.price * data.quantity;
        if(amount > req.user.cashAmount){
            res.status(409).json({
                data:{
                    message:'Insufficient Cash Balance'
                }
            })
        }else{
            const transaction = new Transaction({
                owner : req.user._id,
                amount,
                price:req.body.price,
                transaction:'BUY',
                quantity:req.body.quantity,
                ticker:data.ticker
                
            })
            console.log(transaction)

            req.user.cashAmount = req.user.cashAmount - amount;
            req.user.stockAmount = req.user.stockAmount + amount;
            req.user.transactions.push(transaction._id);
            req.user.currentHoldings.push(transaction._id);
            await req.user.save()
            await transaction.save();
            res.status(200).json({
                data:transaction
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            data:{
                message:'Internal Server Error'
            }
        })
    }
})

router.post('/sell',auth,async(req,res)=>{
    console.log('etst')
    try{
        const ticker = req.body.ticker;
        const quotes = await yahooFinance.quote({
            symbol: ticker,
            modules: ['price', 'summaryDetail']
        });
        console.log(quotes)
        const amount = req.body.quantity * quotes.price.regularMarketPrice;
        const transaction = new Transaction({
            owner : req.user._id,
            amount,
            price:req.body.price,
            transaction:'SELL',
            quantity:req.body.quantity,
            ticker:req.body.ticker
            
        })
        console.log(transaction)

        req.user.transactions.push(transaction._id);
        req.user.currentHoldings = req.user.currentHoldings.filter((item)=> item.toString() !== req.body.id)
        req.user.cashAmount = req.user.cashAmount + amount;
        req.user.stockAmount = req.user.stockAmount - amount;
        await req.user.save();
        await transaction.save();

        res.status(200).json({
            data:transaction
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

router.get('/holdings',auth,async(req,res)=>{
    try{
        const result = [];
        req.user.currentHoldings.map(async(holding)=>{
            
            const data = await Transaction.findOne({_id:holding});
            result.push(data);

            if(result.length == req.user.currentHoldings.length){
                res.status(200).json({
                    data:result
                })
            }
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

router.get('/leaderboard',async(req,res)=>{
    try{
        const data = await User.find({},'name portfolioAmount').sort({
            'portfolioAmount':-1
          })
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