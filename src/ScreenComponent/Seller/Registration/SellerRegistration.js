import React from 'react'
import AdministrationReg from '../../../Component/RegistraionAdministration/AdministrationReg'

const SellerRegistration = () => {
    return (
        <div>
            <AdministrationReg userType = {`seller`} registerApi = {`seller/create`}/>
        </div>
    )
}

export default SellerRegistration
