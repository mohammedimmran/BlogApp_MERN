import  {createAsyncThunk , createSlice , createAction } from '@reduxjs/toolkit';
import axios from 'axios'
import { baseURL } from '../../../utils/baseURL';

// create post action
const resetPostAction = createAction("post/reset");
const resetPostEdit = createAction("post/edit");
const resetPostDelete = createAction("post/delete");

export const  createPostAction = createAsyncThunk('post/created' , async( post , {rejectWithValue , getState, dispatch })=>{

    const token =getState().users.userAuth.token; 
    // console.log(token);
    const user_id = getState().users.userAuth._id;
    // console.log(user_id);
    // console.log(post?.title)

     const config = {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    };
    try {

        const formData = new FormData();
        formData.append('title' ,post?.title);
        formData.append('category' ,post?.category);
        formData.append('description', post?.description);
        formData.append('user', user_id);
     
        formData.append('image' , post?.image);

        // console.log("category="+post?.category);
       
        const {data} = await axios.post(`${baseURL}/api/posts` , formData , config);

        dispatch(resetPostAction());
        // console.log(data)
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
        
    }

});

// fetch all posts
export const  fetchAllPostAction = createAsyncThunk('post/list' , async( category , {rejectWithValue , getState, dispatch })=>{

    try {
        const {data} = await axios.get(`${baseURL}/api/posts?category=${category}`);
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
        
    }

});


export const fetchSinglePostAction = createAsyncThunk(
    "posts/detail",
    async (id, { rejectWithValue, getState, dispatch }) => {
      try {
        const { data } = await axios.get(`${baseURL}/api/posts/${id}`);
        console.log(data)
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
  );


// like action to post 
export const toggleAddLikesAction = createAsyncThunk('post/like', async( postId , {rejectWithValue , getState, dispatch})=>{

    const token =getState().users.userAuth.token; 
    // const user_id = getState().users.userAuth._id;

     const config = {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    };
    try {

        const {data} = await axios.put(`${baseURL}/api/posts/likes` , {postId} , config);
        // dispatch(resetPostAction());
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
        
    }

})


// like action to post 
export const toggleAddDislikesAction = createAsyncThunk('post/dislike', async( postId , {rejectWithValue , getState, dispatch})=>{

    const token =getState().users.userAuth.token; 
    // const user_id = getState().users.userAuth._id;
console.log(postId)
     const config = {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    };
    try {

        const {data} = await axios.put(`${baseURL}/api/posts/dislikes` , {postId} , config);
        // dispatch(resetPostAction());
        console.log(data)
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
        
    }

})

// update
//Update
export const updatePostAction = createAsyncThunk(
    "post/updated",
    async (post, { rejectWithValue, getState, dispatch }) => {
      console.log(post);
      //get user token
      const token =getState().users.userAuth.token; 
      // console.log(token);
    //   const user_id = getState().users.userAuth._id;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        //http call
        const { data } = await axios.put(
          `${baseURL}/api/posts/${post?.id}`,
          post,
          config
        );
        //dispatch
        dispatch(resetPostEdit());
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
  );
  
//Delete
export const deletePostAction = createAsyncThunk(
    "post/delete",
    async (id, { rejectWithValue, getState, dispatch }) => {
      //get user token
      const token =getState().users.userAuth.token; 
      // console.log(token);
    //   const user_id = getState().users.userAuth._id;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        //http call
        const { data } = await axios.delete(
          `${baseURL}/api/posts/${id}`,
          config
        );
        //dispatch
        dispatch(resetPostDelete());
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  
const postSlice = createSlice({
    name:"post",
    initialState:{
        
    },
    extraReducers:(builder)=>{

        
        builder.addCase(createPostAction.pending , (state , action)=>{
            state.loading= true;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        builder.addCase(resetPostAction ,(state, action)=>{
            state.isCreated=true;
        })
        builder.addCase(createPostAction.fulfilled , (state , action)=>{
            state.loading =false;
            state.isCreated = action.payload;
            state.isCreated=false;
            state.appErr = undefined;
            state.serverErr =undefined;

        });
        builder.addCase(createPostAction.rejected , (state , action)=>{
            state.loading =false;
            state.isCreated = action?.payload;
            state.isCreated=false;
            state.appErr = action?.payload?.message;
            state.serverErr =action?.error?.message;
        });

         // fetch all post
         builder.addCase(fetchAllPostAction.pending,(state , action)=>{
            state.loading= true;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        builder.addCase(fetchAllPostAction.fulfilled , (state, action)=>{
            state.loading =false;
            state.postList = action.payload;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        builder.addCase(fetchAllPostAction.rejected , (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr =action?.error?.message;
        });

        // like post
        builder.addCase(toggleAddLikesAction.pending,(state , action)=>{
            state.loading= true;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        builder.addCase(toggleAddLikesAction.fulfilled , (state, action)=>{
            state.loading =false;
            state.likes = action.payload;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        builder.addCase(toggleAddLikesAction.rejected , (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr =action?.error?.message;
        });


        // dislike post
           builder.addCase(toggleAddDislikesAction.pending,(state , action)=>{
            state.loading= true;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        builder.addCase(toggleAddDislikesAction.fulfilled , (state, action)=>{
            state.loading =false;
            state.dislikes = action.payload;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        builder.addCase(toggleAddDislikesAction.rejected , (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr =action?.error?.message;
        });

         // fetch single post
         builder.addCase(fetchSinglePostAction.pending,(state , action)=>{
            state.loading= true;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        builder.addCase(fetchSinglePostAction.fulfilled , (state, action)=>{
            state.loading =false;
            state.post = action.payload;
            state.appErr = undefined;
            state.serverErr =undefined;
        });

        builder.addCase(fetchSinglePostAction.rejected , (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr =action?.error?.message;
        });
          //Update post
    builder.addCase(updatePostAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(resetPostEdit, (state, action) => {
        state.isUpdated = true;
      });
      builder.addCase(updatePostAction.fulfilled, (state, action) => {
        state.postUpdated = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
        state.isUpdated = false;
      });
      builder.addCase(updatePostAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });

       //Delete post
      builder.addCase(deletePostAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(resetPostDelete, (state, action) => {
        state.isDeleted = true;
      });
      builder.addCase(deletePostAction.fulfilled, (state, action) => {
        state.postUpdated = action?.payload;
        state.isDeleted = false;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(deletePostAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });

    }
})

export default postSlice.reducer;