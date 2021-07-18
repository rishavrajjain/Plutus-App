const mongoose = require('mongoose');


const transactionSchema=mongoose.Schema({
    
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    transaction:{
        type:String
    },
    content:{
        type:String
    },
    amount:{
        type:Number,
        required:true
    },
    ticker:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
    },
    price:{
        type:Number
    }
    
},{
    timestamps:true
})


const Transaction=mongoose.model('Transaction',transactionSchema);
module.exports=Transaction;