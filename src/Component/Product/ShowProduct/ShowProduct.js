import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateProductInfoAction } from '../../../Global/Action/productReqAction'
import ShowProductStyle from './ShowProduct.module.css'
import axios from 'axios'
import Error from '../../../Component/Success/Error.js'
import Success from '../../../Component/Success/Success'
import serverUrl from "../../../utils/serverUrl"

const ShowProduct = ({sentAction}) => {
    const allProductData = useSelector(state => state.ProductReducer) //get all product from data
    const {isLoading, data:productData, isError} = allProductData //get the state of product from global state
    const dispatch = useDispatch()
    const [action, setAction] = useState("") //TO sent data to parent component
    const [deleteStatus, setDeleteStatus] = useState("") 
    const [IsDelete, setIsDelete] = useState(false) //TO sent data to parent component


    //if there don't have any product data into global state then it will executed
    useEffect(() => {
        if(isLoading) {
            dispatch(updateProductInfoAction())
        }
    }, [isLoading])
    sentAction(action) //sent data according to the action

    useEffect(() => {
        setIsDelete(false)
    }, [IsDelete])

    // delete a product handler
    const deleteItemHandler = async(e, _id) => {
       try {
            e.preventDefault()
            const productId = _id //get the product id
            const deleteProduct = await axios.put(`${serverUrl}product/delete/${_id}`) //request  to the api 
            const {status, data} = deleteProduct //get the response from api
            if(status == 202) {
                const apiResponse = data //store the response from api
                var {message} = data //get the response message
                setIsDelete(true) 
                setDeleteStatus({status: true, message})
                dispatch(updateProductInfoAction())
            }else {
                setIsDelete(true) 
                setDeleteStatus({status: false, message})
            }
       }catch (err) {
           setDeleteStatus(false)
            setIsDelete(true) 
            setDeleteStatus({status: false, message})
           
       }
    }
    return (
        <div>
            {   //If there don't have any  data in the global product state then it will execute otherwise it will show the product data
                isLoading 
                ?
                <h1>Loading...</h1>
                :
                <>
                    {/* control the delete product reponse message */}
                    {
                        IsDelete && 
                        <>
                            {
                                deleteStatus.status
                                ?
                                <Success title = {deleteStatus.message}/>
                                :
                                <Error  title = {deleteStatus.message}/>
                            }
                        </>
                    }
                    {/* add a new product */}
                    <div className = "row">
                        <div className = {'col-6'}></div>
                        <div className = {`col-6 d-flex justify-content-end`}>
                            <button onClick={(e) => setAction({type:"CreateProduct"})}>Create A New Product</button>
                        </div>
                    </div>

                    {/* show the table of product list */}
                    
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#ID</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Image</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Show Details</th>
                            <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productData.map(product => {
                                    const {_id} = product //get the data from individual product
                                    const {productName, productId, productImage } = product.productDetails //get the data from product details
                                    return (
                                        <tr key = {_id } >
                                            <td scope="row">{productId}</td>
                                            <td>{productName}</td>
                                            <td>
                                                <img src={productImage} alt={`${productName} image`}  className = {`img-fluid ${ShowProductStyle.ProductPicture}`}/>
                                            </td>
                                            <td>
                                                <button className = {`btn btn-success`} onClick={(e) => setAction({type:"ShowEditPage", payload: _id })}>Edit</button>
                                            </td>
                                            <td>
                                                <Link to = {`/product/${_id}`} >Show Details</Link>
                                            </td>
                                            <td>
                                                <button className = {`btn btn-success`} onClick = {(e) => deleteItemHandler(e, _id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    {

                    }
                </>
            }
        </div>
    )
}

export default ShowProduct
