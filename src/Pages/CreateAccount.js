import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateAccount() {
    const url = process.env.REACT_APP_BACKENDURL;
    const navigate = useNavigate();

    const [newuser, setNewuser] = useState({
        fullname: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState({
        fullname: '',
        email: '',
        password: ''
    });

    function handlesubmit(e) {
        e.preventDefault();

        const errors = { fullname: '', email: '', password: '' };
        let isValid = true;

        const fullnamereg = /^[A-Za-z\s]*$/;
        const emailreg = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const passwordreg = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/;

        if (newuser.fullname.trim() === '') {
            errors.fullname = 'Full name is required';
            isValid = false;
        } else if (!fullnamereg.test(newuser.fullname.trim())) {
            errors.fullname = 'Full name must be letters only';
            isValid = false;
        }

        if (newuser.email.trim() === '') {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!emailreg.test(newuser.email.trim())) {
            errors.email = '@gmail.com is required';
            isValid = false;
        }

        if (newuser.password.trim() === '') {
            errors.password = 'Password is required';
            isValid = false;
        } else if (!passwordreg.test(newuser.password.trim())) {
            errors.password = `Password must contain at least one uppercase letter, one number, and one special character`;
            isValid = false;
        }

        setError(errors);
        if (!isValid) 
            return;

        fetch(`${url}create-user`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newuser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    alert('Account created successfully');
                    navigate('/login');
                } else {
                    alert(data.message);
                }
            })
            .catch(err => console.log('Frontend fetch error:', err));

        setNewuser({ fullname: '', email: '', password: '' });
    }

    function handlechange(e) {
        const { name, value } = e.target;

        if (name === 'fullname') {
            const regex = /^[A-Za-z\s]*$/;
            if (!regex.test(value)) 
                return;
        }

        setNewuser({ ...newuser, [name]: value });
        setError({ ...error, [name]: '' });
    }

    return (
        <div className="gradient min-h-screen flex items-center justify-center px-4 py-10">
            <form
                onSubmit={handlesubmit}
                className="w-full max-w-md p-6 bg-white/30 backdrop-blur-md border border-white/40 rounded-lg shadow-lg space-y-5"
            >
                <div className="text-center">
                    <h1 className="text-xl font-bold mb-2">Join Explore</h1>
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                        Create your account and start discovering hidden places
                    </p>
                </div>

                {/* Full Name */}
                <div>
                    <label htmlFor="fullname" className="block mb-1 text-sm font-medium">Full Name</label>
                    <input
                        type="text"
                        name="fullname"
                        value={newuser.fullname}
                        onChange={handlechange}
                        placeholder="e.g. John"
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    {error.fullname && <p className="text-red-600 text-xs mt-1">{error.fullname}</p>}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block mb-1 text-sm font-medium">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={newuser.email}
                        onChange={handlechange}
                        placeholder="e.g. John@gmail.com"
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    {error.email && <p className="text-red-600 text-xs mt-1">{error.email}</p>}
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block mb-1 text-sm font-medium">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={newuser.password}
                        onChange={handlechange}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    {error.password && (
                        <p className="text-red-600 text-xs mt-1 whitespace-pre-line">{error.password}</p>
                    )}
                </div>

                {/* Submit */}
                <div className="flex flex-col items-center space-y-2 pt-2">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md">
                        Create Account
                    </button>
                    <p className="text-xs">
                        Already have an account?{' '}
                        <span
                            className="text-blue-800 font-medium cursor-pointer"
                            onClick={() => navigate('/login')}
                        >
                            Sign in
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
}
