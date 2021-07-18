import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import './home.css'

export default function Home() {
    return (
        <div>
        <Navbar/>
        <section id="hero" class="d-flex align-items-center">
    <div class="container" data-aos="zoom-out" data-aos-delay="100">
      <h1>Welcome to <span>Plutus</span>
      </h1>
      <h2>A platform to increase financial literacy and get hands on experience on Stock Trading using Gamification</h2>
      <div class="d-flex">
        <Link to="/signup" class="btn-get-started scrollto">Get Started</Link>
        
      </div>
    </div>
  </section>
        <div className="container">
        
        <section id="featured-services" class="featured-services">
        <div class="container" data-aos="fade-up">
  
          <div class="row">
            <div class="col-md-12 col-lg-12  align-items-stretch mb-5 mb-lg-0" style={{marginTop:'1rem'}}>
              <div class="icon-box" data-aos="fade-up" data-aos-delay="100">
                <div class="icon"><i class="fa fa-file-text-o"></i></div>
                <h4 class="title"><a href="">Trade Stocks</a></h4>
                <p class="description"></p>
              </div>
            </div>
  
            <div class="col-md-12 col-lg-12  align-items-stretch mb-5 mb-lg-0" style={{marginTop:'1rem'}}>
              <div class="icon-box" data-aos="fade-up" data-aos-delay="200">
                <div class="icon"><i class="fa fa-money"></i></div>
                <h4 class="title"><a href="">Compete for the best portfolio on leaderboards</a></h4>
                <p class="description"></p>
              </div>
            </div>
  
            <div class="col-md-12 col-lg-12  align-items-stretch mb-5 mb-lg-0" style={{marginTop:'1rem'}}>
              <div class="icon-box" data-aos="fade-up" data-aos-delay="300">
                <div class="icon"><i class="fa fa-line-chart"></i></div>
                <h4 class="title"><a href="">Compete on Daily/Weekly contests and Gamified Learning</a></h4>
                <p class="description">Coming soon</p>
              </div>
            </div>
  
            
  
          </div>
  
        </div>
      </section>
      </div>
        </div>
    )
}
