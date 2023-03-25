import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate=useNavigate()


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post("http://localhost:8080/user/login", {
            email,
            password,
          });
        
          if (!response.status===201) {
            const { error_message } = response.data.message;
            setErrorMessage(error_message);
        } 
         
          else {
            setErrorMessage("");
            localStorage.setItem('token', response.data.token);
            console.log("user" , response.data)
            alert("User Login successful")
            navigate("/")
            
          }
        } catch (err) {
          console.error(err);
          if(err.response.status===401)
        {
            console.log("error", err.response.status)
            return setErrorMessage(err.response.data.message)
        }
          else
          {setErrorMessage("Something went wrong. Please try again.");}
        }
      };


  return (
    <div className="flex justify-center bg-gray-100">
    <form  onSubmit={handleSubmit} className="w-full md:w-1/2 lg:w-1/3 px-4 py-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {errorMessage && (
          <div className="mb-4 p-2 bg-red-200 font-semibold text-red-700 rounded">{errorMessage}</div>
        )}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
        onChange={(event) => setEmail(event.target.value)}
          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          value={email}
          placeholder="Enter your email address"
          required={true}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
        onChange={(event) => setPassword(event.target.value)}
          className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          value={password}
          placeholder="Enter your password"
          required={true}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
      Login
      </button>
    </form>
  </div>
  )
}

export default Login
