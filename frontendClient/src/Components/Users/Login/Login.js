import React from 'react'
import {LockClosedIcon} from '@heroicons/react/solid'
import logo from "../../../images/logo.JPG"
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Redirect} from 'react-router-dom'
import { useDispatch , useSelector} from 'react-redux';
import { loginUserAction } from '../../../redux/slices/users/usersSlices';



const formSchema = Yup.object({
    email:Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required")
});

function Login() {


    const dispatch = useDispatch(loginUserAction)

    const formik = useFormik({
        initialValues:{
            
            email:"",
            password:"",
        },
        onSubmit:(values)=>{
            dispatch(loginUserAction(values));
            console.log(values)
        },
        validationSchema:formSchema,
    })

    // console.log(form;ik)
    const store = useSelector(state => state?.users);

 
    const {userAuth , loading , appErr ,serverErr , registered} = store;
    console.log(store + registered)

    // redirect the user to login if registration is successful
    if(userAuth){
        return <Redirect to="/profile" />
    }


    // console.log(appErr)

    return (<> 
    <div className = "min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" > <div className="max-w-md w-full space-y-8">
        <div>
            <img className="mx-auto h-12 w-auto" src={logo} alt="Workflow"/>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            {/* display error message */}
            {appErr || serverErr ?  <h5 className="mt-6 text-center  font-extrabold text-red-400">{serverErr} :{appErr}</h5>:null }
           
            <p className="mt-2 text-center text-sm text-gray-600"></p>
        </div>
        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true"/>
            <div className="rounded-md shadow-sm -space-y-px">
                
                <div>
                    <label htmlFor="password" className="sr-only">
                       Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="current-password"
                       
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="email"  value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")} />
                </div>
                <div className="text-red-400 mb-2">{formik.touched.email && formik.errors.email}</div>
                <div>
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                       
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"  value={formik.values.password} onChange={formik.handleChange("password")} onBlur={formik.handleBlur("password")}/>
                </div>
                <div className="text-red-400 mb-2">{formik.touched.password && formik.errors.password}</div>
            </div>

            <div className="flex items-center justify-between">

                <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        New User ? Signup here...
                    </a>
                </div>
            </div>

            <div>
                {/* check for loading */}

                {loading ? <button
                    disabled
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LockClosedIcon
                            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                            aria-hidden="true"/>
                    </span>
                    Loading please wait...
                </button>:<button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LockClosedIcon
                            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                            aria-hidden="true"/>
                    </span>
                    Sign Up
                </button>}
            </div>
        </form>
    </div>
</div> </>
)
}

export default Login;