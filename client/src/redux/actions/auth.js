import * as Actions from '../actionTypes';

export const verify = () => async(dispatch, getState) => {
    if(getState().auth.loggedInUser){
        try {
            let response = await fetch('http://localhost:4000/users/verify', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getState().auth.loggedInUser.token}`
                }
            })
            if (response.status === 401) dispatch(logout())
        } catch (error) {
            console.log(error, 'error')
        }
    }
}

export const handleRegistration = (credentials, callback) => async(dispatch, getState) => {
    try {
        let response = await fetch('http://localhost:4000/users/register', {
            method: 'POST',
            body: credentials,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        response = await response.json()
        return callback && callback(response)
    } catch (error) {
        console.log(error, 'error')
    }
    return callback && callback(false)
}

export const handleLogIn = (credentials, callback) => async dispatch => {
    try {
        let response = await fetch('http://localhost:4000/users/authenticate', {
            method: 'POST',
            body: credentials,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        response = await response.json()
        if(response.success){
            const user = { token: response.token, ...response.user }
            dispatch(login(user))
        }
        return callback && callback(response)
    } catch (error) {
        console.log(error, 'error')
    }
    return callback && callback(false)
}

export const handleUpdate = (credentials, callback) => async (dispatch, getState) => {
    try {
        let response = await fetch('http://localhost:4000/users/update', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getState().auth.loggedInUser.token}`
            }
        })
        response = await response.json()
        if(response.success){
            const user = { ...getState().auth.loggedInUser, ...credentials }
            dispatch(login(user))
        }
        return callback && callback(response)
    } catch (error) {
        console.log(error, 'error')
    }
    return callback && callback(false)
}

export const uploadImage = (formdata, callback) => async (dispatch, getState) => {
    try {
        let response = await fetch('/users/upload-image', {
            method: 'post',
            body: JSON.stringify(formdata),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getState().auth.loggedInUser.token}`
            },
        })
        response = await response.json()
        if(response.success){
            const user = { ...getState().auth.loggedInUser, image: `http://localhost:4000/${response.image}` }
            dispatch(login(user))   
        }
        return callback && callback(response)
    } catch (error) {
        console.log(error, 'error')
    }
    return callback && callback(false)
}

export const login = user => {
    return {
        type: Actions.LOGIN,
        payload: {
            user
        }
    }
}

export const logout = () => {
    return {
        type: Actions.LOGOUT
    }
}