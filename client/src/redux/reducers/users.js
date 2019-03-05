import * as Action from '../actionTypes'

const initialState = {
  users: [],
  isFetchingUsers: false,
  isFetchingUserProfile: false,
  userProfile: null,
  sentFriendRequestList: [],
  receivedFriendRequestList: [],
  friendsList: [],
  mutualFriendList: [],
}

class UsersReducer {
  static reduce(state = initialState, action) {
    if (UsersReducer[action.type]) {
      return UsersReducer[action.type](state, action)
    } else {
      return state
    }
  }

  static [Action.SET_FRIEND_LIST](state, action){
    return {
      ...state,
      friendsList: action.payload.users
    }
  }

  static [Action.SET_RECEIVED_FRIEND_REQUEST_LIST](state, action){
    return {
      ...state,
      receivedFriendRequestList: action.payload.users
    }
  }

  static [Action.SET_SENT_FRIEND_REQUEST_LIST](state, action){
    return {
      ...state,
      sentFriendRequestList: action.payload.users
    }
  }

  static [Action.IS_FETCHING_USER_PROFILE](state, action){
    return {
      ...state,
      isFetchingUserProfile: action.payload.flag
    }
  }

  static [Action.SET_RECEIVED_USER_PROFILE](state, action){
    return {
      ...state,
      userProfile: action.payload.userProfile,
      isFetchingUserProfile: false,
    }
  }

  static [Action.IS_FETCHING_USERS](state, action){
    return {
      ...state,
      isFetchingUsers: action.payload.flag
    }
  }

  static [Action.SET_RECEIVED_USERS](state, action){
    return {
      ...state,
      users: action.payload.users,
      isFetchingUsers: false
    }
  }

  static [Action.SET_MUTUAL_FRIEND_LIST](state, action){
    return {
      ...state,
      mutualFriendList: action.payload.mutualFriendList,
    }
  }

  static [Action.LOGOUT](state, action) {
    return initialState;
  }
}

export default UsersReducer.reduce