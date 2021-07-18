const express = require('express');
const cors=require('cors');
const morgan=require('morgan');
const helmet=require('helmet');
require('./db/connection');

const app = express();

const userRoutes = require('./routes/user');
const stockRoutes = require('./routes/stock')

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(helmet());

app.use('/api',userRoutes);
app.use('/api',stockRoutes);



const port = process.env.PORT || 5000;


app.listen(port,()=>{
    console.log('Listening on port '+port);
})


