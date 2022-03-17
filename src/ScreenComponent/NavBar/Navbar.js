import React, { useState } from 'react'
import SideBar from '../SideBar/SideBar';
import NavBarStyle from './NavBar.module.css'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { loggedOutAction, userUpdateAction } from '../../Global/Action/userAction';

const Navbar = () => {
    const [navBarToogle, setNavToogle] = useState(false)
    const itemCart = useSelector(state => state.addToCartReducer)
    const loginUserData = useSelector(state => state.loginUserReducer) //get the user login data form global store
    const dispatch = useDispatch()
    const history = useHistory()

    const {isLoggedIn, userData} = loginUserData //get the data from login  user reducer
    const {product} = itemCart //get the product array from item cart
    const numberOfProductInCart = product.length //get the array length
    if(isLoggedIn) {
        var {firstName, lastName} = userData.personalInfo //get the first Name and last name
        var {userType} = userData //get the user Type
    }
    const navController =  (e) => {
        e.preventDefault();
        setNavToogle(!navBarToogle)
    }
    const crossValueHandler = () => {
        setNavToogle(!navBarToogle)
    } 

    // loggOutHandler
    const loggOutHandler = (e) => {
        e.preventDefault();
        localStorage.removeItem('auth-token') //remove the token from local storage
        // dispatch(userUpdateAction())
        dispatch(loggedOutAction())
        history.push(`/`)
    }
    return (
        <>
           <div className= {`${NavBarStyle.navWrapper} fixed-top`} >
                <div className="row">
                {/* menuBar Part */}
                    <div className = "col-lg-8  col-6 menuWrap">
                        <Link href="" className = {`${NavBarStyle.handBurger}`}>
                            <i className={`fas fa-bars me-2 ms-3`} onClick={(e) => navController(e)}></i>
                        </Link>
                        <Link  to = {`/`} className={`text-lowercase  ${NavBarStyle.navTitle}`}style={{pointer: "cursor"}}>FIIDO</Link>
                    </div>

                    {/* rightSide part */}
                    <div className = "col-lg-4  col-6  d-flex justify-content-between" >
                       <div></div>
                       <div className = {`me-2 me-md-5 mt-2`} >
                           {/* cartNavButton */}
                            <Link to= {`/cart`} className={`text-capitalized me-3  ${NavBarStyle.navRightSideBarCommon} ${NavBarStyle.cartWrap}`} >
                                 <span  className = { (numberOfProductInCart == 0) ?  "" : `${NavBarStyle.cartItemNumber}`}>
                                     {
                                         (numberOfProductInCart == 0) ?  "" : numberOfProductInCart
                                     }</span>
                                      Cart
                            </Link>
                            {
                                isLoggedIn 
                                ?
                                <>
                                    {/* <!-- Example split danger button --> */}
                                    <div className= {`btn-group ${NavBarStyle.myProfileWrap}`} >
                                        <Link type="button" className= {` ${NavBarStyle.commonMyProfileButton}`} >{firstName} {lastName}</Link>
                                        <Link type="button" className= {`dropdown-toggle dropdown-toggle-split  ${NavBarStyle.commonMyProfileButton} `} data-bs-toggle="dropdown" aria-expanded="false">
                                            <span className="visually-hidden">Toggle Dropdown</span>
                                        </Link>
                                        <ul className="dropdown-menu">
                                            {
                                                (userType == 'admin'  || userType == 'seller') &&  <li>
                                                        <Link className="dropdown-item" href="#" to = {`/show/product`}>Show Product</Link>
                                                    </li>
                                            }
                                            <li><Link className="dropdown-item" href="#">Another action</Link></li>
                                            <li><Link className="dropdown-item" href="#">Something else here</Link></li>
                                            <li><hr className="dropdown-divider"/></li>
                                            <li><Link className="dropdown-item" href="#">Separated link</Link></li>
                                            {/* logged out */}
                                            <li> <Link  className={`text-capitalized dropdown-item ${NavBarStyle.navBarProfileDropDown} `} onClick={(e) => loggOutHandler(e)} >Log Out</Link></li>

                                        </ul>
                                    </div>
                                </>
                                :
                                <Link to= {`/signIn`} className={`text-capitalized ${NavBarStyle.navRightSideBarCommon} `} >Sign in</Link>
                            }
                            
                       </div>
                    </div>
                </div>   
           </div>
           <div>
               {/* sideBar */}
                <SideBar toggle = {navBarToogle} passHandler = {crossValueHandler}/>
           </div>
        </>
    )
}

export default Navbar

