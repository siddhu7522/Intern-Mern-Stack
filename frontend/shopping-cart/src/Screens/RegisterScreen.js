import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { register } from '../actions/userActions'
function RegisterScreen(props) {
    const [name, setName] = useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[confirmPassword,setConfirmPassword]=useState("")

    const dispatch=useDispatch()
    const redirect=props.location.search?props.location.search.split("=")[1]:"/";
    const userRegister=useSelector((state)=>state.userRegister)
    const {userInfo}=userRegister
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(register(name,email,password))
        if(password!==confirmPassword){
            alert("Password and confirmPassword does not match")
        }else{
            dispatch(register(name,email,password))
        }

    }
    useEffect(() => {
        if (userInfo) {
          props.history.push(redirect);
        }
      }, [props.history, redirect, userInfo]);
    return (
        <div>
           
           <form className="signIn__form" onSubmit={submitHandler}>
           <input 
               className="signin__input"
                type="name"
                placeholder=" Enter Your Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                <br/>
               
               <input 
               className="signin__input"
                type="email"
                placeholder=" Enter Your Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <br/>
               <input 
               className="signin__input" 
               type="password"
               placeholder=" Enter Your Password"
               value={password}
               onChange={(e)=>setPassword(e.target.value)}
               />
               <br/>
               <input 
               className="signin__input" 
               type="password"
               placeholder=" Confirm Passsword"
               value={confirmPassword}
               onChange={(e)=>setConfirmPassword(e.target.value)}
               />
               <br/>
               <button className="btn btn-primary" type="submit">Register</button><br/>
                    <div>
                        Already have an Account?{''}
                        <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
                    </div>

           </form>
        </div>
    )
}

export default RegisterScreen
