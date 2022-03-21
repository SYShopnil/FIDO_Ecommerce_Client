import React, {useState, useEffect} from 'react'
import SignUpStyle from './RegistrationAdmin.module.css'
import {Link} from 'react-router-dom'
// import Success from '../../Component/Success/Success'
import Success from '../../../Component/Success/Success'
import axios from 'axios'
// import SingleFileUpload from '../../utils/SingleFileUpload'
import SingleFileUpload from '../../../utils/SingleFileUpload'
// import Verify from './Verify/Verify'
import Verify from '../../SIgnUp/Verify/Verify'
// import Error from '../../Component/Success/Error'
import Error from '../../../Component/Success/Error'
import SuccessfulRegister from '../../SIgnUp/SuccessfulRegister/SuccessfulRegister'
import AdministrationReg from '../../../Component/RegistraionAdministration/AdministrationReg'



const RegistrationAdmin = () => {
    return (
        <>
            <AdministrationReg userType = "admin" registerApi = {`admin/create`}/>
        </>
    )
}

export default RegistrationAdmin

