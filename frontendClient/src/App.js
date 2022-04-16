import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import Register from "./Components/Users/Register/Register";
import Login from "./Components/Users/Login/Login"
import Navbar from "./Components/Navigation/Navbar";
import AddNewCategory from "./Components/Categories/AddNewCategory";
import CategoryList from "./Components/Categories/CategoryList";
import UpdateCategory from "./Components/Categories/UpdateCategory";
import PrivateProtectRoute from "./Components/Navigation/ProtectedRoute/PrivateProtectRoute";
import AdminRoute from "./Components/Navigation/ProtectedRoute/AdminRoute";
import CreatePost from "./Components/Posts/CreatePost";
import PostList from "./Components/Posts/PostList";
import PostDetails from "./Components/Posts/PostDetails";
import UpdatePost from "./Components/Posts/UpdatePost";
import Profile from "./Components/Users/Profile/Profile";
import UploadProfilePhoto from "./Components/Users/Profile/UploadProfilePhoto";
import UpdateProfile from "./Components/Users/Profile/UpdateProfile";
function App() {
  return (
    <BrowserRouter>
     <Navbar/>
      <Switch>
       
        {/* <Route exact path="/" component={HomePage} /> */}
        <AdminRoute exact path="/addcategory/" component={AddNewCategory} />
        <AdminRoute exact path="/updatecategory/:id" component={UpdateCategory} />
        <AdminRoute exact path="/categoryall" component={CategoryList} />

        <PrivateProtectRoute exact path="/createpost" component={CreatePost} />
        <PrivateProtectRoute exact path="/updatepost/:id" component={UpdatePost} />
        <PrivateProtectRoute exact path="/profile/:id" component={Profile} />
        <PrivateProtectRoute exact path="/uploadprofilephoto" component={UploadProfilePhoto} />
        <PrivateProtectRoute exact path="/updateprofile/:id" component={UpdateProfile} />
        <Route exact path="/"><HomePage></HomePage></Route>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/posts" component={PostList} />
        <Route exact path="/posts/:id" component={PostDetails} />
        
      </Switch> 
    </BrowserRouter>
  );
}

export default App;
