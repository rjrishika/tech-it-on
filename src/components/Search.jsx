import { Button } from 'bootstrap'
import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {collection, query, where, orderBy, limit,startAfter, getDocs, loadBundle, QuerySnapshot } from 'firebase/firestore'
import {db} from "../firebase.config"
import {toast} from 'react-toastify'

function Search() {
  const [listings, setListings] = useState([])
  const [loading,setLoading] = useState(true)
  const [search, setSearch] = useState('')
  
  const params = useParams()

  useEffect(()=> {
    const fetchListings = async() => {
        try {
            const listingsRef= collection(db, 'listings')

            const q = query(listingsRef, orderBy('timestamp', 'desc'),limit(10))

            const querySnap = await getDocs(q)

            let listings = []

            // querySnap.forEach((doc)=> {
            //     return listings.push({
            //         id: doc.id,
            //         data: doc.data()
            //     })
            // })

            console.log(querySnap)

            console.log(listings)

           return listings
        } catch (error) {
            toast.error('Could not fetch listings')
        }

        fetchListings()
    }
},[])

  
  const handleSearch=async(e) => {

    e.preventDefault()
    console.log(listings);
    if(search){
  
      const searchedExercises = listings.filter(
        (listing)=> {
          console.log(listing)
          return listing.location === search}
         
      );
      console.log(searchedExercises)
     }
     
    
      }
    
    
    
    
 
  
  
  return (
       <div>
         <form>
           
            <div className="signInBar">
             <input type="text" className="searchInput" placeholder='Search' id='text' onChange={e => setSearch(e.target.value)} /> 
              <button className="signInText btn btn-dark" style={{position:"relative",bottom:20,left:6 , borderRadius:40,fontSize:20}} onClick={handleSearch}>
                Search
              </button>
            </div>
         </form>
       </div>
  )
  }

export default Search