import React from 'react'
import PublicNavbar from './public/PublicNavbar'
import PrivateNavbar from './Private/PrivateNavbar'
import {useSelector} from 'react-redux'
import AdminNavbar from './Admin/AdminNavbar'
function Navbar() {

    const state = useSelector(state => state?.users);
    const {userAuth} = state
    console.log(userAuth)

    const isAdmin = userAuth?.isAdmin;
    console.log(isAdmin)

    
  return (
    <>
        {/* <PublicNavbar></PublicNavbar> */}
        {/* <PrivateNavbar></PrivateNavbar> */}
        {/* {!userAuth?<PublicNavbar></PublicNavbar>:userAuth?<PrivateNavbar></PrivateNavbar>:isAdmin && <AdminNavbar></AdminNavbar>} */}
        {isAdmin ? <AdminNavbar isLogin={userAuth}></AdminNavbar> :userAuth?<PrivateNavbar isLogin={userAuth}></PrivateNavbar>:<PublicNavbar></PublicNavbar>}

    </>
  )
}

export default Navbar