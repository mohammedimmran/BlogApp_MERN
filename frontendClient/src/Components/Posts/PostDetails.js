// import React from 'react'
import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";

import { useDispatch, useSelector } from "react-redux";
import DateFormatter from "../../utils/DateFormatter";
import LoadingComponent from "../../utils/Loading";
import { deletePostAction, fetchSinglePostAction } from "../../redux/slices/posts/postSlices";
import Loading from "../../utils/Loading";
// import AddComment from "../Comments/AddComment";
// import CommentsList from "../Comments/CommentsList";


const PostDetails = ({match:{params:{id}}}) => {
  // console.log(id)
  const dispatch = useDispatch();
  useEffect(()=>{

    dispatch(fetchSinglePostAction(id));

  },[id , dispatch])

  const {post , loading , appErr  , serverErr , isDeleted} = useSelector(state=>state.post);
  console.log(post);

  // getlogin user
  const user = useSelector(state=>state.users);
  const {userAuth}=user;
  const user_id= userAuth?._id;
  // console.log(user_id);
  const isCreatedBy = post?.user?._id ===user_id;
  console.log(isCreatedBy);


  if(isDeleted)return <Redirect to="/posts"/>
  return (
    <>
       {loading?<Loading></Loading>: <section className="py-10 2xl:py-10 bg-white overflow-hidden">
          <div className="container px-4 mx-auto">
            {/* Post Image */}
            <img
              className="mb-24 w-full h-96 object-cover"
              src={post?.image}
              alt=""
            />
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="mt-1 mb-5 text-6xl 2xl:text-7xl text-primary font-bold font-heading">
                {post?.title}
                
              </h2>

              {/* User */}
              <div className="inline-flex pt-14 mb-14 items-center border-t border-primary">
                <img
                  className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                  src={post?.user?.profilePhoto}
                  alt=""
                />
                <div className="text-left">
                  <Link to="/post">
                    <h4 className="mb-1 text-2xl font-bold text-primary">
                      <span className="text-xl lg:text-2xl font-bold text-primary bg-clip-text bg ">
                        {post?.user?.firstName}{" "}
                        {post?.user?.lastName}{" "}
                        
                      </span>
                    </h4>
                  </Link>
                  <p className="text-gray-700">
                    {<DateFormatter date={post?.createdAt} />}
                  </p>
                  <h4 className="mb-1 text-2xl font-bold text-primary">
                      <span className="text-xl lg:text-2xl font-bold text-primary bg-clip-text bg ">
                      
                        
                      </span>
                    </h4>
                </div>
              </div>
              {/* Post description */}
              <div className="max-w-xl mx-auto">
                <p className="mb-6 text-left  text-xl text-primary">
                  {post?.description}
                 
</p>
{/* <button className="bg-primary text-white font-bold px-3 py-2 rounded">Register</button> */}
                  {/* Show delete and update  if it was created by the user */}
                  
                  {isCreatedBy?  <p class="flex">
                      <Link to={`/updatepost/${post?._id}`} class="p-3">
                        <PencilAltIcon class="h-8 mt-3 text-yellow-300" />
                      </Link>
                      <button
                        onClick={() =>
                          dispatch(deletePostAction(post?._id))
                        }
                        class="ml-3"
                      >
                        <TrashIcon class="h-8 mt-3 text-red-600" />
                      </button>
                    
                 
                 
                  
                </p>:null}
              </div>
            </div>
          </div>
          {/* Add comment Form component here */}
          {/* {userAuth ? <AddComment postId={id} /> : null} */}
          {/* <div className="flex justify-center  items-center"> */}
            {/* <CommentsList comments={post?.comments} postId={post?._id} /> */}
            {/* <CommentsList comments={postDetails?.comments} /> */}
          {/* </div> */}
        </section>}
    </>

  )
}

export default PostDetails