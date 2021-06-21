import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
function ShippingAddressScreen(props) {
    const userSignin=useSelector((state)=>state.userSignin)
    const {userInfo}=userSignin
    const cart=useSelector((state)=>state.cart)
    const {shippingAddress}=cart
    if(!userInfo){
        props.history.push("/signin")
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [pinCode, setPinCode] = useState(shippingAddress.pinCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const dispatch=useDispatch()
    const history=useHistory()
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({fullName,address,city,pinCode,country}))
        props.history.push("/payment")

    }
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="signIn__form"onSubmit={submitHandler}>
                <div>
                    <h4>Shipping Address</h4>
                </div>
                <div>
                    <label htmlFor="FullName">Full Name</label>
                    <input 
                    type="text"
                    id="fullName"
                    placeholder="Enter your Name"
                    value={fullName}
                    onChange={(e)=>setFullName(e.target.value)}

                    required></input>
                    </div>
                    <div>
                    <label htmlFor="Address">Address</label>
                    <input 
                    type="text"
                    id="address"
                    placeholder="Enter your Address"
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}

                    required></input>
                    </div>
                    <div>
                    <label htmlFor="City"> Your City</label>
                    <input 
                    type="text"
                    id="city"
                    placeholder="Enter your City"
                    value={city}
                    onChange={(e)=>setCity(e.target.value)}

                    required></input>
                    </div>
                    <div>
                    <label htmlFor="pincode">Pin Code</label>
                    <input 
                    type="text"
                    id="pincode"
                    placeholder="Enter your Pincode"
                    value={pinCode}
                    onChange={(e)=>setPinCode(e.target.value)}

                    required></input>
                    </div>
                    <div>
                    <label htmlFor="Country">Country</label>
                    <input 
                    type="text"
                    id="country"
                    placeholder="Enter your Country"
                    value={country}
                    onChange={(e)=>setCountry(e.target.value)}

                    required></input>
                    </div>
                    <div>
                        <button className="btn btn-primary">Continue</button>
                    </div>
                        </form>
            
       
        </div>
    )
}

export default ShippingAddressScreen
