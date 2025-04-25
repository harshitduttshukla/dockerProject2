import  { useRef } from 'react';
import Input from '../components/Input';
import Button from '../components/Button22';
import { BACKEND_URL } from '../config';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  async function handleSignup() {
    try {
      let username = usernameRef.current?.value?.trim();
      let password = passwordRef.current?.value?.trim();

      if (!username || !password) {
        alert('Please fill in both fields');
        return;
      }

      const res = await axios.post(`${BACKEND_URL}/api/v1/signup`, { username, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200 || res.status === 201) {
        alert('You have signed up successfully');
        navigate('/signin');
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup. Please try again.');
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-600 flex justify-center items-center">
      <div className="bg-white border min-w-96 p-8 rounded-lg shadow-xl">
        <h1 className="text-black text-4xl font-bold text-center mb-6">Sign Up</h1>

        <div className="flex flex-col space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Username</label>
            <Input 
              ref1={usernameRef} 
              placeholder="Enter your username" 
              classname1="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Password</label>
            <Input 
              ref1={passwordRef} 
              placeholder="Enter your password" 
              type1="password" 
              classname1="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button onclick={handleSignup} variant="primary" text="Signup" />
        </div>

        <h3 className="text-center mt-4">
          Already have an account? 
          <Link to="/signin" className="text-blue-700 hover:underline ml-2">
            Sign-in
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default Signup;
