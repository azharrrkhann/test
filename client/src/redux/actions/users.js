import * as Actions from '../actionTypes';
import Database from '../../utils/database';
import { login } from './auth'

let usersRef = null
let receivedFriendsRequestRef = null;
let sentFriendsRequestRef = null;
let friendsListRef = null;

export const unSubscribeUsersAllEvents = () => {
    usersRef && usersRef.off('value');
    receivedFriendsRequestRef && receivedFriendsRequestRef.off('value');
    sentFriendsRequestRef && sentFriendsRequestRef.off('value');
    friendsListRef && friendsListRef.off('value'); 
}

export const fetchUsers = () => dispatch => {
    try {
        dispatch(fetchingUsers(true))
        usersRef = Database.ref('users');
        usersRef.on('value', snapshot => {
            if(snapshot.val()){
                dispatch(setUsers(snapshot.val()));
                // dispatch(fetchUserFriendsList());
            }
        })
    } catch (error) {
        dispatch(fetchingUsers(false))
    }
}

export const fetchUserById = userId => dispatch => {
    try {
        dispatch(fetchingUserProfile(true))
        Database.ref('users/' + userId).on('value', snapshot => {
            dispatch(setUserProfile(snapshot.val()));
        })
    } catch (error) {
        dispatch(fetchingUserProfile(false))
    }
}

export const fetchUser = uid => (dispatch, getState) => {
    let { users } = getState().users;
    Database.ref('users/' + uid).once('value', snapshot => {
        users = [...users, { ...snapshot.val(), key: uid } ]
        dispatch(setUsers(users));
    })
}

export const fetchUserFriendsList = () => (dispatch, getState) => {
    let { users } = getState().users;
    let newUsers = {};
    Database.ref(`/friendsList`).once('value', snapshots => {
        Object.keys(users).map(key => {
            const friendsList = snapshots.val() ? snapshots.val()[key] : {}
            newUsers[key] = { ...users[key], friendsList }
            return key;
        })
        dispatch(setUsers(newUsers));
    })
}

export const sendFriendRequest = userId => (dispatch, getState) => { 
    try {
        const { uid: currentUserId } = getState().auth.loggedInUser
        Database.ref(`/receive_friends_request/${userId}/${currentUserId}`)
        .set(true)
        .catch(() => { })

        Database.ref(`/sent_friends_request/${currentUserId}/${userId}`)
        .set(true)
        .catch(() => { })
    } catch (error) {
        
    }
}

export const cancelFriendRequest = userId => (dispatch, getState) => {
    try {
        const { uid: currentUserId } = getState().auth.loggedInUser
        Database.ref(`/receive_friends_request/${userId}/${currentUserId}`)
        .remove(() => console.log(userId, 'cancelFriendRequest success'))
        .catch((error) => { })

        Database.ref(`/sent_friends_request/${currentUserId}/${userId}`)
        .set(null)
        .catch(error => console.log(error, 'cancelFriendRequest error'))
    } catch (error) {
        
    }
}

export const rejectFriendRequest = userId => (dispatch, getState) => {
    try {
        const { uid: currentUserId } = getState().auth.loggedInUser
        Database.ref(`/receive_friends_request/${currentUserId}/${userId}`)
        .remove(() => console.log(userId, 'rejectFriendRequest success'))
        .catch((error) => { })

        Database.ref(`/sent_friends_request/${userId}/${currentUserId}`)
        .set(null)
        .catch(error => console.log(error, 'rejectFriendRequest error'))
    } catch (error) {
        
    }
} 

export const confirmFriendRequest = userId => (dispatch, getState) => {
    try {
        const { uid: currentUserId } = getState().auth.loggedInUser
        Database.ref(`/receive_friends_request/${currentUserId}/${userId}`)
        .remove()
        .catch(() => { })

        Database.ref(`/sent_friends_request/${userId}/${currentUserId}`)
        .remove()
        .catch(() => { })

        Database.ref(`/friendsList/${currentUserId}/${userId}`)
        .set(true)
        .catch(() => { })

        Database.ref(`/friendsList/${userId}/${currentUserId}`)
        .set(true)
        .catch(() => { })
    } catch (error) {
        
    }
}

export const unfriendFriend = userId => (dispatch, getState) => {
    try {
        const { uid: currentUserId } = getState().auth.loggedInUser
        Database.ref(`/friendsList/${currentUserId}/${userId}`)
        .remove()
        .catch(() => { })

        Database.ref(`/friendsList/${userId}/${currentUserId}`)
        .remove()
        .catch(() => { })
    } catch (error) {
        
    }
}

export const fetchSentFriendRequestList = () => (dispatch, getState) => {
    try {
        const { uid: currentUserId } = getState().auth.loggedInUser
        sentFriendsRequestRef = Database.ref(`/sent_friends_request/${currentUserId}/`)
        sentFriendsRequestRef.on('value', snapshot => {
            dispatch(setSentFriendRequestList(snapshot.val() || {}));
        })
    } catch (error) {
        dispatch(setSentFriendRequestList({}));
    }
}

export const fetchReceivedFriendRequestList = () => (dispatch, getState) => { 
    try {
        const { uid: currentUserId } = getState().auth.loggedInUser
        receivedFriendsRequestRef = Database.ref(`/receive_friends_request/${currentUserId}/`);
        receivedFriendsRequestRef.on('value', snapshot => {
            dispatch(setReceivedFriendRequestList(snapshot.val() || {}));
        })
    } catch (error) {
        dispatch(setReceivedFriendRequestList({}));
    }
}

export const fetchFriendsList = () => (dispatch, getState) => {
    let { loggedInUser } = getState().auth;
    const { uid: currentUserId } = loggedInUser;
    try {
        friendsListRef = Database.ref(`/friendsList/${currentUserId}/`);
        friendsListRef.on('value', snapshot => {
            dispatch(setFriendsList(snapshot.val() || {}));
            loggedInUser = { ...loggedInUser, friendsList: snapshot.val() || {} }
            dispatch(login(loggedInUser));
        })
    } catch (error) {
        dispatch(setFriendsList({}));
        loggedInUser = { ...loggedInUser, friendsList: {} }
        dispatch(login(loggedInUser));
    }
}

export const setReceivedFriendRequestList = users => {
    return {
        type: Actions.SET_RECEIVED_FRIEND_REQUEST_LIST,
        payload: {
            users
        }
    }
}

export const setFriendsList = users => {
    return {
        type: Actions.SET_FRIEND_LIST,
        payload: {
            users
        }
    }
}

export const setSentFriendRequestList = users => {
    return {
        type: Actions.SET_SENT_FRIEND_REQUEST_LIST,
        payload: {
            users
        }
    }
}

export const fetchingUserProfile = flag => {
    return {
        type: Actions.IS_FETCHING_USER_PROFILE,
        payload: {
            flag
        }
    }
}

export const setUserProfile = userProfile => {
    return {
        type: Actions.SET_RECEIVED_USER_PROFILE,
        payload: {
            userProfile
        }
    }
}

export const fetchingUsers = flag => {
    return {
        type: Actions.IS_FETCHING_USERS,
        payload: {
            flag
        }
    }
}

export const setUsers = users => {
    return {
        type: Actions.SET_RECEIVED_USERS,
        payload: {
            users
        }
    }
}

export const setMutualFriendsList = mutualFriendList => {
    return {
        type: Actions.SET_MUTUAL_FRIEND_LIST,
        payload: {
            mutualFriendList
        }
    }
}