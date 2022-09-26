import React,{useState, useEffect, useRef} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'
import {v4 as uuidv4} from 'uuid'
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import opencage from 'opencage-api-client'
import "../css/Payment.css"
import {toast} from 'react-toastify'
import {setDoc,getDoc, doc} from 'firebase/firestore'
import {db} from '../firebase.config'

function PaymentListing() {
  



  const navigate = useNavigate()
  const [formData, setFormData] = useState({
      days:'',
})

const {days} = formData

function onChange(e) {
  setFormData(e.target.value)
}

function onSubmit(e) {
  e.preventDefault()
  sessionStorage.setItem('days', formData);
  toast.success('Payment Successful')
  navigate(`/profile/${formData}`)
  
}
const onClick = () =>{

}
 
  return (
    <div class="container d-lg-flex p1">
              <div class="box-2" style={{minWidth:800}}>
                 <div class="box-inner-2"> 
                 <div>
                   <p class="fw-bold">Payment Details</p> 
                   <p class="dis mb-3">Complete your purchase by providing your payment details</p>
                   <p class="dis mb-3" style={{fontWeight:'bold'}}>1 Credit = 50Rs</p>
                    </div> 
                    <form action="submit">
                       
                       <div class=" my-3"> <label class="dis fw-bold mb-2">Days</label>
                                 <input class="form-control" type="number" id="days" value={days}  onChange={onChange}/>
                        
                        </div>
                        <div class="mb-3"> 
                       <p class="dis fw-bold mb-2">Email address</p>
                        <input class="form-control" type="email" placeholder="abc@gmail.com"/> 
                        </div> 
                        <div> 
                          <p class="dis fw-bold mb-2">Card details</p>
                           <div class="d-flex align-items-center justify-content-between card-atm border rounded">
                             <div class="fab fa-cc-visa ps-3"></div> <input type="text" class="form-control" placeholder="Card Details"/>
                              <div class="d-flex w-50"> <input type="text" class="form-control px-0" placeholder="MM/YY"/>
                               <input type="password" maxLength='3' class="form-control px-0" placeholder="CVV"/> 
                               </div> 
                               </div> 
                               <div class="my-3 cardname"> 
                               <p class="dis fw-bold mb-2">Cardholder name</p> 
                               <input class="form-control" type="text"/> </div> <div class="address"> 
                               <p class="dis fw-bold mb-3">Billing address</p> <select class="form-select" aria-label="Default select example"> 
                               <option defaultValue='India' hidden></option> 
                               <option value="1">Other Countries</option>
                               </select> <div class="d-flex"> 
                               <input class="form-control zip" type="text" placeholder="ZIP"/>
                                <input class="form-control state" type="text" placeholder="State"/> 
                                </div> 
                                   
                            
                                   
                                    
                                    <div class="d-flex align-items-center justify-content-between mb-2">
                                    <p class="fw-bold">Total Amount</p>
                                    <p class="fw-bold">Rs{formData*50}</p>
                                </div> 
                                     <div class="btn btn-primary mt-2" onClick={onSubmit}>Pay Rs{formData*50}</div></div></div></form></div></div></div>
  )}


export default PaymentListing