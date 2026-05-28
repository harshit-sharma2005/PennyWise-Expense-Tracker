import React,{useContext,useState} from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import {useNavigate,Link} from 'react-router-dom'
import Input from '../../components/inputs/Input'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { userContext } from '../../context/userContext'

const Login = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] =useState("")
  const [error,setError] =useState(null)

  const {updateUser} = useContext(userContext);

  const navigate = useNavigate();

  const handleLogin=async (e)=>{
    e.preventDefault()

    if(!validateEmail(email)){
      setError("Please enter a valid email address")
      return;
    }

    if(!password){
      setError("Please enter the correct password")
      return;
    }

    setError("")

    //login api call
    try{
      const response=await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password
      })
      const {token,user} =response.data;
      console.log("after response")
      if(token){
        updateUser(user)
        localStorage.setItem("token",token)
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
    <AuthLayout >
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center bg-bg-base text-text-primary'>
        <h3 className='text-xl font-semibold text-text-primary'>Welcome Back</h3>
        <p className='text-xs text-text-secondary mt-[5px] mb-6'>Please enter your details to log in</p>

        <form onSubmit={handleLogin}>
          <Input value={email}
                onChange={({target}) => setEmail(target.value)}
                label =" Email Address"
                placeholder="kush@gmail.com"
                type="text"
          />

          <Input value={password}
                onChange={({target}) => setPassword(target.value)}
                label =" Password"
                placeholder="Min 8 Characters"
                type="password"
          />

          {error && <p className='text-danger text-xs pb-2.5'>{error}</p>}
          <button type="submit" className='btn-primary cursor-pointer'>LOGIN</button>
          <p className='text-[13px] text-text-secondary mt-3'>
            Don't have an account?{" "}
            <Link className="font-medium text-accent-primary underline hover:text-accent-primary-dim transition-colors" to='/signUp'>
            SignUp
            </Link>
          </p>
        </form>
      </div>

    </AuthLayout>
  )
}

export default Login