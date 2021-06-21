import Rating from "../components/Rating"
import React, { useEffect, useState } from 'react'
import {useHistory} from "react-router-dom"
import data from "../data"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import { useDispatch, useSelector } from "react-redux"
import { detailsProduct } from "../actions/productActions"
function ProductScreen(props) {
    //  const product=data.products.find((x)=>x._id===props.match.params.id)
    const[qty,setQty]=useState(1)
    const history=useHistory()

    const productDetails=useSelector((state)=>state.productDetails)
     const{loading,error,product}=productDetails
    const productId=props.match.params.id
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(detailsProduct(productId))

    },[])
    const addToCart=()=>{
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }
    return (
        <div>
         {loading ? (
          <LoadingBox></LoadingBox> 
   
        
         ):( 
            <div className="products__row">
            <div className="product__row1">
            <img className="productrow__image" src={product.image}></img>
            </div>
            <div className="product__row2">
                <h3>{product.name}</h3>
                <h2> Rs {product.price}</h2>
               <p> Description :<strong>{product.description}</strong></p>
                <Rating rating={product.rating} numReviews={product.numReviews}/>
            </div>
            <div className="product__row3">
                   
                  <div className="inline">Status
                    {product.countInStock>0?(
                    <span className="success"> Available</span>
                        ):(
                        <span className="error">UnAvailable</span>
                    )}
                    </div><br/>
                  <p>Price <span className="price">Rs {product.price}</span></p>
                  {
                     product.countInStock>0?(
                         <>
                         <div className="row"> </div><br/>

                        
                         <div className="product__quantity">Qty
                         <div>
                             <select className="product__select" value={qty}onChange={(e)=>setQty(e.target.value)}>
                             {[...Array(product.countInStock).keys()].map(
                                 (x)=>(
                                     <option key={x+1} value={x+1}>{x+1}</option>
                                 )
                             )}
                             </select>
                         </div>
                         </div>
                        

                         
                        <button onClick={addToCart} className="product__button">Add To Cart</button>
                        </>

                      ):(
                          <>
                          </>
                      )
                  }
                 
                        </div>
                    
                   
           
           
            
        </div>
           
         
   
         ) 
                        }
       
         
       </div>
       
    )
    }

export default ProductScreen
