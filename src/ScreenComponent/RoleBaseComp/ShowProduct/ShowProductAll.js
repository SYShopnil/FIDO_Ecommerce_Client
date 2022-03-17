import React, {useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProductCreate from '../../../Component/Product/Create/ProductCreate'
import ShowProduct from '../../../Component/Product/ShowProduct/ShowProduct'

const ShowProductAll = () => {
    // receiveAction from show product main component 
    const [showCreateProduct, setShowCreateProduct] = useState(false)
    const [showProductEditPage, setProductEditPage ] = useState({
        status: false,
        id: ""
    })

    const globalProductData = useSelector(state => state.ProductReducer) //get the product from global
    const {data: productData} = globalProductData

    //in this section we can get action from other child component that what we need to do
    const receiveAction = (action) => {
        const {type} = action //get the action type 
        if(type == "CreateProduct") { //it will show the product create page
            setShowCreateProduct(true)
        }else if (type == "CreateProductDone" || type == "BackToShowProductAllComp") { //back from create or edit product page
            setShowCreateProduct(false)
            setProductEditPage({...showProductEditPage, status: false})
        }else if(type == "ShowEditPage") { //it will show the edit page
            setProductEditPage({
                status: true,
                id: action.payload //get the id of edit product
            })
        }
    } 
    return (
        <div className = {`container-fluid`}>
            <div className = {`container`}>
                
                {  
                    //check that do user want to create a new product page or not
                    !showCreateProduct
                    ?
                    <>
                        {   
                            //check that do user want to see the product edit page or not
                            !showProductEditPage.status 
                            ?
                            <>
                                {/* show product comp */}
                                <ShowProduct sentAction = {receiveAction}/>
                            </>
                            :
                            <ProductCreate 
                            sentAction = {receiveAction} 
                            requestFrom = {`ShowProductAll`}
                            requestFor = {`EditProduct`}
                            editProduct = {showProductEditPage}/>
                        }
                    </>
                    :
                    <>
                        <ProductCreate 
                        sentAction = {receiveAction} 
                        requestFrom = {`ShowProductAll`} 
                        requestFor = {"CreateProduct"}
                        editProduct = {""}/>
                    </>
                }
            </div>
        </div>
    )
}

export default ShowProductAll
