import React from 'react'
import "../css/About.css"
import img1 from "../assets/svg/people-fill.svg"
import img2 from "../assets/svg/check2-circle.svg"
import img3 from "../assets/svg/person-check.svg"



import img from "../assets/jpg/about.jpg"
<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="https://form.jotform.com/jsform/222422496573459"></script>
</link>

function About() {
    return (
            <div class="aboutus-section">
            <div class="container">
                <div class="row">
                    <div class="col-md-3 col-sm-6 col-xs-12">
                        <div class="aboutus" >
                            <h2 class="aboutus-title">About Us</h2>
                            <p class="aboutus-text" style={{color:'black',fontSize:14}}>Hello everyone we are "The three amigos" this is the website based on fitness named Fitness Flex. Our aim is to provide people the gyms from wherever they are in the world with the same subscription they buy as a credit and then they can use that credit to use in any gyms around the world which is listed in the app.</p>
                           
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 col-xs-12">
                        <div class="aboutus-banner">
                        
                        </div>
                    </div>
                    <div class="col-md-5 col-sm-6 col-xs-12">
                        <div class="feature">
                            <div class="feature-box">
                                <div class="clearfix">
                                    <div class="iconset">
                                        <span class="glyphicon glyphicon-cog icon" style={{position:'relative',left:13}}><img src={img3} alt='' style={{height:20, width:30}}/></span>
                                    </div>
                                    <div class="feature-content">
                                        <h4>SUPPORT</h4>
                                        <p>Every member gets a free, personalized Get Started Plan when they join. Our friendly, professional staff is trained to help you along your fitness journey, no matter how much support you need.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="feature-box">
                                <div class="clearfix">
                                    <div class="iconset">
                                    <span class="glyphicon glyphicon-cog icon" style={{position:'relative',left:13}}><img src={img2} alt='' style={{height:20, width:30}}/></span>
                                    </div>
                                    <div class="feature-content">
                                        <h4>CONVENIENCE</h4>
                                        <p>Good Facility and best Equipmentts, With 24/7 access, you're joining the most convenient gym on the Country.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="feature-box">
                                <div class="clearfix">
                                    <div class="iconset">
                                    <span class="glyphicon glyphicon-cog icon" style={{position:'relative',left:13}}><img src={img1} alt='' style={{height:20, width:30}}/></span>
                                    </div>
                                    <div class="feature-content">
                                        <h4>COMMUNITY</h4>
                                        <p>You’re not just joining a gym. You’re joining a supportive community of like-minded people who are here to give you the encouragement you need.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;