import React, {useState, useEffect} from 'react'
import VerifyStyle from  './Verify.module.css'
import axios from 'axios'
import Error from '../../../Component/Success/Error'
import { useHistory } from 'react-router-dom'
import Success from '../../../Component/Success/Success'
import loaderImg from '../../../assert/loader.gif'


const Verify = ({registrationToken, verifiedFunc, message, api}) => {
    const [code, setCode] = useState({
        first: "",
        second: "",
        third: "",
        fourth: ""
    }) //take the input for get the code from user
    const userToken = registrationToken //get the token of the user which was provide during registration time
    // const [isError, setError] = useState(false)
    const [responseMessage, setResponseMessage] = useState("") //this message will come from api that says that is it a verified email user or not
    const [successfulVerified, setSuccessfulVerified] = useState(false) //this will says that is it a verified user or not 
    const [refer, setRefer] = useState(React.createRef()) //this will focus the 1st input auto
    const [isChecked, setChecked] = useState(false) 

    // const history = useHistory()
    // console.log(code);

    //to thandle the auto focus parts
    useEffect(() => {
        refer.current.focus()
    }, []) //handle the input 1st element focus

    //sent data into parent comp that says that is it a verfied user or not
    useEffect(() => {
        if(isChecked) {
            verifiedFunc(responseMessage, successfulVerified) //sent the data into sign up component where first argument is a response message and second is verified user or not
            setChecked(false)
        }
    }, [isChecked])

    // verifyHandler
    const verifyHandler = async(e) => {
       try {
            e.preventDefault()
            const {first, second, third, fourth } = code //get the input security code 
            const verifyCode =  "" + first + second + third + fourth //set the verification input code
            const sentData = {
                token : userToken,
                code: verifyCode
            }  //this data will sent to backend that return that is it a verified user or not
            const isVerifiedEmail = await axios.post(api, sentData) 
            var {status, data} = isVerifiedEmail
            // console.log(data.message);
            if(status == 201 && data) { //if the user is verified then it will executed
                setResponseMessage(data.message)
                setSuccessfulVerified(true)
                setChecked(true)
            }else {
                setResponseMessage(data.message)
                setSuccessfulVerified(false)
                // setError(true)
                setChecked(true)
            }
       }catch(err) {
            setResponseMessage(data.message)
            setSuccessfulVerified(false)
            // setError(true)
            setChecked(true)
       }
    }
    return (
        <>
            <div>
                <Success title = {message}/>   {/* this will says that in which mail we have send the verification code */}
            </div>
            <div className= {`${VerifyStyle.codeInputWrap}`}>
                <div className= {`d-flex  mb-3`}>
                    {/* input One */}
                    <input 
                        type="tel" 
                        maxlength = "1" 
                        className= {`form-control  ${VerifyStyle.codeInput}`} 
                        id="exampleFormControlInput1" 
                        placeholder=""
                        onChange={(e) => setCode({...code , first: e.target.value})}
                        ref = {refer}></input>

                        {/* input Two */}
                        <input type="tel"
                            maxlength = "1" 
                            className= {`form-control  ${VerifyStyle.codeInput} ms-3`} 
                            id="exampleFormControlInput1" 
                            placeholder=""
                            onChange={(e) => setCode({...code , second: e.target.value})}></input>

                        {/* input Three */}
                        <input type="tel" 
                        maxlength = "1" 
                        className= {`form-control  ${VerifyStyle.codeInput}  ms-3 `} 
                        id="exampleFormControlInput1" 
                        placeholder=""
                        onChange={(e) => setCode({...code , third: e.target.value})}></input>

                        {/* input Four */}
                        <input type="tel" 
                        maxlength = "1" 
                        className= {`form-control  ${VerifyStyle.codeInput}  ms-3 `} 
                        id="exampleFormControlInput1" 
                        placeholder=""
                        onChange={(e) => setCode({...code , fourth: e.target.value})}></input>
                </div>
                {/* verify button */}
                <button className = {`btn btn-primary d-block w-100 ${VerifyStyle.verifyButton}`} onClick={(e) => verifyHandler(e)}>Verify</button>
                {/* <p>{responseMessage}</p> */}
            </div>
        </>
    )
}

export default Verify
