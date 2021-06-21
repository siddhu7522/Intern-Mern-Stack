import React,{useState,useEffect} from 'react';
import Product from '../components/Product';
import {useSelector,useDispatch} from "react-redux"
// import axios from "axios"
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import data from "../data"
export default function HomeScreen() {
  
  // const[products,setProducts]=useState([])
  // const[loading,setLoading]=useState(false)
  // const [error, setError] = useState(false);
  const dispatch=useDispatch()
  const productList=useSelector((state)=>state.productList)
  const {loading,error,products} =productList
  useEffect(()=>{
    // const fetchData=async()=>{
    //   const {data}=await axios.get("/api/products")
    //   setLoading(false);
    //   setProducts(data)


    // }
    // fetchData()
    dispatch(listProducts())


  },[])
    

  return (
    <div>
     {loading ? (
        <LoadingBox></LoadingBox> 

     
      ):(
        
        <div className="products">
        {products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>

      )
    
    }
      
    </div>
  );
}