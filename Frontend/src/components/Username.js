import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate'
import { useAuthStore } from '../store/store'

import styles from '../styles/Username.module.css';




import toast from 'react-hot-toast';
import { passwordValidate } from '../helper/validate'
import useFetch from '../hooks/fetch.hook';
import { verifyPassword } from '../helper/helper';




export default function Username() {



    const navigate = useNavigate()
  const { username } = useAuthStore(state => state.auth)
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)

  const formik = useFormik({
    initialValues : {
      username : '',
      password : ''
    },
    validate : passwordValidate,usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      console.log(values);
      let loginPromise = verifyPassword({username : values.username, password : values.password })
      toast.promise(loginPromise, {
        loading: 'Checking...',
        success : <b>Login Successfully...!</b>,
        error : <b>Password Not Match!</b>
      });

      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/profile')
      })
    }
  })

  // if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  // if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>








  // const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);

  // const formik = useFormik({
  //   initialValues : {
  //     username : 'example123'
  //   },
  //   validate : usernameValidate,
  //   validateOnBlur: false,
  //   validateOnChange: false,
  //   onSubmit : async values => {
  //     setUsername(values.username);
  //     navigate('/password')
  //   }
  // })

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass} >

          <div className="title flex flex-col items-center h-1/100">
            <h4 className='text-2xl font-bold'>WELOCME TO LOGINAPP!</h4>
            <span className='py-4 text-xl w-full text-center text-gray-500'>
              Great to see you.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>

              <div className="textbox flex flex-col items-center gap-6">
                  <input  {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' />

              </div>

              <div className="textbox flex flex-col items-center gap-6">
            <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='Password' />
            <button className={styles.btn} type='submit'>Sign In</button>
        </div>

        <div className="text-center py-4">
                <span className='text-gray-500'>Not a Member <Link className='text-red-500' to="/register">Register Now</Link></span>
              </div>
              

        {/* <div className="text-center py-4">
           <button className={styles.btn} type='submit'>Let's Go</button>
        </div> */}

          </form>



          <form className='py-1' onSubmit={formik.handleSubmit}>
          <div className="text-center py-4">
                <span className='text-gray-500'>Forgot Password? <Link className='text-red-500' to="/forgot">Recover Now</Link></span>
              </div>

    </form>

        </div>
      </div>
    </div>
    
  )
}