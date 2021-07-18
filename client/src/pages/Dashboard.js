import axios from 'axios'
import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import './dashboard.css'
import {toast} from 'react-toastify'



export default function Dashboard() {

    const [data,setData]=useState();
    const [loading,setLoading]=useState(true);

    const [ticker,setTicker]=useState('AAL');

    const [company,setCompany]=useState();

    const [modal,setModal]=useState({
      name:'',
      price:'',
      ticker:''
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
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/dashboard`,{},config).then((res)=>{
            console.log(res);
            setData(res.data.data);
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/company/${ticker}`).then((result)=>{
              setCompany(result.data.data);
              setModal(result.data.data)
              setLoading(false);
            }) .catch((err)=>{
              console.log(err);
              setLoading(false);
            }) 

            
            
        }).catch(err=>{
            console.log(err);
            setLoading(false);
        })

        
    },[])

    const viewData = (data) =>{
      
      setModal(data);
  }

  const buyStocks = async()=>{
    const token = localStorage.getItem('app-token');
            var config = {
                headers: { 'Authorization': `Bearer ${token}`,
                'Content-type':'application/json'
            }
        };
        try{
          const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/buy`,{
            ticker:modal.ticker,
            price:modal.price,
            quantity:quantity
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

    const onChange = async(e)=>{
      setLoading(true);
        setTicker(e.target.value)

        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/company/${e.target.value}`).then((result)=>{
          setCompany(result.data.data);
          setModal(result.data.data)
          setLoading(false);
        }) .catch((err)=>{
          console.log(err);
          setLoading(false);
        }) 
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
            <h2>Dashboard</h2>
            
          </div>
  
          <div class="row">
            <div class="col-lg-4 col-md-6">
              <div class="icon-box" data-aos="zoom-in-left">
                <div class="icon"><i class="fa fa-file-text" style={{color: "#ff689b"}}></i></div>
                <h4 class="title"><a href="">Portfolio Amount</a></h4>
                <p class="description">${data.personalData.portfolioAmount}</p>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 mt-5 mt-md-0">
              <div class="icon-box" data-aos="zoom-in-left" data-aos-delay="100">
                <div class="icon"><i class="fa fa-money" style={{color: "#e9bf06"}}></i></div>
                <h4 class="title"><a href="">Cash Amount</a></h4>
                <p class="description">${Math.round(data.personalData.cashAmount)}</p>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 mt-5 mt-md-0">
              <div class="icon-box" data-aos="zoom-in-left" data-aos-delay="100">
                <div class="icon"><i class="fa fa-line-chart" style={{color: "#4680ff"}}></i></div>
                <h4 class="title"><a href="">Stock Amount</a></h4>
                <p class="description">${Math.round(data.personalData.stockAmount)}</p>
              </div>
            </div>
  
            
            
            
            
          </div>
  
        </div>
      </section>
      <select class="form-control" name="country" onChange = {onChange} >
                {
                  companies.map((company)=>{
                    return(
                      <option value={company["Symbol"]}>{company["Company Name"]}</option>
                    )
                  })
                }
                
        </select>
        <table class="table table-bordered table-hover" style={{marginTop:'5rem'}}>
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Company</th>
      <th scope="col">Ticker</th>
      <th scope="col">Price</th>
      <th scope="col">Buy</th>
    </tr>
  </thead>
  <tbody>
 
            <tr>
                <th scope="row">{1}</th>
                <td>{company.name}</td>
                <td>{company.ticker}</td>
                <td>{'$'+company.price}</td>
                <td><button className="btn btn-block btn-success"  data-toggle="modal" data-target="#exampleModalCenter">Buy</button></td>
            </tr>
       
    
  </tbody>
 
</table>
<center><h3 style={{marginTop:'2rem'}}>Top Companies</h3></center>
        <table class="table table-bordered table-hover" style={{marginTop:'2rem'}}>
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Company</th>
      <th scope="col">Ticker</th>
      <th scope="col">Price</th>
      <th scope="col">Buy</th>
    </tr>
  </thead>
  <tbody>
  {
      data.companyData.map((company,index)=>{
        return(
            <tr>
                <th scope="row">{index+1}</th>
                <td>{company.name}</td>
                <td>{company.ticker}</td>
                <td>{'$'+company.price}</td>
                <td><button className="btn btn-block btn-success" onClick={()=>viewData(company)}  data-toggle="modal" data-target="#exampleModalCenter">Buy</button></td>
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
        <label>Name</label>
        <input disabled className="form-control" value={modal.name}></input>
        <label>Ticker</label>
        <input value={modal.ticker} className="form-control" disabled></input>
        <label>Amount</label>
        <input value={modal.price} className="form-control" disabled></input>
        
        <hr></hr>
        <label>Quantity</label>
        <input value={modal.quantity} className="form-control" onChange={(e)=>setQuantity(e.target.value)} type="number"></input>
        
        
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button class="btn btn-success" onClick={buyStocks}>Buy</button>
        
      </div>
    </div>
  </div>
</div>

        </div>
        </div>
    )
}
