import React, {useState, useEffect} from 'react'
import SignUpStyle from './SignUpStyle.module.css'
import {Link} from 'react-router-dom'
import Success from '../../Component/Success/Success'
import axios from 'axios'
import SingleFileUpload from '../../utils/SingleFileUpload'
import Verify from './Verify/Verify'
import Error from '../../Component/Success/Error'
import SuccessfulRegister from './SuccessfulRegister/SuccessfulRegister'
import serverUrl from "../../utils/serverUrl"


const SignUp = () => {
    const [formData, setFormData] = useState(
        {
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            sex: "",
            email: "",
            password: "",
            confirmPassword: "",
            permanentAddress: "",
            currentAddress: "",
            contactNumber: "",
            profileImage: {
                base64: "",
                size: ""
            }
        }
    ) //registration input data
    const [successfulSubmit, setSuccessfulSubmit] = useState(false)
    const [isError, setIsError] = useState(false)
    const [responseMessage, setResponseMessage] = useState('') //what response given in the time of submit registration form 
    const [regConfirmToken, setRegConfirmToken] =  useState('') //for store the registration time token to verify the user email
    const [isVerified, setIsVerified] = useState(false) //verify the registered user
    const [isChecked, setIsChecked] = useState(false)
    const [registerButtonLoading, setRegisterButtonLoading] = useState(false) //set the value of register button click time loading 
    // console.log({successfulSubmit, isError });
    // submitHandler
    const submitHandler = async(e) => {
        e.preventDefault()
        setRegisterButtonLoading(true)
    }

    // imageDataHandler
    const imageDataHandler = (file) => {
            // console.log(file);
            const imageFile = file //store the file here
            const {size} = file
            if(imageFile) {
                const reader = new FileReader()
                reader.onloadend = () => {
                    setFormData({
                        ...formData,
                        profileImage: {
                            base64: reader.result, //set the base 64 data
                            size
                        }
                    }) //set the form data state
                }
                reader.readAsDataURL(imageFile)
        }
    }

    // verifyHandler what we will get from verify component after input the code
    const verifyHandler = (message, isVerified) => {
        // console.log({message, isVerified});
        if(isVerified) {
            setIsVerified(true) //if user email is verified it will happen
            setIsChecked(true)
        }else {
            setIsVerified(false) //if user email is verified it will happen
            setResponseMessage(message)
            setIsChecked(true)
        }
    }

    //do the register submission part
    useEffect(() => {
        const registerSubmission = async () => {
            try{
                if(registerButtonLoading) {
                    const {firstName,
                        lastName, 
                        dateOfBirth,
                        sex, 
                        email, 
                        confirmPassword,
                        password,
                        permanentAddress,
                        currentAddress,
                        contactNumber,
                        profileImage} = formData //get the data from state 

                    const sentData = {
                        password,
                        retypePassword: confirmPassword,
                        personalInfo: {
                            firstName,
                            lastName,
                            email,
                            dateOfBirth,
                            sex,
                            contact: {
                                permanentAddress,
                                currentAddress,
                                contactNumber
                            }
                        },
                        profileImage 
                    } //set the format to sent the data into database

                    // console.log(data);
                    const register = await axios.post(`${serverUrl}customer/create`, sentData)
                    const {status, data} = register
                    var {token, message} = data
                    if(status == 201 && data) {  //if the status is affirmative then it will execute  
                        setRegConfirmToken(token)
                        setIsError(false)
                        setSuccessfulSubmit(true)
                        setResponseMessage(`${message}`)
                        setRegisterButtonLoading(false)
                    }else {
                        setSuccessfulSubmit(false)
                        setIsError(true)
                        setResponseMessage(`${message}`)
                        setRegisterButtonLoading(false)
                    }
                }else {
                    return 0
                }
                
            }catch(err) {
                setSuccessfulSubmit(false)
                setIsError(true)
                setResponseMessage(`Something is going wrong please try again`)
                setRegisterButtonLoading(false)
            }
        }
        registerSubmission()
    }, [registerButtonLoading])
    return (
        <>
            {   
                // if the submit is successful and there don't have any error then it will executed. user email verification part
                !!successfulSubmit  && !isError
                ?
                <>
                    <div className="row">
                       {
                        //    if the input verification and provided verification code is checked that is it match or not then it will execute
                           isChecked 
                           &&
                           <>
                                {
                                    //if two verification have matched then it will execute
                                    !!isVerified 
                                    ?
                                    <>
                                        {/* if the user is verified  after registration than it will executed */}
                                        <div className="col-4 col-md-2">  
                                            <Link to = '/signIn' className="btn btn-primary">
                                                Go to SignIn
                                            </Link>
                                        </div>
                                        <div className = "col-1 col-md-4"></div>

                                        {/* successfull Message */}
                                        <div className = "col-7 col-md-6">
                                            <Success title = {`Registration successfully done`}/>
                                        </div>
                                        
                                    </>
                                    :
                                    <>
                                        {/* // if the user is  not verified  after registration than it will executed */}
                                        <div className="col-4 col-md-2">  
                                            <Link to = '/signIn' className="btn btn-primary">
                                                Go to SignIn
                                            </Link>
                                        </div>
                                        <div className = "col-1 col-md-4"></div>

                                        {/* error message during email verification*/}
                                        <div className = "col-7 col-md-6">
                                            <Error title = {`${responseMessage}`}/>
                                        </div>
                                        
                                    </>
                               }
                           </>
                       }

                       {/* if the user is not verified yet then it will run */}
                        <div className = {`col-12`}>
                            {
                                !!isVerified && !!isChecked
                                ?
                                <div className = {`mt-5`}>
                                <SuccessfulRegister message = {'Go to Sign In page for login'}/>
                                 
                                </div>
                                :
                                <>
                                <Verify 
                                registrationToken = {regConfirmToken} 
                                verifiedFunc = {verifyHandler} 
                                message = {responseMessage}
                                api = {`http://localhost:3030/customer/verified/create`}/>
                                 </>
                            }
                        </div>
                    </div>
  
                </>
                : 

                // main signUp form it will show until the submit is successfully done
                <div className = {`${SignUpStyle.mainContentWrap}  `}>
                    {/* form Wrapper */} 
                    <div className = {`${SignUpStyle.subContentWrap}`}>
                        <p className = {`h4`}>Sign-In</p>
                        <form>
                            {/* firstName */}
                            <div className="mb-3">
                                <label 
                                htmlFor="firstName" className="form-label">First Name</label>
                                <input 
                                type="text" 
                                className="form-control" id="exampleInputPassword1"
                                value = {formData.firstName}
                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}/>
                            </div>

                            {/* lastName */}
                            <div className="mb-3">
                                <label 
                                htmlFor="lastName" className="form-label">LastName</label>
                                <input 
                                type="text" 
                                className="form-control" id="exampleInputPassword1"
                                value = {formData.lastName}
                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}/>
                            </div>

                            {/* dateOfBirth */}
                            <div className="mb-3">
                                <label 
                                htmlFor="dateOfBirth" className="form-label">Date of birth</label>
                                <input 
                                type="date" 
                                className="form-control" id="exampleInputPassword1"
                                value = {formData.dateOfBirth}
                                onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}/>
                            </div>  

                            {/* sex */}
                            <label htmlFor="sex">Sex</label>
                            <div className="form-check">
                                <input 
                                className="form-check-input" 
                                type="radio" 
                                name="sex" 
                                id="flexRadioDefault1"
                                value = {`male`}
                                onChange={(e) => setFormData({...formData, sex: e.target.value})}/>
                                <label 
                                className="form-check-label" for="flexRadioDefault1">
                                    Male
                                </label>
                            </div>
                            <div className="form-check">
                                <input 
                                className="form-check-input" 
                                type="radio" 
                                name="sex" 
                                id="flexRadioDefault2"
                                value = {`female`}
                                onChange={(e) => setFormData({...formData, sex: e.target.value})}/>
                                <label className="form-check-label" for="flexRadioDefault2">
                                    Female
                                </label>
                            </div>
                            
                            {/* profileImage */}
                            <SingleFileUpload fileLable = {`Profile Image`} imageFileHandler = {imageDataHandler}/>

                            {/* email */}
                            <div className="mb-3">
                                <label 
                                htmlFor="email" className="form-label">Email</label>
                                <input 
                                type="email" 
                                className="form-control" id="exampleInputPassword1"
                                value = {formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                            </div>

                            {/* password */}
                            <div className="mb-3">
                                <label 
                                htmlFor="password" className="form-label">Password</label>
                                <input 
                                type="password" 
                                className="form-control" id="exampleInputPassword1"
                                value = {formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                            </div>

                            {/* retypePassword */}
                             <div className="mb-3">
                                <label 
                                htmlFor="password" className="form-label">Confirm Password</label>
                                <input 
                                type="password" 
                                className="form-control" id="exampleInputPassword1"
                                value = {formData.confirmPassword}
                                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}/>
                            </div>

                            {/* permanentAddress */}
                            <div className="mb-3">
                                <label 
                                htmlFor="permanentAddress" className="form-label">Permanent Address</label>
                                <input 
                                type="text" 
                                className="form-control" id="exampleInputPassword1"
                                value = {formData.permanentAddress}
                                onChange={(e) => setFormData({...formData, permanentAddress: e.target.value})}/>
                            </div>

                            {/* currentAddress */}
                            <div className="mb-3">
                                <label 
                                htmlFor="currentAddress" className="form-label">Current Address</label>
                                <input 
                                type="text" 
                                className="form-control" id="exampleInputPassword1"
                                value = {formData.currentAddress}
                                onChange={(e) => setFormData({...formData, currentAddress: e.target.value})}/>
                            </div>

                            {/* contactNumber */}
                            <div className="mb-3">
                                <label 
                                htmlFor="contactNumber" className="form-label">Contact Number</label>
                                <input 
                                type="text" 
                                className="form-control" id="exampleInputPassword1"
                                value = {formData.contactNumber}
                                onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}/>
                            </div>
                            
                            {
                                registerButtonLoading
                                ?
                                 <button className= {`btn btn-primary w-100 ${SignUpStyle.loginButton}`} onClick = {(e) => submitHandler(e)} >
                                    <div className= {`${SignUpStyle.bye}`}>
                                        <div className= {`${SignUpStyle.hello}`} >
                                            <div></div>
                                        </div>
                                    </div>
                                </button>
                                :
                                <button 
                                type="submit" 
                                className= {`btn btn-primary w-100 ${SignUpStyle.loginButton}`} onClick = {(e) => submitHandler(e)}>Register</button>
                               
                            }
                        </form>

                        <p>Already have an account?</p>
                        
                        <Link to = {`/signIn`}>
                            <button 
                            type="submit" 
                            className= {`btn btn-primary w-100 ${SignUpStyle.signUpButton}`}  >Sign In</button>
                        </Link>

                        {
                            isError 
                            ?
                            <>
                                <p>{responseMessage}</p>
                            </>
                            :
                            <>
                                <p>{responseMessage}</p>
                            </>
                        }

                    </div>
                </div>
            }

        </>
    )
}

export default SignUp

