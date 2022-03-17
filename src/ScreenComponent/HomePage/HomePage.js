import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { failedGetProduct, successfulGetProduct } from '../../Global/Action/productReqAction'
// import productDataRaw from '../../data/data.js'
import {Link, NavLink} from 'react-router-dom'
import HomepageStyle from './Homepage.module.css'
import Random from '../Random/Random'
// import productDataRaw from '../../data/data.js'
import axios from 'axios'

   

const HomePage = () => {
    const allProduct =  useSelector(state => (state.ProductReducer))
    const {isLoading, isError, data} = allProduct
    const dispatch = useDispatch()
    console.log(`I am rendered`);
    // //get the product during loading 
    // useEffect(() => {
    //     const getData = async () => {
    //         try{
    //             const getProduct = await axios.get(`http://localhost:3030/product/get/all`)
    //             const {status, data} = getProduct //get the data 
    //             console.log(data);
    //             if(status == 202 ) {
    //                 dispatch(successfulGetProduct(data.product))
    //             }else {
    //                 dispatch(failedGetProduct(data.message))
    //             }
    //         }catch(error){
    //             dispatch(failedGetProduct(error))
    //         }
    //     }
    //     getData()
    // }, []) //get the product data

    return (
       <div className="container">
            <div className = "row mt-3">
                {
                    !!isLoading
                    ?
                    <h1>Loading...</h1>
                    :
                    <>
                        {
                            data.length != 0 
                            ?
                            <>
                                {
                                    !isError
                                    ?
                                    <div className = "col-12">
                                        <div className = "row gy-3">
                                                {
                                                    data.map(productData => {
                                                        const {_id, 
                                                            productDetails,
                                                            companyDetails} = productData //distract data from original one
                                                        
                                                        const {price, 
                                                            stockInfo, 
                                                            othersDetails, 
                                                            productImage,
                                                            productName,
                                                            description,
                                                            productId} = productDetails //get the details part data
                                                        
                                                        const {
                                                            brand,
                                                            contact
                                                        } = companyDetails //get the company details
                                                        return(
                                                            <div className="col-12 col-md-6 col-lg-4" key = {_id}>
                                                            <div className= {`card ${HomepageStyle.card}`}>
                                                                {/* prodct Image */}
                                                                    <Link to = {`/product/${_id}`}>
                                                                        <img src= {`${productImage}`} className="card-img-top  " alt="" />
                                                                    </Link>
                                                                    <div className="card-body">
                                                                        {/* product Title */}
                                                                        <div>
                                                                            <Link className="card-title" to = {`/product/${_id}`}>{productName}</Link>
                                                                        </div>

                                                                        {/* brand */}
                                                                        <div>
                                                                            <p>{brand}</p>
                                                                        </div>

                                                                        {/* description */}
                                                                        <div>
                                                                            <p>{description}</p>
                                                                        </div>

                                                                        {/* price */}
                                                                        <div>
                                                                            <h5>{price.currentPrice} $</h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                        </div>
                                        {/* <Random/> */}
                                    </div>
                                    :
                                    <h1>There have a error</h1>
                                }
                            </>
                            :
                            <h1>No product found</h1>
                        }
                    </>
                }
            </div>
       </div>
    )
}

export default HomePage
