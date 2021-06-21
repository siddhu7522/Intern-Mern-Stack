import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { signin } from '../actions/userActions'
function SigninScreen(props) {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const dispatch=useDispatch()
    const redirect=props.location.search?props.location.search.split("=")[1]:"/";
    const userSignin=useSelector((state)=>state.userSignin)
    const {userInfo}=userSignin
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(signin(email,password))

    }
    useEffect(() => {
        if (userInfo) {
          props.history.push(redirect);
        }
      }, [props.history, redirect, userInfo]);
    return (
        <div>
           
           <form className="signIn__form"  onSubmit={submitHandler}>
               <h5>Sign In</h5>
              <input type="email"placeholder="Enter your Email"></input><br/>
              <input type="password"placeholder="Enter your Password"></input><br/><br/>
              <button className="btn btn-primary" type="submit">Sign In</button>

            <div><br/>
                New Customer? 
            <Link to={`/register?redirect=${redirect}`}> Create Your Account</Link>
            </div>
                </form>
        </div>
    )
}

export default SigninScreen
