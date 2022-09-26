import React,{ useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MapContainer,Marker,Popup,TileLayer } from 'react-leaflet'
import SwiperCore, {Navigation,Pagination, Scrollbar, Ally} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from "../firebase.config"
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
SwiperCore.use([Navigation,Pagination, Scrollbar])


function Listing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setListing(docSnap.data())
        setLoading(false)
      }
    }

    fetchListing()
  }, [navigate, params.listingId])

  
  if (loading) {
    return <Spinner />
  }

  return (
    <main>

      <Swiper slidesPerView={1} pagination={{clickable: true}} style={{height:400}}>
      {listing.imageUrls.map((url,index)=>(
        <SwiperSlide key={index}>
            
        <div style={{background: `url(${listing.imageUrls[index]}) center no-repeat`, backgroundSize: 'cover',height:650}} className="swiperSlideDiv">
          
        </div>
     </SwiperSlide>
          
        ))}
     </Swiper>

    <div
        className='shareIconDiv'
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          setShareLinkCopied(true)
          setTimeout(() => {
            setShareLinkCopied(false)
          }, 2000)
        }}
      >
        <img src={shareIcon} alt='' />
      </div>

      {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}


     
      <div className='listingDetails'>
        <p className='listingName'>
          {listing.name} - 
           {listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Rs Or {''}
                  {listing.regularPrice/50} Credits / Day
                
        </p>
        
              
               
              
           

        <p className='listingLocation'>{listing.location}</p>
        <p className='listingType'>{listing.mobile}</p>
        
        <div className='row'>
          <div className='col'>
        <h3 style={{marginTop:14,fontSize:25}}>Description</h3>
        <p className='listingLocation' style={{fontSize:14,color:'grey', marginTop:25}}>
          {listing.description}
        </p>
        <div className='row' style={{borderRadius:80,marginTop:40}}>
       <div className='col' >
       
          <Link
            to={`/contact/${listing.useRef}?listingName=${listing.name}`}
            className='primaryButton' style={{position:'relative',top:0}}
          >
            Contact Manager
          </Link>
      
        </div>
        <div className='col' >
        
        <Link
            to={`/payment-listing`}
            className='primaryButton'
          >
            Get Membership
          </Link>
          </div>
          </div>   
      </div>
      

       
      <div className='col'>
        <a  href={`https://www.google.com/maps/dir//${listing.name}`} style={{fontWeight:600,fontSize:30}}>Location</a>
        <p>click here</p>
        <div className="leafletContainer" style={{height:'480px'}} >
          <MapContainer style={{height: '100%', width:'100%'}}
          center={[listing.geolocation.lat, listing.geolocation.lng]}
          zoom={13} scrollWheelZoom={false} >
             <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
            />
            
            
            <Marker position={[listing.geolocation.lat, listing.geolocation.lng]} >
            
              <Popup>{listing.location}</Popup>
              
            </Marker>
            
    
          </MapContainer>
        </div>
        </div>
        </div>
    
      </div>
    
      
      </main>
  )
}

export default Listing