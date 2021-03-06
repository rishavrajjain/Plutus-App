import axios from 'axios'
import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import './dashboard.css'
import {toast} from 'react-toastify'



export default function Holdings() {

    const [data,setData]=useState();
    const [loading,setLoading]=useState(true);

    const [holdingQuantity,setHoldingQuantity]=useState(0);

    

    const [modal,setModal]=useState({
      name:'',
      price:'',
      ticker:'',
      _id:''
    })

    const [quantity,setQuantity]=useState(0);

    


    

    const companies = require('../data/companies.json')

    
    useEffect(()=>{
        const token = localStorage.getItem('app-token');
            var config = {
                headers: { 'Authorization': `Bearer ${token}`,
                'Content-type':'application/json'
            }
        };
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/holdings`,config).then((res)=>{
            console.log(res);
            setData(res.data.data)
            setLoading(false);
          

            
            
        }).catch(err=>{
            console.log(err);
            setLoading(false);
        })

        
    },[])

    const viewData = (data) =>{
      setQuantity(data.quantity)
      setModal(data);
  }

  const sellStocks = async()=>{
    const token = localStorage.getItem('app-token');
            var config = {
                headers: { 'Authorization': `Bearer ${token}`,
                'Content-type':'application/json'
            }
        };

        


        try{
          const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/sell`,{
            ticker:modal.ticker,
            price:modal.price,
            quantity,
            id:modal._id
          },config)
          console.log(res)
          toast.success('🦄 Trnsaction Successfull !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }catch(err){
          console.log(err)
        }
        
        
  }

    
    return loading ? (
        <div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

      <div class="col-sm-6 text-center"><p>Loading ...</p>
        <div class="loader4"></div>

      </div>

    </div>
    ):(
        <div>
        <Navbar/>
        <div className="container" style={{marginTop:'4rem'}}>
        <section id="services" class="services">
        <div class="container">
  
          <div class="section-title" data-aos="zoom-out">
            <h2>Holdings</h2>
            
          </div>
  
          
  
        </div>
      </section>
      
        
        <table class="table table-bordered table-hover" style={{marginTop:'5rem'}}>
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Ticker</th>
      <th scope="col">Buying Price</th>
      <th scope="col">Quantity</th>
      <th scope="col">Buy</th>
    </tr>
  </thead>
  <tbody>
  {
      data.map((company,index)=>{
        return(
            <tr>
                <th scope="row">{index+1}</th>
                <td>{company.ticker}</td>
                <td>{'$'+company.price}</td>
                <td>{company.quantity}</td>
                <td><button className="btn btn-block btn-primary" onClick={()=>viewData(company)}  data-toggle="modal" data-target="#exampleModalCenter">Sell</button></td>
            </tr>
        )
      })
  }
    
    
  </tbody>
 
</table>
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Invoice Details</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
        <label>Ticker</label>
        <input value={modal.ticker} className="form-control" disabled></input>
        <label>Amount</label>
        <input value={modal.price} className="form-control" disabled></input>
        
        <hr></hr>
        <label>Quantity</label>
        <input value={modal.quantity} className="form-control" disabled onChange={(e)=>setQuantity(e.target.value)} type="number"></input>
        
        
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button class="btn btn-success" onClick={sellStocks}>Sell</button>
        
      </div>
    </div>
  </div>
</div>

        </div>
        </div>
    )
}
