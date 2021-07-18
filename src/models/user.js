const mongoose = require('mongoose');


const userSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        required:true,
        type:String,
        trim:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true
    },
    tokens:[
        {
        token:{
            type:String
        }
    }],
    
    transactions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Transactions'
    }],
    portfolioAmount:{
        type:Number,
        default:100000.0
    },
    cashAmount:{
        type:Number,
        default:100000.0
    },
    stockAmount:{
        type:Number,
        default:0
    },
    currentHoldings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Transactions'
        }
    ]


    
},{
    timestamps:true
})


const User=mongoose.model('User',userSchema);
module.exports=User;