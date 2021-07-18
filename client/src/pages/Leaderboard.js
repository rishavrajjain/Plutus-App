import axios from 'axios'
import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import './dashboard.css'
import {toast} from 'react-toastify'



export default function Leaderboard() {

    const [data,setData]=useState();
    const [loading,setLoading]=useState(true);

    

    

    const [modal,setModal]=useState({
      name:'',
      price:'',
      ticker:'',
      _id:''
    })

    const [quantity,setQuantity]=useState(0);

    


    

    

    
    useEffect(()=>{
        const token = localStorage.getItem('app-token');
            var config = {
                headers: { 'Authorization': `Bearer ${token}`,
                'Content-type':'application/json'
            }
        };
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/leaderboard`,config).then((res)=>{
            console.log(res);
            setData(res.data.data)
            setLoading(false);
          

            
            
        }).catch(err=>{
            console.log(err);
            setLoading(false);
        })

        
    },[])

    

  

    
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
            <h2>LeaderBoard</h2>
            
          </div>
  
          
  
        </div>
      </section>
      
        
        <table class="table table-bordered table-hover" style={{marginTop:'5rem'}}>
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Portfolio Amount</th>
    </tr>
  </thead>
  <tbody>
  {
      data.map((user,index)=>{
        return(
            <tr>
                <th scope="row">{index+1}</th>
                <td>{user.name}</td>
                <td>${user.portfolioAmount}</td>
                
            </tr>
        )
      })
  }
    
    
  </tbody>
 
</table>


        </div>
        </div>
    )
}
