import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import {useNavigate,Link} from 'react-router-dom'
import Input from '../../components/inputs/Input'
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { userContext } from '../../context/userContext'

const SignUp = () => {
  const [profilePic,setProfilePic]=useState(null)
  const [password,setPassword]=useState("");
  const [fullName,setfullName]=useState("")
  const [email,setEmail] =useState("")
  const [error,setError]=useState("")

  const navigate=useNavigate()
  const {updateUser}=useContext(userContext)

  const handleSignUp =async (e)=>{
    e.preventDefault()

    let profileImageUrl=""

    if(!fullName){
      setError("Plaese set your Name")
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter correct email")
      return;
    }
    if(!password){
      setError("Please enter your password")
      return;
    }

    setError("")

    //sign up API call
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER , {
        fullName,
        email,
        password
      });

      const { token, user }=response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(user)
        navigate("/dashboard")
      }
    }
    catch(err){
      if(err.response && err.response.data.message){
        setError(err.response.data.message)
      }else{
        setError("Something went wrong .Please try again")
      }
    }
  }

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-[6px]'>
          Join us today by entering your detail below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={fullName}
              onChange={({target})=> {setfullName(target.value)}}
              label="FullName"
              placeholder="kushagra"
              type="text"
            />
          <Input value={email}
                onChange={({target}) => setEmail(target.value)}
                label =" Email Address"
                placeholder="kush@gmail.com"
                type="text"
          />

          <div className='col-span-2'>
          <Input value={password}
                onChange={({target}) => setPassword(target.value)}
                label =" Password"
                placeholder="Min 8 Characters"
                type="password"
          />
          </div>



          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
                    <button type="submit"className='btn-primary'>SIGN UP</button>
                    <p className='text-[13px] text-slate-800 mt-3'>
                      Already have an account?{" "}
                      <Link className="font-medium text-primary underline " to='/login'>
                      LOGIN
                      </Link>
                    </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp