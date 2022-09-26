import React from 'react'
import {Link} from 'react-router-dom'
import {ReactComponent as DeleteIcon} from '../assets/svg/deleteIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'
import Search from './Search'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'

function ListingItem({listing, id,onEdit, onDelete}) {
  return (
    <div>
    
   <li className='categoryListing'>
     <Link to={`/category/${listing.type}/${id}`} className='categoryListingLink'>
     <img src={listing.imageUrls[0]} alt={listing.name} className='categoryListingImg' style={{height:200,width:150}}/>
        <div className="categoryListingDetails">
            <p className="categoryListingLocation" style={{marginLeft:20}}>
                {listing.location}
            </p>
            <p className="categoryListingName" style={{marginLeft:20}}>{listing.name}</p>

            <p className="categoryListingPrice" style={{marginLeft:20}}>
            Rs {listing.offer ? listing.discountedPrice 
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                :listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                {listing.type && ' / Day'}    
            </p>
            <p className="categoryListingPrice" style={{marginLeft:20}}>
              
               {listing.regularPrice/50} Credits
              
            </p>
        </div>
        
     </Link>
    

     {onDelete && (
         <DeleteIcon className='removeIcon' fill='rgb(231,76,60)' onClick={()=>onDelete(listing.id, listing.name) } />
     )}
     {onEdit && <EditIcon className='editIcon' onClick={() => onEdit(id)} />}
   </li>
   </div>
  )
}

export default ListingItem