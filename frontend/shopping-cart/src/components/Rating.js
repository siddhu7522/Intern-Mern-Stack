import React from 'react'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
function Rating({rating,numReviews}) {
    return (
        <div className="product__rating">
           <span>
               <i className={rating>=1?"fa fa-star":"fas fa-star"}/>
           </span>
           <span>
               <i className={rating>=2.5?"fa fa-star":"fas fa-star"}/>
           </span>
           <span>
               <i className={rating>=1?"fa fa-star":"fas fa-star"}/>
           </span>
           <span>
               <i className={rating>=1?"fa fa-star":"fas fa-star"}/>
           </span>
            <div className="product__reviews">
                {numReviews + " reviews"}
            </div>
        </div>
    )
}

export default Rating
