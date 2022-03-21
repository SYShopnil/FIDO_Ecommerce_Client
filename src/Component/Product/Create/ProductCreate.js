import React, {useState, useEffect} from 'react'
import SingleFileUpload from '../../../utils/SingleFileUpload'
import Color from '../Color/Color'
import ProductCategory from '../ProductCatagory/ProductCatagory'
import Tags from '../Tags/Tags'
import ProductCreateStyle from './ProductCreate.module.css'
import ButtonLoader from '../../../Component/ButtonLoader/ButtonLoader'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch } from 'react-redux'
import { successfulGetProduct, updateProductInfoAction } from '../../../Global/Action/productReqAction'
import HomePage from '../../../ScreenComponent/HomePage/HomePage'
import serverUrl from "../../../utils/serverUrl"

const ProductCreate = ({sentAction, requestFrom, requestFor, editProduct}) => {
    // console.log(editProduct.id);
    const categoryList = ["Pant", "Shirt", "Sleeveless"]
    const [brand, setBrand] = useState(["Rich Man", "Lubman", "Stop & Wear"])
    const [isChecked, setIsChecked] = useState(false)
    
    const [formData, setFormData] = useState({
        productName: "",
        description: "",
        price: "",
        freeShipping: false,
        brand: "",
        companyEmail: "",
        companyAddress : "",
        productPicture: {
            base64: "",
            size: ""
        }
    })

    const [tags, setTags] = useState([])
    const [stock, setStock ] = useState([])
    const [category, setCategory] = useState([])
    const [isSubmit , setIsSubmit] = useState(false)
    const [responseMessage, setResponseMessage ] = useState("")
    const [showDashBoard , setShowDashBoard] = useState(false)
    const history = useHistory()
    const loginUserData = useSelector(state => state.loginUserReducer) //get the login user data
    const dispatch = useDispatch()
    const [showCreateButton, setShowCreateButton] = useState(true)
    const [existingProduct, setExistingProduct] = useState ({})

    const {header} = loginUserData //get the header 

    // get the tags data
    const getTagsData = (data) => {
        setTags(data)
    }
    // console.log(stock);
    // product categoryDataHandler
    const categoryDataHandler = (data) => {
        const inputCategory = data //store the input category data
        // setFormData({...formData, category: inputCategory}) //store the new category data
        setCategory(inputCategory)
    }
    // console.log(formData);
    // stockDataHandler
    const stockDataHandler = (data) => {
        const stockData = data //store the stock data here
        // console.log(stockData);
        // setFormData({...formData, stock: stockData}) //store the new category data
        setStock(stockData)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setIsSubmit(true)
    }

    //get the product image data
    const productImageDataHandler = (data) => {
        const productPictureData = data //get the product picture data
        if(productPictureData) {
            const {size:imageSize} = productPictureData
            const reader = new FileReader() 
            reader.onloadend = () => {
                const base64 = reader.result //get the base 64 data
                const size = imageSize
                setFormData({
                    ...formData,
                    productPicture: {
                        base64,
                        size
                    }
                })
                
            }
            reader.readAsDataURL(productPictureData) //convert it to base 64 format
        }
    }

    // product updateHandler
    const updateHandler = (e) => {
        e.preventDefault();
        setIsSubmit(true)
    }

    //check that from where the request came  to controlled the updating phase and creation phase of product 
    useEffect(() => {
        if(requestFrom == "ShowProductAll" && requestFor == "EditProduct") {
            // console.log(editProduct.id);
            const getData = async () => {
                try {
                    const {id} = editProduct //get the edit product id
                    const getEditProduct = await axios.get(`${serverUrl}product/get/product/${id}`) //sent the request to get the data What we want to edit
                    const {data, status} = getEditProduct;
                    if(status == 202) {
                        const {product} = data //get the expected product
                        setExistingProduct(product)
                        const {productName,
                                description,
                                price,
                                productImage} = product.productDetails //get the product details data from database
                        const {currentPrice} = price  //get the current price of the data from database
                        const {freeShipping,
                                category,
                                tags,
                                color} = product.productDetails.othersDetails //get the others details data from database
                        //  console.log(`hello`);
                        const {brand, contact} = product.companyDetails //get the brand and contact info from database
                        const {email, address} = contact //get the contact info from database
                        
                        //set the data of form for edit it
                        setFormData({
                            ...formData,
                            productName,
                            description,
                            price: currentPrice,
                            freeShipping,
                            brand,
                            companyEmail: email,
                            companyAddress : address,
                            productPicture: productImage
                        }) //set the form data if it is a edit section
                        setTags(tags)
                        setCategory(category)
                        console.log(category);
                        setStock(color)
                        setIsChecked(true)
                        setShowCreateButton(false)
                    }else {
                        setResponseMessage(data.message)
                        setIsChecked(true)
                    }
                }catch(err) {
                    setResponseMessage(`Product find Failed`)
                    setIsChecked(true)
                }
                
            }
             getData()
             
        }else {
            setIsChecked(true)
        }
    }, [])

    //create a new product  and update a individual product
    useEffect(() => {
        const saveProduct = async () => {
           try{
                if(isSubmit) {
                    const {
                        productName,
                        description,
                        price,
                        freeShipping,
                        brand,
                        companyEmail,
                        companyAddress,
                        productPicture
                    } = formData //get the data from form data state

                    const productTags = tags //get the tags data
                    const stockInfo = stock //get the stock info
                    const categoryInfo = category //get the category 

                    //create the sent data formate
                    const sendData = {
                        productDetails: {
                            productName,
                            description,
                            price: {
                                currentPrice: price
                            },
                            othersDetails: {
                                freeShipping,
                                category: categoryInfo,
                                tags: productTags,
                                color: stockInfo
                            }
                        },
                        companyDetails: {
                            brand,
                            contact: {
                                email: companyEmail,
                                address: companyAddress
                            }
                        },
                        productImage: productPicture
                        // productImage: null
                    }
                    if(showCreateButton) { //if user want to create a new product then it will execute
                        const createNewProduct = await axios.post(`${serverUrl}product/create`, sendData, header) 
                        const {status, data:responseData} = createNewProduct //get the response 
                        if(status == 201) {

                            const productResponse = responseData //get the data from api
                            
                            const {message, data} = productResponse
                            setResponseMessage(message) //set the successfull message
                            console.log(`Hello I am from line 143`);
                            // dispatch(successfulGetProduct([]))
                            dispatch(updateProductInfoAction())
                            // console.log();
                            console.log(`Hello I am from line 45`);
                            setShowDashBoard(true)
                            setIsSubmit(false)
                            
                        }else {
                            const productResponse = responseData //get the data from api
                            const {message} = productResponse
                            setResponseMessage(message)  //set the unSuccssful meessage
                            setIsSubmit(false)
                        }
                    }else {
                        const id = editProduct.id //get the update product id 
                        const {productId, stockInfo, othersDetails, rattingInfo, productImage} = existingProduct.productDetails
                        const {isDeleted} = othersDetails
                        const {previousPrice} = existingProduct.productDetails.price //get the previous price
                        console.log(isDeleted);
                        const currentPrice = price
                        const sentData = {
                                ...existingProduct,
                                productDetails: {
                                productId,
                                productName,
                                description,
                                price: {
                                    currentPrice: +currentPrice,
                                    previousPrice
                                },
                                stockInfo,
                                othersDetails: {
                                    freeShipping,
                                    category: categoryInfo,
                                    tags: productTags,
                                    color: stock,
                                    isDeleted
                                },
                                rattingInfo,
                                productImage: productPicture
                            },
                            companyDetails: {
                                brand,
                                contact: {
                                    email: companyEmail,
                                    address: companyAddress
                                }
                            }
                        }
                        console.log(sentData);
                        const updateProduct = await axios.put(`${serverUrl}product/update/${id}`, sentData )
                        const {status,data:responseData} = updateProduct //get the response from api
                        if(status == 202) {
                            const apiResponse = responseData //store the response of the data
                            const {message} = responseData //get the response message
                            setResponseMessage(message) 
                            dispatch(updateProductInfoAction())
                            setShowDashBoard(true)
                            setIsSubmit(false)
                        }else {
                            const productResponse = responseData //get the data from api
                            const {message} = productResponse
                            setResponseMessage(message)  //set the unSuccssful meessage
                            setIsSubmit(false)
                        }
                    }
                    
                }
           }catch(err) {
                // console.log(err);
                setResponseMessage("Some things going wrong")
                setIsSubmit(false)
           }
        }
        saveProduct()
    }, [isSubmit])

    //sent to previous page
    useEffect(() => {
        if(showDashBoard) {
            setTimeout(() => {
                if(requestFrom == "ShowProductAll") {
                    sentAction({
                        type: "CreateProductDone"
                    })
                }else {
                    history.push('/')
                }
            }, 1000)
        }
    }, [showDashBoard])
    

    return (
        // signInPage Wrapper
       <>
           {
               isChecked
               ?
               <>
                    {/* back button to go back to show product all role base component */}
                    {
                        requestFrom == "ShowProductAll"
                        &&
                        <div>
                            <button className= {`btn btn-primary ${ProductCreateStyle.backButton}`} onClick={(e) => sentAction({type: "BackToShowProductAllComp"})}>Back</button>
                        </div>
                    }
                    <div className = {`${ProductCreateStyle.mainContentWrap}`}>
                        {/* form Wrapper */} 
                        <div className = {`${ProductCreateStyle.subContentWrap}`}>
                            <p className = {`h4`}>Create Product</p>
                            <form>
                                {/* product Name */}
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Product Name</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="exampleInputEmail1" 
                                    aria-describedby="emailHelp"
                                    value = {formData.productName}
                                    onChange={(e) => setFormData({...formData, productName: e.target.value})}/>
                                </div>

                                {/* discription */}
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Product Details</label>
                                    <div className="">
                                        <textarea 
                                        className="form-control" 
                                        placeholder="Decription" 
                                        id="floatingTextarea2" 
                                        style= {{height: "150px"}}
                                        value = {formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}>
                                        </textarea>
                                    </div>
                                </div>
                                
                                {/* price */}
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Price</label>
                                    <input 
                                    type="number" 
                                    className="form-control" 
                                    id="exampleInputPassword1"
                                    value = {formData.price}
                                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                                    />
                                </div>

                                {/* numberOfStock
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Number Of Stock</label>
                                    <input 
                                    type="number" 
                                    className="form-control" 
                                    id="exampleInputPassword1"
                                    
                                    />
                                </div> */}

                                {/* colors */}
                                <div className = {`mb-3`}>
                                    <label for="exampleInputPassword1" className="form-label">Stock Information</label>
                                    <Color sentData = {stockDataHandler} currentData = {stock}/>
                                </div>

                                {/* freeShipping */}
                                <div class="form-check mb-3">
                                    <input 
                                    class="form-check-input" 
                                    type="checkbox" value="" 
                                    id="flexCheckChecked"
                                    value = {formData.freeShipping}
                                    onChange={(e) => setFormData({...formData, freeShipping: e.target.checked})} />
                                    <label class="form-check-label" for="flexCheckChecked">
                                        Free Shipping
                                    </label>
                                </div>
                                
                                {/* product Category */}
                                <div className = {`mb-3`}>
                                    <label className="form-check-label mb-2" for="flexCheckChecked">
                                        Product Category
                                    </label>
                                    <ProductCategory categoryList = {categoryList} categorySelectData = {categoryDataHandler} currentData = {category}/>
                                </div>
                                
                                {/* tags */}
                                <div className="mb-3">
                                    <Tags sentData = {getTagsData} title = {"Tags"} currentData = {tags}/>
                                </div>
                                
                                {/* color
                                <div className="mb-3">
                                    <Tags sentData = {getColorData} title = {"Color"} />
                                </div> */}

                                {/* company details */}
                                <div className = {`mb-3`}>
                                    <label className="form-check-label mb-2" for="flexCheckChecked">
                                        Company Details
                                    </label>
                                </div>
                                
                                {/* brand */}
                                <div className = {`mb-3`}>
                                    <label className="form-check-label mb-2" for="flexCheckChecked">
                                        Brand
                                    </label>

                                    <select 
                                    class="form-select" 
                                    aria-label="Default select example"
                                    value = {formData.brand}
                                    onChange={(e) => setFormData({...formData, brand: e.target.value})} >
                                        {
                                            brand.map(item => {
                                                return (
                                                    <option value = {item} >{item}</option>
                                                )
                                            })
                                        }
                                    </select>

                                </div>


                                {/* email */}
                                <div className = {`mb-3`}>
                                    <label className="form-check-label mb-2" for="flexCheckChecked">
                                        Company Email
                                    </label>
                                    <input 
                                    type="email" 
                                    className="form-control" 
                                    id="exampleInputPassword1"
                                    value = {formData.companyEmail}
                                    onChange={(e) => setFormData({...formData, companyEmail: e.target.value})} 
                                    />
                                </div>

                                {/* address */}
                                <div className = {`mb-3`}>
                                    <label className="form-check-label mb-2" for="flexCheckChecked">
                                        Company Address
                                    </label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="exampleInputPassword1"
                                    value = {formData.companyAddress}
                                    onChange={(e) => setFormData({...formData, companyAddress: e.target.value})} />
                                </div>
                                
                                {/* Image picture */}
                                {
                                    showCreateButton  //if it will a product edit phase then it will execute
                                    &&
                                     <div className = {`mb-3`}>
                                        <SingleFileUpload fileLable = {`Product Image`} imageFileHandler = {productImageDataHandler}/>
                                    </div>
                                }
                               

        
                                {
                                    isSubmit 
                                    ?
                                    <button className= {`btn btn-primary w-100 ${ProductCreateStyle.loginButton}`}  >
                                        <ButtonLoader/>
                                    </button>
                                    :
                                    <>
                                        {
                                            showCreateButton 
                                            ?
                                            <button type="submit" 
                                            className= {`btn btn-primary w-100 ${ProductCreateStyle.loginButton}`} 
                                            onClick = {(e) => submitHandler(e)}>Create New Product</button>
                                            :
                                            <button type="submit" 
                                            className= {`btn btn-primary w-100 ${ProductCreateStyle.loginButton}`} 
                                            onClick = {(e) => updateHandler(e)}>Update Product</button>
                                        }
                                    </>
                                }
                            </form>
                            <p>{responseMessage}</p>

                        </div>
                    </div>
               </>
               :
               <h1>Loading...</h1>
           }
       </>
    )
}

export default ProductCreate
