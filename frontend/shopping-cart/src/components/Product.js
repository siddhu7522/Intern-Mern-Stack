import React from 'react'
import Rating from "./Rating"
import {Link} from "react-router-dom"
function Product(props) {
  const {product}=props
    return (
        <div key="product._id" className="card">
        <Link to={`/product/${product._id}`}>
          <img className="product__image" src={product.image}/>
        </Link>
        <div className="card__body">
          <Link to={`product/${product._id}`} >
            <h2>{product.name} </h2>
          </Link>
         <Rating rating={product.rating}numReviews={product.numReviews}/>
   
          
  <div className="price">
            Rs {product.price}
          </div>
       
</div>
        
       
      

</div>

    )
}

export default Product
