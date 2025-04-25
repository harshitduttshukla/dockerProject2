import  { useRef } from 'react';
import Input from '../components/Input';
import Button from '../components/Button22';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Link, useNavigate } from 'react-router-dom';

function Signin() {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  async function Signin() {
    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      if (!username || !password) {
        alert("Please fill in both fields");
        return;
      }

      const res = await axios.post(`${BACKEND_URL}/api/v1/signin`, { username, password });

      if (res.status === 200) {
        const jwt = res.data.token;
        localStorage.setItem("token", jwt);
        navigate("/dashboard");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Signin error:", error);
      alert("An error occurred during sign-in. Please try again.");
    }
  }

  return (
    <div className='h-screen w-screen bg-gray-800 flex justify-center items-center'>
      <div className='bg-white rounded-lg border min-w-96 p-8 shadow-xl'>
        <h1 className='text-black text-4xl font-bold text-center mb-6'>Sign in</h1>

        <div className='flex flex-col space-y-6'>
          <div className="flex flex-col">
            <label className='text-gray-700 font-medium mb-2'>Username</label>
            <Input 
              ref1={usernameRef} 
              placeholder="Enter your username" 
              classname1 ="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col">
            <label className='text-gray-700 font-medium mb-2'>Password</label>
            <Input 
              ref1={passwordRef} 
              placeholder="Enter your password" 
              type1="password" 
              classname1="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className='flex justify-center mt-6'>
          <Button onclick={Signin} variant="primary" text="Signin" />
        </div>

        <h3 className='text-center mt-4'>
          Don’t have an account? 
          <Link to="/signup" className='text-blue-700 hover:underline'>
            Sign-up
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default Signin;
