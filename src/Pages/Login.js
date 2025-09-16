import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setIsloggedin }) {
  const url = process.env.REACT_APP_BACKENDURL;
  console.log(url)
  const navigate = useNavigate();

  const [login, setLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });
  const [showToast, setShowToast] = useState(false);

  function handlechange(e) {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    setError({ ...error, [name]: "" });
  }

  function handlesubmit(e) {
    e.preventDefault();

    const errors = { email: "", password: "" };
    let isvalid = true;

    const emailreg = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (login.email.trim() === "") {
      errors.email = "Enter the valid email";
      isvalid = false;
    } else if (!emailreg.test(login.email.trim())) {
      errors.email = 'Email should contain @gmail.com';
      isvalid = false;
    }

    if (login.password.trim() === "") {
      errors.password = "Password is required";
      isvalid = false;
    }

    setError(errors);
    if (!isvalid) return;

    fetch(`${url}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: login.email, password: login.password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === true) {
          console.log("Login", data)
          setShowToast(true);
          setTimeout(() => setShowToast(false), 5000);
          setTimeout(() => {
            setIsloggedin(true);
            navigate('/dashboard');
          }, 2000);
        } else {
          alert("Invalid user or invalid email or password");
        }
      })
      .catch(err => console.log("error in the frontend login fetch", err));

    setLogin({ email: "", password: "" });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 gradient">
      <div className="w-full max-w-md p-6 bg-white/30 backdrop-blur-md border border-white/40 rounded-lg shadow-lg">
        <form onSubmit={handlesubmit} className="space-y-4">
          <div className="text-center">
            <h1 className="text-xl font-bold mb-2">Welcome Back</h1>
            <p className="text-xs">Sign in and uncover hidden places waiting to be explored.</p>
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-sm">Email Address</label>
            <input
              type="email"
              name="email"
              value={login.email}
              onChange={handlechange}
              placeholder="example: John@gmail.com"
              className="w-full px-3 py-2 border rounded-md"
            />
            {error.email && <p className="text-red-600 text-xs mt-1">{error.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={login.password}
              onChange={handlechange}
              className="w-full px-3 py-2 border rounded-md"
            />
            {error.password && <p className="text-red-600 text-xs mt-1">{error.password}</p>}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
            >
              Login
            </button>
            <p className="text-xs text-center mt-3">
              New User to Explore...?{' '}
              <span
                className="text-blue-800 cursor-pointer font-medium"
                onClick={() => navigate('/create')}
              >
                Register Here!
              </span>
            </p>
          </div>
        </form>
      </div>

      {showToast && (
        <div className="fixed z-50 right-4 top-20 sm:top-28 w-[90vw] sm:max-w-xs md:max-w-sm lg:max-w-md flex items-start sm:items-center p-4 text-sm text-green-800 bg-green-100 border border-green-300 rounded-lg shadow space-x-3 transition-opacity duration-300 ease-in-out">

          {/* Icon */}
          <div className="flex-shrink-0 w-8 h-8 inline-flex items-center justify-center text-green-600 bg-green-200 rounded-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
          </div>

          {/* Message */}
          <div className="flex-1 text-sm font-medium break-words">Login successful!</div>

          {/* Close Button */}
          <button
            onClick={() => setShowToast(false)}
            className="ml-auto -mx-1.5 -my-1.5 text-green-500 hover:text-green-700 rounded-lg p-1.5 hover:bg-green-200 focus:ring-2 focus:ring-green-300"
            aria-label="Close"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>
      )}

    </div>
  );
}
