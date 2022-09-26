import React,{useState, useEffect, useRef} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {db} from '../firebase.config'
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'
import {toast} from 'react-toastify'
import {v4 as uuidv4} from 'uuid'
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import opencage from 'opencage-api-client'

function CreateListing() {

    const [geolocationEnabled, setGeolocationEnabled] = useState(true)

    const[loading,setLoading] = useState(false)

    const [formData, setFormData] = useState({
        type: 'Gym Registration',
        name: '', 
        parking: false,
        address: '',
  
        description:"",
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        mobile:0,
        images: {},
        latitude: 0,
        longitude: 0
    })

    const {type,name,parking,address,description,offer,regularPrice,discountedPrice,mobile,images,latitude,longitude} = formData

    const auth = getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true)

    useEffect(()=> {
        if(isMounted){
           onAuthStateChanged(auth, (user)=>{
               if(user){
                   setFormData({...formData, useRef: user.uid})
               } else{
                   navigate('/sign-in')
               }
           })
        }

        return () => {
            isMounted.current = false
        }
    },[isMounted])

    const onSubmit = async(e) => {
        e.preventDefault()

        setLoading(true)

        if(discountedPrice >= regularPrice){
           setLoading(false)
           toast.error('Discounted price needs to be less than regular price')
           return
        }

        if(images.length > 6){
          setLoading(false)
          toast.error('Max 6 images')
          return
        }

        let geolocation = {

        }
        let location

        if(geolocationEnabled){
          const res = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?location=${address}&key=${process.env.REACT_APP_API_KEY}`)
          
          const data = await res.json()
          console.log(data);
          geolocation.lat = data.results[0].locations[0].displayLatLng.lat 
          geolocation.lng = data.results[0].locations[0].displayLatLng.lng 

         
        }else{
          geolocation.lat = latitude
          geolocation.lng=longitude
        }

        //store images in firebase
        const storeImage = async (image) => {
          return new Promise((resolve, reject)=> {
            const storage = getStorage()
            const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

            const storageRef = ref(storage,'images/' + fileName)

            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on('state_changed', 
               (snapshot) => {
                 
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  switch (snapshot.state) {
                    case 'paused':
                     console.log('Upload is paused');
                     break;
                    case 'running':
                     console.log('Upload is running');
                     break;
                  }
                }, 
               (error) => {
                reject(error)
               }, 
               () => {
                 // Handle successful uploads on complete
                 // For instance, get the download URL: https://firebasestorage.googleapis.com/...
               getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               resolve(downloadURL);
            })
          }
        );
        })
      } 

        const imageUrls = await Promise.all(
          [...images].map((image)=> storeImage(image))
        ).catch(()=> {
          setLoading(false)
          toast.error('Images not uploaded')
          return
        })

        const formDataCopy = {
          ...formData,
          imageUrls,
          geolocation,
          timestamp: serverTimestamp()
        }

        formDataCopy.location = address
        delete formDataCopy.images
        delete formDataCopy.address
        !formDataCopy.offer && delete formDataCopy.discountedPrice

        const docRef = await addDoc(collection(db,'listings'), formDataCopy)

        setLoading(false)

        toast.success('Listing Saved')
        navigate(`/category/${formDataCopy.type}/${docRef.id}`)
    }

    const onMutate = (e) => {
        let boolean = null

        if(e.target.value === 'true'){
            boolean = true
        }
        if(e.target.value === 'false'){
            boolean = false
        }

        if(e.target.files){
            setFormData((prevState)=>({
                ...prevState,
                images:e.target.files
            } ))
        }

        if(!e.target.files){
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value
            }))
        }
    } 

    if(loading){
        return <Spinner/>
    }

  return (
    <div className='p'>
    <div className='profile'>
      <header>
          <p className="pageHeader">GYM Registration</p>
      </header>
    
      <main>
          <form onSubmit={onSubmit}>
              <label className='formLabel'>Name</label>
              <input
               className='formInputName'
               type='text'
               id='name'
               value={name}
               onChange={onMutate}
               maxLength='32'
               minLength='10'
               required
              />  
              
              
          
          
         
          

          <label className='formLabel'>Address</label>
          <textarea
            className='formInputAddress'
            type='text'
            id='address'
            value={address}
            onChange={onMutate}
            required
          />

         

          {!geolocationEnabled && (
              <div className='formLatLng flex'>
              <div>
                <label className='formLabel'>Latitude</label>
                <input
                  className='formInputSmall'
                  type='number'
                  id='latitude'
                  value={latitude}
                  onChange={onMutate}
                  required
                />
              </div>
              <div>
                <label className='formLabel'>Longitude</label>
                <input
                  className='formInputSmall'
                  type='number'
                  id='longitude'
                  value={longitude}
                  onChange={onMutate}
                  required
                />
              </div>
            </div>
          )}

<label className='formLabel'>Description</label>
          <textarea
            className='formInputDescription'
            type='text'
            id='description'
            value={description}
            onChange={onMutate}
            required
          />

<label className='formLabel'>For One Week</label>
          <div className='formButtons'>
            <button
              className={offer ? 'formButtonActive' : 'formButton'}
              type='button'
              id='offer'
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !offer && offer !== null ? 'formButtonActive' : 'formButton'
              }
              type='button'
              id='offer'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className='formLabel'>Regular Price</label>
          <div className='formPriceDiv'>
            <input
              className='formInputSmall'
              type='number'
              id='regularPrice'
              value={regularPrice}
              onChange={onMutate}
              min='50'
              max='750000000'
              required
            />
            {<p className='formPriceText'>Rs /Day</p>}
          </div>

          {offer && (
            <div>
              <label className='formLabel'>Weekly Price</label>
              <div className='formPriceDiv'>
              <input
                className='formInputSmall'
                type='number'
                id='discountedPrice'
                value={discountedPrice}
                onChange={onMutate}
                min='50'
                max='750000000'
                required={offer}
              />
              {<p className='formPriceText'>Rs /Week</p>}
              </div>
            </div>
          )}

<label className='formLabel'>Opening-Closing Time</label>
        
            <input
              className='formInputNum'
              type='text'
              id='mobile'
              value={mobile}
              onChange={onMutate}
              required
            />
          
      
      <label className='formLabel'>Images</label>
          <p className='imagesInfo'>
            The first image will be the cover (max 6).
          </p>
          <input
            className='formInputFile'
            type='file'
            id='images'
            onChange={onMutate}
            max='6'
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />
          <button type='submit' className='primaryButton createListingButton'>
            Create Listing
          </button>
          </form>
      </main>
    </div>
    </div>
  )}


export default CreateListing