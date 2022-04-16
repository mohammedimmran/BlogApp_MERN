
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import {Link} from 'react-router-dom'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Select from "react-select";
import { fetchAllCategoryACtion } from "../../redux/slices/category/categorySlice";
import { fetchAllPostAction, toggleAddLikesAction ,toggleAddDislikesAction} from "../../redux/slices/posts/postSlices";
import Loading from "../../utils/Loading";
// import { fetchPostsAction } from "../../redux/slices/posts/postSlices";

const PostList = () => {
    const post = useSelector((state) => state?.post);
    //   console.log(post)
    const { postList, loading, appErr, serverErr  , likes,dislikes } = post;
    const dispatch = useDispatch();
    
    // to fetch post details as soon as page is loaded
    useEffect(() => {
    dispatch(fetchAllPostAction());

  }, [dispatch , likes]);

      // to fetch category details as soon as page is loaded

  useEffect(() => {
    dispatch(fetchAllCategoryACtion());
    
  }, [dispatch]);

 
// console.log(postList)

  const category =useSelector((state) => state?.category);
  const {categoryList, loading:catloading,appErr: catappErr, serverErr:catserverErr} = category;


  return (
    <>
      <section className="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
        <div className="container">
          <div className="flex flex-wrap justify-center -mx-4">
            <div className="w-full px-4">
              <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
                <h2
                  className="
                  font-bold
                  text-3xl
                  sm:text-4xl
                  md:text-[40px]
                  text-dark
                  mb-4
                  "
                >
                  Recent Events Posted
                </h2>
                <p className="text-base text-body-color">
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form.
                </p>
              </div>
            </div>
          </div>
        
          <div className="flex flex-wrap -mx-4">
          <div className="mb-8 pb-5 lg:mb-0 w-full lg:w-1/4 px-3" >
                <div className="py-4 px-6 bg-primary shadow rounded" >
                  <h4 className="mb-4 text-white font-bold uppercase">
                    Categories
                  </h4>

                 
                  <ul>
                  <li>
                          <p
                             onClick={() =>
                              dispatch(fetchAllPostAction())
                            }
                          
                            className="block cursor-pointer py-2 px-3 mb-4 rounded text-black font-bold bg-white"
                          >
                          All posts
                          </p>
                        </li>
                    {catloading ? (
                      <Loading />
                    ) : catappErr || catserverErr ? (
                      <h1>
                        {catserverErr} {catappErr}
                      </h1>
                    ) : categoryList?.length <= 0 ? (
                      <h1 className="text-white text-lg text-center">
                        No Category Found
                      </h1>
                    ) : (
                      categoryList?.map(category => (
                        <li>
                          <p
                             onClick={() =>
                              dispatch(fetchAllPostAction(category?.title))
                            }
                          
                            className="block cursor-pointer py-2 px-3 mb-4 rounded text-black font-bold bg-white"
                          >
                            {category?.title}
                          </p>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
       
            {loading?<Loading></Loading> :appErr || serverErr ?<p>error in loading</p>:postList?.length <=0 ? <p>no posts available</p>:
            
            postList?.map((post)=>(
                <div className="w-full md:w-1/2 lg:w-1/3 px-4" key={post.id}>
              <div className="max-w-[370px] mx-auto mb-10">
                <div className="rounded overflow-hidden mb-8" >
                  <img
                    src={post.image}
                    alt={post.image}
                    className="w-full h-full object-cover rounded" 
                  />
                </div>
                <div>
                
                  <span
                    className="
                     bg-primary
                     rounded
                     inline-block
                     text-center
                     py-1
                     px-4
                     text-xs
                     leading-loose
                     font-semibold
                     text-white
                     mb-5
                     "
                  >
                    Dec 22, 2023
                  </span>
                  <h3>
                    <a
                      href="javascript:void(0)"
                      className="
                        font-semibold
                        text-xl
                        sm:text-2xl
                        lg:text-xl
                        xl:text-2xl
                        mb-4
                        inline-block
                        text-dark
                        hover:text-primary
                        "
                    >
                     {post?.title}
                    </a>
                  </h3>
                  <p className="text-base text-body-color">
                   {post?.description}
                  </p>
                 
                      

                        <div className="flex flex-row bg-primary  justify-center w-full  items-center ">
                          {/* register */}
                          <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            {/* Togle like  */}
                            <div className="flex">
                              <Link to={`/posts/${post.id}`}
                               
                                className="h-7 w-7 text-white cursor-pointer">Read More </Link>
                            </div>
                         
                          </div>
                          
                          
                       
                         
                        </div>
                        <div className="flex flex-row bg-gray-300  justify-center w-full  items-center ">
                          {/* Likes */}
                          <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            {/* Togle like  */}
                            <div className="">
                              <ThumbUpIcon onClick={()=>dispatch(toggleAddLikesAction(post?.id))}
                               
                                className="h-7 w-7 text-indigo-600 cursor-pointer"
                              />
                            </div>
                            <div className="pl-2 text-gray-600">
                               {post?.likes?.length ? post?.likes?.length:0} 
                            </div>
                          </div>
                          {/* Dislike */}
                          <div className="flex flex-row  justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            <div>
                              <ThumbDownIcon onClick={()=>dispatch(toggleAddDislikesAction(post?.id))}
                               
                                className="h-7 w-7 cursor-pointer text-gray-600"
                              />
                            </div>
                            <div className="pl-2 text-gray-600">
                               {post?.dislikes?.length ? post?.dislikes?.length:0} 
                            </div>
                          </div>
                          {/* Views */}
                          <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            <div>
                              <EyeIcon className="h-7 w-7  text-gray-400" />
                            </div>
                            <div className="pl-2 text-gray-600">
                             {post?.numViews}

                            </div>
                          </div>
                        </div>
                </div>
              </div>
            </div>
            ))}
          </div>


      
        </div>
      </section>
    </>
  );
};

export default PostList;
