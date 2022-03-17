import React, {useState, useEffect} from 'react'
import { Redirect, useHistory} from 'react-router-dom';
import SignInStyle from './SignInPage.module.css'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { successfulLoggedIn, unsuccessfulLoggedIn  } from '../../Global/Action/userAction';
import store from '../../Global/Store/store'
import ButtonLoader from '../../Component/ButtonLoader/ButtonLoader';
import Cookies from 'js-cookie'
import { storeProfileAction, storeProfileFailed } from '../../Global/Action/userAction';

const SignInPage = () => {
    const history = useHistory()
    const [isSubmit, setSubmit] = useState(false)
    const [showHomePage, setShowHomePage] = useState(false)
    const dispatch = useDispatch()
    const [loginResponse, setLoginResponse] = useState("")
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    }) //set the sign in form data

    // userRegistrationHandler
    const userRegistrationHandler = (e) => {
        e.preventDefault();
        // console.log("hello");
        history.push(`/register`)
    }

    //login submit handlers
    const submitHandler = async(e) => {
        e.preventDefault()
        // const {email, password} = formData //get the login form input data
        setSubmit(true)
    }

    //login form submission part
    useEffect(() => {
        const loginSubmit = async () => {
            try {
                if(isSubmit) {
                    const isLoggedIn = await axios.post(`http://localhost:3030/user/login`, formData)
                    const {data, status} = isLoggedIn //get the data from http request
                    const {message} = data
                    if(status == 202) {
                        const {token} = data
                        localStorage.setItem('auth-token', token) //set the token into local storage
                        // console.log(token);
                        dispatch(successfulLoggedIn(token)) //change the global state
                        const currentState = store.getState() //get the current update global state
                        const  {loginUserReducer} = currentState 
                        const {header} = loginUserReducer
                        const getLoggedIndUser = await axios.get('http://localhost:3030/user/profile', header)
                        // console.log(getLoggedIndUser.data);
                        const userData = getLoggedIndUser.data.data //get the logged in user data
                        const status = getLoggedIndUser.status
                        // console.log(status)
                    
                        if(status == 202) {
                            dispatch(storeProfileAction(userData)) //store the data into global storage 
                            // Cookies.set('loggedIn-User', userData )
                            setLoginResponse(message)
                            setSubmit(false)
                            setShowHomePage(true)
                        }else {
                            dispatch(storeProfileFailed()) //store the data into global storage
                            setLoginResponse(message)
                            setSubmit(false)
                        }
                    }else {
                        dispatch(unsuccessfulLoggedIn()) //change the global state
                        setLoginResponse(message)
                        setSubmit(false)
                        console.log(`hello`);
                    }
                }else {
                    return 0
                }

            }catch(err) {
                dispatch(unsuccessfulLoggedIn())
            }
        }
        loginSubmit()
    }, [isSubmit])

    //if loggedIn Successfully then go to home page
    useEffect(() => {
        if(showHomePage) {
            setTimeout(() => {
                history.push('/')
            }, 1000)
        }
    }, [showHomePage])
    return (
        // signInPage Wrapper
        <div className = {`${SignInStyle.mainContentWrap}`}>
            {/* form Wrapper */} 
            <div className = {`${SignInStyle.subContentWrap}`}>
                <p className = {`h4`}>Sign-In</p>
                <form>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input 
                        type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        value = {formData.email}
                        onChange = { (e) => setFormData({...formData, email: e.target.value}) }/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1"
                        value = {formData.password}
                        onChange = { (e) => setFormData({...formData, password: e.target.value}) }/>
                    </div>
                    {
                        isSubmit 
                        ?
                        <button className= {`btn btn-primary w-100 ${SignInStyle.loginButton}`}  >
                            <ButtonLoader/>
                        </button>
                        :
                        <button type="submit" 
                        className= {`btn btn-primary w-100 ${SignInStyle.loginButton}`} 
                        onClick = {(e) => submitHandler(e)} >Submit</button>
                    }
                </form>
                <p>{loginResponse}</p>

                <p>New to amazona</p>
                <button type="submit" className= {`btn btn-primary w-100 ${SignInStyle.signUpButton}`} onClick={(e) => userRegistrationHandler(e)}>Create your amazona id</button>
            
            </div>
        </div>
    )
}

export default SignInPage
