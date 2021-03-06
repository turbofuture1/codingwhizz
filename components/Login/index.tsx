import { LockClosedIcon } from '@heroicons/react/solid'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import {
  useAuthState,
} from 'react-firebase-hooks/auth'
import { MdEmail } from 'react-icons/md'
import { auth } from '../../utils/firebase'

const Login = () => {
  const router = useRouter()
  const emailRef = useRef()
  const passwordRef = useRef()
  const [user] = useAuthState(auth)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: any) => {

    e.preventDefault()

    setIsSubmitting(true)
    try {
      await signInWithEmailAndPassword(
        auth,
        //  @ts-ignore
        emailRef.current.value,
        // @ts-ignore
        passwordRef.current.value
      )
      
    
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        alert('Error: Invalid password.')
      }
      if (error.code === "auth/invalid-email") {
        alert("Error: Invalid email")
      }
      else {
        alert("Error: Invalid email and password.")
      }
    }
    setIsSubmitting(false)
  }
  return (
    <div className="flex flex-col items-center ">
      <label
        className="relative mt-10 flex items-center justify-start space-x-10 rounded-full ring-2 ring-gray-500
            focus:ring-gray-500 "
      >
        <MdEmail size={30} className="absolute  ml-8 text-gray-500" />
        <input
          type="text"
          className=" h-[50px] rounded-full bg-[#E0D7C2] pl-[40px] pr-[40px] text-sm outline-none 
             dark:bg-[#181f30] sm:h-[55px] sm:w-[200px] sm:text-lg md:w-[260px] lg:text-xl "
          //  @ts-ignore
          ref={emailRef}
          placeholder="Email"
        />
      </label>
      <label
        className="relative mt-10 flex items-center justify-start space-x-10 rounded-full ring-2 ring-gray-500
            focus:ring-gray-500 "
      >
        <LockClosedIcon className="absolute ml-8  h-8 text-gray-500" />
        <input
          type="password"
          className=" h-[50px] rounded-full bg-[#E0D7C2] pl-[40px] pr-[40px] text-sm outline-none 
             dark:bg-[#181f30] sm:h-[55px] sm:w-[200px] sm:text-lg md:w-[260px] lg:text-xl "
          //  @ts-ignore
          ref={passwordRef}
          placeholder="Password"
        />
      </label>
      <button
        disabled={isSubmitting}
        onClick={(e) => handleSubmit(e)}
        className="mt-10 rounded-2xl bg-[#1f283d]  px-8 py-4 transition duration-300 hover:scale-110"
      >
        <h2 className="text-xl">Login</h2>
      </button>
    </div>
  )
}

export default Login
