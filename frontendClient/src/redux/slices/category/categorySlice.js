import  {createAsyncThunk , createSlice , createAction} from '@reduxjs/toolkit';
import axios from 'axios'
import { baseURL } from '../../../utils/baseURL';

// action to redirect
const resetEditAction = createAction('category/reset');
const resetDeleteAction = createAction('category/deletereset');
const resetAddCategoryAction = createAction('category/add')
// import baseURL from '../../../utils/baseURL'
// baseURL
export const createCategoryACtion  = createAsyncThunk('category/create' ,async(category , {rejectWithValue , getState, dispatch })=>{

     // http call

    // get user token 
    // console.log(getState().users.userAuth.token)
    
    const token =getState().users.userAuth.token; 
    // const {users} = getState();
    // console.log("users" + users)
    // const userAuth = users.userAuth;
    // const {token} = userAuth;

    // console.log(`Bearer ${token}`)
    // console.log("userAuth"+userAuth)
     const config = {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    };
    try {
       
        const {data} = await axios.post(`${baseURL}/api/category` , {title: category?.title} , config);

        dispatch(resetAddCategoryAction());
        // console.log(data)
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
        
    }
    
});

// fetch all category

export const fetchAllCategoryACtion  = createAsyncThunk('category/fetchAll' ,async(category , {rejectWithValue , getState, dispatch })=>{

    // http call

   // get user token 
//    console.log(getState().users.userAuth.token)
   
   const token =getState().users.userAuth.token; 
   // const {users} = getState();
   // console.log("users" + users)
   // const userAuth = users.userAuth;
   // const {token} = userAuth;

   // console.log(`Bearer ${token}`)
   // console.log("userAuth"+userAuth)
    const config = {
       headers:{
           Authorization: `Bearer ${token}`,
       },
   };
   try {
      
       const {data} = await axios.get(`${baseURL}/api/category` ,  config);


    //    console.log(data)
       return data;
   } catch (error) {
       if(!error?.response){
           throw error;
       }
       return rejectWithValue(error?.response?.data);
       
   }
   
});


// update Single Category
export const updateCategoryACtion  = createAsyncThunk('category/update' ,async(category , {rejectWithValue , getState, dispatch })=>{


   
   const token =getState().users.userAuth.token; 
    const config = {
       headers:{
           Authorization: `Bearer ${token}`,
       },
   };
   try {
      
       const {data} = await axios.put(`${baseURL}/api/category/${category?.id}` ,{title:category?.title},  config);

       dispatch(resetEditAction())
       return data;
   } catch (error) {
       if(!error?.response){
           throw error;
       }
       return rejectWithValue(error?.response?.data);
       
   }
   
});

// delete category

export const deleteCategoryACtion  = createAsyncThunk('category/delete' ,async(id , {rejectWithValue , getState, dispatch })=>{


   
    const token =getState().users.userAuth.token; 
     const config = {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    };
    try {
       
        const {data} = await axios.delete(`${baseURL}/api/category/${id}` ,  config);
 
        dispatch(resetDeleteAction())
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
        
    }
    
 });

//  fetch details of category
export const fetchSingleCategoryACtion  = createAsyncThunk('category/details' ,async(id , {rejectWithValue , getState, dispatch })=>{


   
    const token =getState().users.userAuth.token; 
     const config = {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    };
    try {
       
        const {data} = await axios.get(`${baseURL}/api/category/${id}` ,  config);
 
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
        
    }
    
 });
const categorySlices = createSlice({
    name: "category",
    initialState: {},
    extraReducers: builder=>{

        // register
        builder.addCase(createCategoryACtion.pending,(state , action)=>{
            state.loading= true;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        // dispatch action to redirect

        builder.addCase(resetAddCategoryAction ,(state, action)=>{
            state.isCreated=true;
        })
        builder.addCase(createCategoryACtion.fulfilled , (state, action)=>{
            state.loading =false;
            state.category = action.payload;
            state.isCreated=false;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        builder.addCase(createCategoryACtion.rejected , (state, action)=>{
            state.loading =false;
            state.category = action.payload;
            state.isCreated=false;
            state.appErr = undefined;
            state.serverErr =undefined;
        });
        // fetch all category
        builder.addCase(fetchAllCategoryACtion.pending,(state , action)=>{
            state.loading= true;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        builder.addCase(fetchAllCategoryACtion.fulfilled , (state, action)=>{
            state.loading =false;
            state.categoryList = action.payload;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        builder.addCase(fetchAllCategoryACtion.rejected , (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr =action?.error?.message;
        });

     
        // update
        builder.addCase(updateCategoryACtion.pending,(state , action)=>{
            state.loading= true;
            state.appErr = undefined;
            state.serverErr =undefined;
        });
     // despatch action
     builder.addCase(resetEditAction , (state, action)=>{
        state.isEdited = true;
    })
      
        builder.addCase(updateCategoryACtion.fulfilled , (state, action)=>{
            state.loading =false;
            state.updatecategory = action?.payload;
            state.isEdited=false;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        builder.addCase(updateCategoryACtion.rejected , (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr =action?.error?.message;
        });

        // delete
        builder.addCase(deleteCategoryACtion.pending,(state , action)=>{
            state.loading= true;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        builder.addCase(resetDeleteAction ,(state, action)=>{
            state.isDeleted = true;
        })

        builder.addCase(deleteCategoryACtion.fulfilled , (state, action)=>{
            state.loading =false;
            state.category = action.payload;
            state.isDeleted=false;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        builder.addCase(deleteCategoryACtion.rejected , (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr =action?.error?.message;
        });

        // fetch single category
        builder.addCase(fetchSingleCategoryACtion.pending,(state , action)=>{
            state.loading= true;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        builder.addCase(fetchSingleCategoryACtion.fulfilled , (state, action)=>{
            state.loading =false;
            state.category = action?.payload;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        builder.addCase(fetchSingleCategoryACtion.rejected , (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr =action?.error?.message;
        });
    },
});

export default categorySlices.reducer;