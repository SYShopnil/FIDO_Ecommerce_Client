const successfulLoggedIn = (token) => {
    return {
        type: "SuccessfulLogin",
        payload: token
    }
}

const unsuccessfulLoggedIn = () => {
    return {
        type: "UnsuccessfulLogin"
    }
}

const storeProfileAction = (userData) => { //it will store the logged in user data
    return {
        type: "StoreUser",
        payload: userData
    }
}

const storeProfileFailed = () => {
    return {
        type: "FailedStoreUser"
    }
}

const userUpdateAction = () => {
    return {
        type: "UpdateUser"
    }
}

const loggedOutAction = () => {
    return {
        type: "LoggedOut"
    }
}
export {
    successfulLoggedIn,
    unsuccessfulLoggedIn,
    storeProfileAction,
    storeProfileFailed,
    userUpdateAction,
    loggedOutAction
}