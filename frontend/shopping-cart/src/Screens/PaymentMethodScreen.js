import React,{useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
function PaymentMethodScreen(props) {
    const cart=useSelector((state)=>state.cart)
    const {shippingAddress}=cart;
    if(!shippingAddress){
        props.history.push("/shipping")
    }
    const [paymentMethod, setPaymentMethod] = useState("paypal")
    const dispatch=useDispatch()
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push("/placeorder")
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="payment__form"onSubmit={submitHandler}>
                <div>
                    <h4>Payment Method</h4>
                </div>
                <div>
                    <div>
                        <input
                        type="radio"
                        id="paypal"
                        value="paypal"
                        name="paymentMethod"
                        required
                        checked
                        value={paymentMethod}
                        onChange={(e)=>setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="paypal">Paypal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input
                        type="radio"
                        id="stripe"
                        value="stripe"
                        name="paymentMethod"
                        required
                       
                        value={paymentMethod}
                        onChange={(e)=>setPaymentMethod(e.target.value)}

                        />
                        <label htmlFor="paypal">Stripe</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Continue</button>
            </form>
            
        </div>
    )
}

export default PaymentMethodScreen
