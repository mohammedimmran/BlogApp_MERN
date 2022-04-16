import  {createAction, createAsyncThunk , createSlice} from '@reduxjs/toolkit';
import axios from 'axios'
import { baseURL } from '../../../utils/baseURL';
// import baseURL from '../../../utils/baseURL'
// baseURL

const resetUpdateProfilePhotoAction = createAction('users/updatephoto')
const resetUserAction = createAction("user/profile/reset");

export const registerUserAction  = createAsyncThunk('users/register' ,async(user , {rejectWithValue , getState, dispatch })=>{

     // http call
     const config = {
        headers:{
            'Content-type': 'application/json',

        },
    };
    try {
       
        const {data} = await axios.post(`${baseURL}/api/users/register` , user , config);

        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
        
    }
    
});
// login

export const loginUserAction = createAsyncThunk('users/login', async(usersData , {rejectWithValue , getState, dispatch})=>{

    // http call
    const config = {
        headers:{
            'Content-type': 'application/json',

        },
    };
    try {
        
        const {data} = await axios.post(`${baseURL}/api/users/login`, usersData , config);
        // save user to local storage

        // console.log({data})
        localStorage.setItem('userInfo' , JSON.stringify(data));
        // const localData = localStorage.getItem('userInfo')
        // console.log(localData)
        return data;  

    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }

})


// logout

export const logoutAction =  createAsyncThunk('users/logout' , async(payload , {rejectWithValue , getState, dispatch})=>{

    try {
        // console.log("hi")
        localStorage.removeItem('userInfo');
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }

})
// get user from local storage and place into store
const userLoginFromStorage = localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo")): null;
// console.log(userLoginFromStorage)



export const userProfileAction  = createAsyncThunk('user/profile' ,async( id , {rejectWithValue , getState, dispatch })=>{

   
   const token =getState().users.userAuth.token; 
    const config = {
       headers:{
           Authorization: `Bearer ${token}`,
       },
   };
   try {
      
       const {data} = await axios.get(`${baseURL}/api/users/profile/${id}` ,  config);
       return data;
   } catch (error) {
       if(!error?.response){
           throw error;
       }
       return rejectWithValue(error?.response?.data);
       
   }
   
});
// update profilephoto
export const  updateProfilePhotoAction = createAsyncThunk('users/profilephoto' , async(userImg , {rejectWithValue , getState, dispatch})=>{
    const token =getState().users.userAuth.token; 
    const config = {
       headers:{
           Authorization: `Bearer ${token}`,
       },
   };

   console.log("image"+userImg);
   try {
   const formData = new FormData();
   formData.append('image' , userImg?.image);

    const {data} = await axios.put(`${baseURL}/api/users/profilephoto-upload` , formData , config);

    dispatch(resetUpdateProfilePhotoAction());
    console.log(data)
    return data;
} catch (error) {
    if(!error?.response){
        throw error;
    }
    return rejectWithValue(error?.response?.data);
    
}

})

// update user profile 
//Update action
export const updateUserAction = createAsyncThunk(
    "users/update",
    async (userData, { rejectWithValue, getState, dispatch }) => {
      //get user token
      const token =getState().users.userAuth.token; 
    const config = {
       headers:{
           Authorization: `Bearer ${token}`,
       },
   };
     console.log(userData)
      try {
        const { data } = await axios.put(
          `${baseURL}/api/users`,
          {
            lastName: userData?.lastName,
            firstName: userData?.firstName,
            bio: userData?.bio,
            email: userData?.email,
          },
          config
        );
        //dispatch
        dispatch(resetUserAction());
        return data;
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );
// slices

const usersSlices = createSlice({
    name: "users",
    initialState: {
        
      userAuth: userLoginFromStorage,
    },
    extraReducers: builder=>{

        // register
        builder.addCase(registerUserAction.pending,(state , action)=>{
            state.loading= true;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        builder.addCase(registerUserAction.fulfilled , (state, action)=>{
            state.loading =false;
            state.registered = action.payload;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        builder.addCase(registerUserAction.rejected , (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr =action?.error?.message;
        });


        // login
        builder.addCase(loginUserAction.pending,(state , action)=>{
            state.loading= true;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        builder.addCase(loginUserAction.fulfilled , (state , action)=>{
            state.userAuth = action.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr =undefined;
            

        });
        builder.addCase(loginUserAction.rejected , (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr =action?.error?.message;
        });

        // logout

        builder.addCase(logoutAction.pending , (state, action)=>{
            state.loading= false;

        });
        builder.addCase(logoutAction.fulfilled , (state , action)=>{
            state.userAuth = undefined;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        builder.addCase(logoutAction.rejected , (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr =action?.error?.message;
        });

        // user profile
        builder.addCase(userProfileAction.pending,(state , action)=>{
            state.loading= true;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        builder.addCase(userProfileAction.fulfilled , (state , action)=>{
            state.profile = action.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr =undefined;
            

        });
        builder.addCase(userProfileAction.rejected , (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr =action?.error?.message;
        });

        // profilephoto update
        builder.addCase(updateProfilePhotoAction.pending,(state , action)=>{
            state.loading= true;
            state.appErr = undefined;
            state.serverErr =undefined;
        });
        builder.addCase(resetUpdateProfilePhotoAction, (state, action) => {
            state.isUpdatedPhoto = true;
          });
        builder.addCase(updateProfilePhotoAction.fulfilled , (state , action)=>{
            state.profilePhoto = action.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr =undefined;
            state.isUpdatedPhoto = false;
            

        });
        builder.addCase(updateProfilePhotoAction.rejected , (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr =action?.error?.message;
        });

         //update
    builder.addCase(updateUserAction.pending, (state, action) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(resetUserAction, (state, action) => {
        state.isUpdated = true;
      });
      builder.addCase(updateUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.userUpdated = action?.payload;
        state.isUpdated = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(updateUserAction.rejected, (state, action) => {
        //console.log(action.payload);
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
    },
});

export default usersSlices.reducer