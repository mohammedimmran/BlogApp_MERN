import {configureStore} from '@reduxjs/toolkit'
import categoryReducer from '../slices/category/categorySlice';
import userReducer from '../slices/users/usersSlices'
import postReducer from '../slices/posts/postSlices'
const store = configureStore({
    reducer:{
        users:userReducer,
        category:categoryReducer,
        post:postReducer,
    },
})

export default store;