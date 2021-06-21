import React from "react"
import './App.css';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import OrderScreen from './Screens/OrderScreen';
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import { useDispatch, useSelector } from "react-redux";
import SigninScreen from "./Screens/SigninScreen";
import { signout } from "./actions/userActions";
import RegisterScreen from "./Screens/RegisterScreen";
import ShippingAddressScreen from "./Screens/ShippingAddressScreen";
import PaymentMethodScreen from "./Screens/PaymentMethodScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
function App() {
  const cart = useSelector((state) => state.cart);
  const {cartItems}=cart
  const userSignin=useSelector((state)=>state.userSignin)
  const {userInfo}=userSignin
  const dispatch=useDispatch()
  const signoutHandler=()=>{
    dispatch(signout())
  }
  return (
    <Router>

    
    <div className="app">
    <div className="navbar">
      <header>
        <div className="navbar__left">
          <Link to ="/" >My Store</Link>
        </div>
        <div className="navbar__right">
          <Link to="/cart">Cart
          {
            cartItems.length>0 &&(
              <span className="badge">{cartItems.length}</span>
            )
          }
          </Link>
          {userInfo?(
            <div className="dropdown">
            <Link to="#"> {userInfo.name}</Link>
            {/* <ul className="dropdown-content"> */}
              <Link to="#signout"onClick={signoutHandler}>Sign Out</Link>
            {/* </ul> */}
            </div>
          ):(
            <Link to="/signin">Sign In</Link>

          )}
          
        </div>
      </header>
      </div>

      <main>
        <Route path="/" exact component={HomeScreen}></Route>
          
        
        <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/cart/:id?"component={CartScreen}/> 
          <Route path="/signin"component={SigninScreen}></Route>         
          <Route path="/register"component={RegisterScreen}></Route> 
          <Route path="/shipping"component={ShippingAddressScreen}></Route>        
          <Route path="/payment"component={PaymentMethodScreen}></Route>        
          <Route path="/placeorder"component={PlaceOrderScreen}></Route>        
          <Route path="/order/:id" component={OrderScreen}></Route>
     
         </main>
         </div>
         </Router>
  );
}

export default App;
  
