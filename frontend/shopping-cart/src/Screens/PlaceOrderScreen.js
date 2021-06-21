import React,{useEffect} from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import {useSelector,useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
function PlaceOrderScreen(props) {
   
  
    const cart=useSelector((state)=>state.cart)
    if(!cart.paymentMethod){
        props.history.push("/payment")
    }

    const orderCreate = useSelector((state) => state.orderCreate);
  const {  success,  order } = orderCreate;
    const toPrice=(num)=>Number(num.toFixed(2));
    cart.itemsPrice=toPrice(
        cart.cartItems.reduce((a,c)=>a+c.qty*c.price,0)
    );
    cart.shippingPrice=cart.itemsPrice>100?toPrice(0):toPrice(10)
    cart.taxPrice=toPrice(0.15*cart.itemsPrice)
    cart.totalPrice=cart.itemsPrice+cart.shippingPrice+cart.taxPrice
    const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="placeorder">
                <div className="">
                    <ul>
                        <li>
                            <div className="placeorder__shipping">
                                <h4>shipping</h4>
                                <p>
                                    <strong>Name:</strong>{cart.shippingAddress.fullName}<br/>
                                    <strong>Address:</strong>{cart.shippingAddress.address},
                                    {cart.shippingAddress.city},{cart.shippingAddress.pinCode}
                                    ,{cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <br/>
                        <li>
                            <div className="placeorder__payment">
                                <h4>Payment</h4>
                                <p>
                                    <strong>Method:</strong>{cart.paymentMethod}<br/>
                                   
                                </p>
                            </div>
                        </li>
                        <br/>
                        <li>
                            <div className="placeorder__items">
                                <h4>Order Items</h4>
                                <ul>
            {cart.cartItems.map((item) => (
              // <li key={item.product}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="">
                    <Link className="min-30__link" to={`/product/${item.product}`}>{item.name}</Link>
                  
                  <div>
                   
                  </div>
                  <div>
                    {item.qty} x ${item.price}=${item.qty * item.price}
                  </div>
                 
                  </div>
                </div>
              // </li>
            ))}
          </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="order__summary">
                    <ul>
                        <li>
                            <h5>Order Summary</h5>
                        </li>
                        <li>
                        <div className="summary__items">
                            <div>Items</div>
                            <div><strong>${cart.itemsPrice.toFixed(2)}</strong></div>
                        </div>

                        </li>
                        <li>
                            <div className="summary__items">
                                <div>Shipping</div>
                                <div><strong>{cart.shippingPrice.toFixed(2)}</strong></div>
                            </div>
                        </li>
                        <li>
                            <div className="summary__items">
                                <div>Tax</div>
                                <div><strong>{cart.taxPrice.toFixed(2)}</strong></div>
                            </div>
                        </li>
                        <li>
                            <div className="summary__items">
                                <div>Order Total</div>
                                <div><strong>{cart.totalPrice.toFixed(2)}</strong></div>
                            </div>
                            
                        </li>
                        <button type="submit"onClick={placeOrderHandler}
                        className="btn btn-primary"disabled={cart.cartItems.length===0}>
                            Place Order
                        </button>
                        {/* {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>} */}
                       
                    </ul>
                </div>
            </div>
            
        </div>
    )
}

export default PlaceOrderScreen
