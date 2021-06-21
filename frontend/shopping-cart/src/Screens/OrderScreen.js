import React,{useEffect,useState} from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import Axios from 'axios';
import {useSelector,useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import { createOrder, detailsOrder, payOrder } from '../actions/orderActions';
import {PayPalButton} from "react-paypal-button-v2"
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    const[sdkReady,setSdkReady]=useState(false)
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
    const dispatch = useDispatch();
    useEffect(() => {
        const addPayPalScript = async () => {
          const { data } = await Axios.get('/api/config/paypal');
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
          script.async = true;
          script.onload = () => {
            setSdkReady(true);
          };
          document.body.appendChild(script);
        };
        if (!order || successPay || (order && order._id!==orderId)) {
          dispatch(detailsOrder(orderId));
        } else {
          if (!order.isPaid) {
            if (!window.paypal) {
              addPayPalScript();
            } else {
              setSdkReady(true);
            }
          }
        }
      }, [dispatch, order, orderId, sdkReady]);
    
    
      const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
      };
   

   
    return loading ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <div>
        <h4>Order {order._id}</h4>
        <div className="">
          <div className="placeorder">
            <ul>
              <li>
                <div className="placeorder__shipping">
                  <h5>Shipping</h5>
                  <p>
                    <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                    <strong>Address: </strong> {order.shippingAddress.address},
                    {order.shippingAddress.city},{' '}
                    {order.shippingAddress.postalCode},
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <MessageBox variant="success">
                      Delivered at {order.deliveredAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not Delivered</MessageBox>
                  )}
                </div>
              </li><br/>
              <li>
                <div className="placeorder__payment">
                  <h5>Payment</h5>
                  <p>
                    <strong>Method:</strong> {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <MessageBox variant="success">
                      Paid at {order.paidAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not Paid</MessageBox>
                  )}
                </div>
              </li><br/>
              <li>
                <div className="placeorder__items">
                  <h5>Order Items</h5>
                  <ul>
                    {order.orderItems.map((item) => (
                      <li key={item.product}>
                        <div className="row">
                          <div>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="small"
                            ></img>
                          </div>
                          <div className="">
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>
  
                          <div>
                            {item.qty} x ${item.price} = ${item.qty * item.price}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className="">
            <div className="order__summary">
              <ul>
                <li>
                  <h2>Order Summary</h2>
                </li>
                <li>
                  <div className="summary__items">
                    <div>Items</div>
                    <div>${order.itemsPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="summary__items">
                    <div>Shipping</div>
                    <div>${order.shippingPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="summary__items">
                    <div>Tax</div>
                    <div>${order.taxPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="summary__items">
                    <div>
                      <strong> Order Total</strong>
                    </div>
                    <div>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </div>
                  </div>
                </li>
              </ul>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                      <>
                      {errorPay &&(
                          <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay &&<LoadingBox></LoadingBox>}
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    ></PayPalButton>
                    </>

                  )}
                </li>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  