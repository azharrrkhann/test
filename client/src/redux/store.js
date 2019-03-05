import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createEncryptor from 'redux-persist-transform-encrypt'

import app from './reducers/app'
import auth from './reducers/auth'
import users from './reducers/users'

const encryptor = createEncryptor({
    secretKey: 'happy-super-secret-key',
    onError: error => {
      console.log(error, 'encryptor');
    }
})

const persistConfig = {
    key: 'root',
    storage,
    transforms: [encryptor],
}

const rootReducers = combineReducers({ auth, users, app })

const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = createStore(persistedReducer, applyMiddleware(thunk))
const persistor = persistStore(store)

export { store, persistor };