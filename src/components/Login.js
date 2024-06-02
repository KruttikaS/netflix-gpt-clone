import React, { useState, useRef } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const [isSignInForm, setIsSignInForm] = useState(true);
 const[errorMessage,setErrorMessage] = useState(null);
 const name = useRef(null);
 const email = useRef(null);
 const password = useRef(null);
  const toggleSignInForm = () => {
     setIsSignInForm(!isSignInForm);
  }

  const handleButtonClick = () => {
    // Validate the Form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if(message) return;
    if(!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value
        }).then(() => {
          const {uid, email, displayName} = auth.currentUser;
          dispatch(addUser({uid:uid, email:email, displayName:displayName}))
          navigate("/browse");
        }).catch((error) => {
          setErrorMessage(error.message);
        })
        navigate("/browse");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode +"-"+errorMessage)
      });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("signin", user);
        navigate("/browse");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode +"-"+errorMessage)
      });
    }
  }
  return (
    <div>
        <Header />
        <div className='absolute'>
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/ff5587c5-1052-47cf-974b-a97e3b4f0656/065df910-dec3-46ae-afa8-7ad2b52dce40/IN-en-20240506-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                 alt="background-image"
            />
        </div>
        
        <div className='h-screen flex items-center justify-center'>
        <form onSubmit = {(e) => e.preventDefault()} className='p-12 bg-black bg-gradient-to relative w-3/12 flex flex-col gap-4 opacity-75 rounded-lg'>
        <h1 className='font-bold text-white text-3xl py-4 w-full'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
          {!isSignInForm && <input ref={name} type="text" placeholder='Full Name' className='p-2 w-full bg-gray-900 border border-white font-bold text-white rounded-lg'/>}
          <input ref={email} type="text" placeholder='Email Address' className='p-2 w-full bg-gray-900 border border-white font-bold text-white rounded-lg'/>
          <input ref={password} type="password" placeholder='Password' className='p-2 w-full bg-gray-900 border border-white font-bold text-white rounded-lg'/>
          <p className='text-red-500 font-bold text-lg'>{errorMessage}</p>
          <button className='p-2 bg-red-700 w-full text-white rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
          <p className='py-5 text-white cursor-pointer' onClick={toggleSignInForm}> {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}</p>
        </form>
        </div>
    </div>
  )
}

export default Login