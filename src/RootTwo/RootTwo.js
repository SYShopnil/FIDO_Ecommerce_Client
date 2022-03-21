import React, { useEffect } from 'react'
import Navbar from '../ScreenComponent/NavBar/Navbar'
import {BrowserRouter as Router , Route, Switch, Redirect} from 'react-router-dom'
import HomePage from '../ScreenComponent/HomePage/HomePage'
import SignInPage from '../ScreenComponent/SignInPage/SignInPage'
import Cart from '../ScreenComponent/Cart/Cart'
import PageNotFound from '../ScreenComponent/PageNotFound/PageNotFound'
// import SingleProduct from '../ScreenComponent/SingleProduct/SingleProduct'
import SingleProduct from '../ScreenComponent/SingleProduct/SingleProduct'
import { useDispatch, useSelector } from 'react-redux'
import { successfulGetProduct, failedGetProduct } from '../Global/Action/productReqAction'
import productDataRaw from '../data/data'
import SignUp from '../ScreenComponent/SIgnUp/SIgnUp'
import axios from 'axios'
import { storeProfileAction, storeProfileFailed, successfulLoggedIn } from '../Global/Action/userAction'
import RegistrationAdmin from '../ScreenComponent/Admin/Registration/RegistrationAdmin'
import SellerRegistration from '../ScreenComponent/Seller/Registration/SellerRegistration'
import ShowProduct from '../ScreenComponent/Admin/ShowProduct/ShowProduct'
import ShowProductAll from '../ScreenComponent/RoleBaseComp/ShowProduct/ShowProductAll'
import store from '../Global/Store/store'
import serverUrl from  "../../src/utils/serverUrl"

const RootTwo = () => {
    const dispatch = useDispatch()
    const loginInfo = useSelector(state => state.loginUserReducer) //get the login Reducer from
    const {isLoggedIn, isChecked, header, isUpdated, userData} = loginInfo
    
    useEffect(() => {
        const getData = async () => {
            try{
                const getProduct = await axios.get(`${serverUrl}product/get/all`)
                console.log (getProduct)
                const {status, data} = getProduct //get the data 
                console.log(data);
                if(status == 202 ) {
                    dispatch(successfulGetProduct(data.product))
                }else {
                    dispatch(failedGetProduct(data.message))
                }
            }catch(error){
                dispatch(failedGetProduct(error))
            }
        }
        getData()
    }, []) //get the product data


    //check that is there have any logged in user or not
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const token = localStorage.getItem('auth-token') //get the token from local storage
                if(token) {
                    dispatch(successfulLoggedIn(token))
                    const getUpdatedState = store.getState() //get the current state
                    const {header:latestHeader} = getUpdatedState.loginUserReducer //get the login
                    const userData = await axios.get(`${serverUrl}user/profile`, latestHeader) //get the user data from local storage
                    const {data, status} = userData //get the response from api
                    console.log(token);
                    if(status == 202) {
                        dispatch(storeProfileAction(data.data))
                        
                    }else {
                        dispatch(storeProfileFailed())
                    }
                }else {
                    dispatch(storeProfileFailed())

                }
            }catch(error){
                dispatch(storeProfileFailed())
            }
        }
        checkLogin()
    },[isUpdated])
    
    return (
        <div>
                {
                    isChecked
                    ?
                    <Router>
                        <Navbar/>
                        <div className="container-fluid mt-5">
                            <Switch> 
                                <Route exact path = {`/`} component = {HomePage}></Route>
                                <Route exact path = {`/signIn`}  component = {SignInPage} ></Route>
                                <Route exact path = {`/cart/:id?`} component = {Cart}></Route>
                                <Route exact path ={`/product/:id`} component = {SingleProduct}></Route>
                                <Route exact path ={'/register'} component = {SignUp}></Route>
                                <Route exact path = {`/show/product`}> 
                                    {   
                                        //if the user is admin and seller then this route show the all product page
                                        isLoggedIn 
                                        ?
                                        <>
                                            {
                                                (userData.userType == "admin" || userData.userType == "seller")
                                                ?
                                                <>
                                                    <ShowProductAll/>
                                                </>
                                                :
                                                 <Redirect to = {`/`}/>
                                            }
                                        </>
                                        :
                                         <Redirect to = {`/`}/>
                                    }
                                </Route>
                                {/* admin registration route */}
                                <Route exact path = {`/register/admin`}>
                                   {
                                       isLoggedIn
                                       ?
                                       <>
                                            {
                                                userData.userType == "seller" || userData.userType == "customer" 
                                                ?
                                                <Redirect to = {`/`}/>
                                                :
                                                <RegistrationAdmin/>
                                            }
                                       </>
                                       :
                                       <RegistrationAdmin/> //if any type of user is not logged in then it will happen
                                       
                                   }
                                </Route>
                                
                                {/* seller registration route */}
                                <Route exact path = {`/register/seller`} component = {SellerRegistration} >
                                    {
                                       isLoggedIn
                                       ?
                                       <>
                                            {
                                                userData.userType == "customer" 
                                                ?
                                                <Redirect to = {`/`}/>
                                                :
                                                <SellerRegistration/>
                                            }
                                       </>
                                       :
                                       <SellerRegistration/> //if any type of user is not logged in then it will happen
                                       
                                   }
                                </Route>
                                
                                <Route exact path = {`/create/product/new`} component = {ShowProduct} ></Route>
                                <Route component = {PageNotFound}></Route>
                            </Switch>
                        </div>
                    </Router>
                    :
                    <>
                        <h1>Loading....</h1>
                    </>
                }
        </div>
    )
}

export default RootTwo
