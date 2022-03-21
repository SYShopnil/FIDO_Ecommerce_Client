import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { userUpdateAction } from '../../Global/Action/userAction'
import serverUrl from "../../utils/serverUrl"


const Random = () => {
    const loginUser = useSelector(state => state.loginUserReducer)
    const dispatch = useDispatch()
    const {userData, header} = loginUser
    const {firstName, lastName} = userData.personalInfo
    const [formData, setFormData] = useState(userData)
    // console.log(formData);

    // submitHadler
    const submitHadler = async (e) => {
        try{
            e.preventDefault() 
            const updateData = await axios.put(`${serverUrl}user/update/profile` , formData, header)
            dispatch(userUpdateAction())
            
        }catch(err) {

        }
    }
    return (
        <div>
            <div >
                <h1>Hello I am {firstName} {lastName}</h1>
            </div>

            {/* edit Section */}
            <form>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">First Name</label>
                    <input 
                    type="text" 
                    className="form-control"
                     id="exampleInputEmail1" 
                     aria-describedby="emailHelp"
                     value = {formData.personalInfo.firstName} 
                     onChange = {(e) => setFormData ({
                        ...formData,
                        personalInfo: {
                            ...formData.personalInfo,
                            firstName: e.target.value
                        }
                     })}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Last Name</label>
                    <input type="text" 
                    className="form-control" 
                    id="exampleInputPassword1"
                    value = {formData.personalInfo.lastName}
                    onChange = {(e) => setFormData ({
                        ...formData,
                        personalInfo: {
                            ...formData.personalInfo,
                            lastName: e.target.value
                        }
                    })}/>
                </div>
                <button 
                type="submit" 
                className="btn btn-primary"
                onClick = {(e) => submitHadler(e)}>Submit</button>
            </form>
        </div>
    )
}

export default Random
