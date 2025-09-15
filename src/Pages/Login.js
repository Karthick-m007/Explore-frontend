import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({ setIsloggedin }) {
  const url = process.env.REACT_APP_BACKENDURL
  console.log(url)
  const [login, setLogin] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState({
    email: "",
    password: ""
  })

  const [showToast, setShowToast] = useState(false)


  const navigate = useNavigate()

  function handlechange(e) {
    const { name, value } = e.target
    setLogin({
      ...login,
      [name]: value
    })


    setError({
      ...error,
      [name]: ""
    })
  }

  function handlesubmit(e) {
    e.preventDefault()

    const errors = {
      email: "",
      password: ""
    }
    let isvalid = true

    const emailreg = /^[a-zA-Z0-9._%+-]+@gmail\.com$/


    if (login.email.trim() == "") {
      errors.email = "Enter the valid email"
      isvalid = false
    }
    else if (!emailreg.test(login.email.trim())) {
      errors.email = 'Email should contain @gmail.com'
      isvalid = false
    }

    if (login.password.trim() == "") {
      errors.password = "Password is required"
      isvalid = false
    }
    setError(errors)
    if (!isvalid) {
      return
    }


    fetch(`${url}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: login.email,
        password: login.password
      })
    })
      .then((res) => res.json())
      .then(data => {
        console.log(data)
        if (data.success == true) {
          setShowToast(true)
          setTimeout(() => setShowToast(false), 5000);
          setTimeout(() => {
            setIsloggedin(true)
            navigate('/dashboard');
          }, 1000);
        }
else{
  alert("Invalid user or invalid email or password")
}
      })
      .catch(err => console.log("error in the front end login fetch", err))
    setLogin({
      email: "",
      password: ""
    })

  }

  return (
    <div className='gradient'>
      <div className='flex items-center min-h-screen py-10'>

        <form action="" className="backdrop-blur-md bg-white/30 border border-white/40 rounded-lg shadow-lg w-96 mx-auto flex flex-col justify-center items-center p-4 h-auto"
          onSubmit={handlesubmit}>
          <div>
            <h1 className='text-center text-xl my-3 font-bold'>Welcome Back</h1>
            <p className='text-center text-xs my-3 w-80'>Sign up and uncover hidden places waiting to be explored</p>
          </div>

          <table>
            <tbody>
              <tr>
                <td>

                  <label for="email" className='mt-3 mb-1'>Email Address</label>
                </td>
              </tr>
              <tr>
                <td>

                  <input type="email"
                    name='email'
                    value={login.email}
                    onChange={handlechange}
                    placeholder='example: John@gmail.com'
                    className='border rounded px-2 py-1  w-64' />
                  {error.email && (<p className="text-red-600 text-xs mt-2">{error.email}</p>)}
                </td>
              </tr>
              <tr>
                <td>

                  <label for="password" className='mt-3 mb-1'>Password</label>
                </td>
              </tr>
              <tr>
                <td>

                  <input type="password"
                    name='password'
                    value={login.password}
                    onChange={handlechange}
                    className='border rounded px-2 py-1 w-64' />
                  {error.password && (<p className="text-red-600 text-xs mt-2" >{error.password}</p>)}
                </td>
              </tr>

            </tbody>
            <div className='mt-4 flex flex-col justify-center items-center'>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">Login</button>
              <a className='text-xs mt-2'>New User to Explore...!  <span className='text-sm text-blue-800 cursor-pointer' onClick={() => navigate('/create')}>Register Here...!</span></a>
            </div>

          </table>
        </form>
        {showToast && (
          <div
            id="toast-success"
            className="
      fixed z-50 
      right-4 top-20 sm:right-5 sm:top-32 
      w-[90vw] sm:max-w-xs md:max-w-sm lg:max-w-md 
      flex items-start sm:items-center p-4 
      text-sm text-gray-700 bg-white rounded-lg shadow 
      dark:text-gray-200 dark:bg-gray-800 
      space-x-3
      transition-opacity duration-300 ease-in-out
    "
          >
            {/* Icon */}
            <div className="flex-shrink-0 w-8 h-8 inline-flex items-center justify-center text-green-500 bg-green-100 rounded-lg dark:bg-green-700 dark:text-green-200">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="sr-only">Check icon</span>
            </div>

            {/* Message */}
            <div className="flex-1 text-sm font-medium break-words">
              Login successful!
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowToast(false)}
              className="
        ml-auto -mx-1.5 -my-1.5 
        text-gray-400 hover:text-gray-900 
        rounded-lg p-1.5 hover:bg-gray-100 
        focus:ring-2 focus:ring-gray-300 
        dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-700
      "
              aria-label="Close"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>
        )}




      </div>
    </div>
  )
}
