import React from 'react'
import "../css/Body.css"
import img5 from "../assets/jpg/gym6.jpg"
import {useNavigate} from 'react-router-dom'

function Body() {

  const navigate = useNavigate();

  

  return (
    <div style={{height:1400}}>
    <div class="container-fluid bg-grey">
  <div class="row">
    <div class="col-sm-4">
      <img src={img5} alt='' style={{height:250,width:340,position:'relative', top:90}}/>
    </div>
    <div class="col-sm-8">
      <h2>Our Values</h2><br/>
      <h4><strong>MISSION:</strong> Our mission lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h4><br/>
      <h4><strong>VISION:</strong> Our Vision is to let people workout from wherever they are in at their own convinience with affordable price so they won't feel like spending a lot. By this we are making the people more healthier everyday by 1% which at the end benefits all mankind.</h4>
    </div>
  </div>
</div>

<section id="contact" class="contact">

      <div class="container" data-aos="fade-up">

        <header class="section-header">
          <h2>Contact</h2>
          <p>Contact Us</p>
        </header>

        <div class="row gy-4">

          <div class="col-lg-6">

            <div class="row gy-4">
              <div class="col-md-6">
                <div class="info-box">
                  <i class="bi bi-geo-alt"></i>
                  <h3>Address</h3>
                  <p>BIT Durg</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="info-box">
                  <i class="bi bi-telephone"></i>
                  <h3>Call Us</h3>
                  <p>8602210987<br/>9098382271</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="info-box">
                  <i class="bi bi-envelope"></i>
                  <h3>Email Us</h3>
                  <p>vishwadeep@gmail.com<br/>hemant@gmail.com</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="info-box">
                  <i class="bi bi-clock"></i>
                  <h3>Open Hours</h3>
                  <p>24/7</p>
                </div>
              </div>
            </div>

          </div>

          <div class="col-lg-6">
            <form action="forms/contact.php" method="post" class="php-email-form">
              <div class="row gy-4">

                <div class="col-md-6">
                  <input type="text" name="name" class="form-control" placeholder="Your Name" required></input>
                </div>

                <div class="col-md-6 ">
                  <input type="email" class="form-control" name="email" placeholder="Your Email" required></input>
                </div>

                <div class="col-md-12">
                  <input type="text" class="form-control" name="subject" placeholder="Subject" required></input>
                </div>

                <div class="col-md-12">
                  <textarea class="form-control" name="message" rows="6" placeholder="Message" required></textarea>
                </div>

                <div class="col-md-12 text-center">
                  <div class="loading">Loading</div>
                  <div class="error-message"></div>
                  <div class="sent-message">Your message has been sent. Thank you!</div>

                  <button type="submit" style={{backgroundColor:'#fdb801'}}>Send Message</button>
                </div>

              </div>
            </form>

          </div>

        </div>

      </div>

    </section>
    <footer id="footer" class="footer">

    <div class="footer-newsletter">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12 text-center">
            <h4>Our Newsletter</h4>
            <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
          </div>
          <div class="col-lg-6">
            <form action="" method="post" >
              <input type="email" name="email"></input><input type="submit" value="Subscribe" style={{backgroundColor:'#fdb801'}}></input>
            </form>
          </div>
        </div>
      </div>
    </div>
  </footer>

</div>
          

  )
}



export default Body