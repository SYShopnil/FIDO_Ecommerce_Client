import Cookies from 'js-cookie'

//set initial value
// const userData = Cookies.getJSON('loggedIn-User') || {} //check that is there have any older login user or not
// const isLoggedIn = (Cookies.getJSON('loggedIn-User')&& localStorage.getItem('auth-token'))  ? true : false //check that is there have any old logged in user or not
// const isLoading = (Cookies.getJSON('loggedIn-User') && localStorage.getItem('auth-token')) ? false : true
// const isLoggedOut =  (Cookies.getJSON('loggedIn-User') && localStorage.getItem('auth-token')) ? false : true
const setHeader = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "Application/json",
        "Authorization": (Cookies.getJSON('loggedIn-User') && localStorage.getItem('auth-token')) ? localStorage.getItem('auth-token') : ""
    }
}
const initialState = {
    isLoggedIn: false,
    isLoggedOut: false,
    userData: {},
    isLoading: true,
    header: setHeader,
    isChecked: false,
    isUpdated: false
}

const loginUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SuccessfulLogin": {
            const token = action.payload //get the token from input
            console.log(token);
            const setHeader = {
                headers: {
                    "Access-Control-Allow-Origin" : "*",
                    "Content-Type" : "Application/json",
                    "Authorization" : token
                }
            } //set the headers
            return {
                ...state,
                header: setHeader
            }
        }
        case "UnsuccessfulLogin": {
            return {
                ...state,
                isLoggedIn: false,
                isLoggedOut: false,
                userData: {},
                isLoading: true,
                header: {
                headers: {
                        "Access-Control-Allow-Origin" : "*",
                        "Content-Type" : "Application/json",
                        "Authorization" : ""
                    }
                } //set the headers  
            }
        }

        case "StoreUser": {
            return {
                ...state,
                isLoggedIn: true,
                userData: action.payload,
                isLoading: false,
                isChecked: true
            }
        }
        case "FailedStoreUser": {
            return {
                ...state,
                isLoggedIn: false,
                userData: {},
                isLoading: true,
                isChecked: true
            }
        }
        case "UpdateUser": {
            return {
                ...state,
                isUpdated: !state.isUpdated
            }
        }
        case "LoggedOut" : {
            return {
                ...state,
                isLoggedIn: false,
                header: {
                    headers: {
                        "Access-Control-Allow-Origin" : "*",
                        "Content-Type" : "Application/json",
                        "Authorization" : ""
                    }
                },//set the headers
                userData: {}
            }
        }
        default: {
            return state
        }
    }
}

export default loginUserReducer
