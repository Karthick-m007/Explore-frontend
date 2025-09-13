import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateAccount() {
    const url = process.env.REACT_APP_BACKENDURL
    const navigate = useNavigate()
    const [newuser, setNewuser] = useState({
        fullname: "",
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        fullname: "",
        email: "",
        password: ""
    })

    function handlesubmit(e) {
        e.preventDefault()

        const errors = {
            fullname: "",
            email: "",
            password: ""
        }
        let isValid = true;

        const fullnamereg = /^[A-Za-z\s]*$/
        const emailreg = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
        const passwordreg = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/

        if (newuser.fullname.trim() == "") {
            errors.fullname = 'Full name is required'
            isValid = false
        }
        else if (!fullnamereg.test(newuser.fullname.trim())) {
            errors.fullname = 'Full name must be an letter'
            isValid = false
        }
        if (newuser.email.trim() == "") {
            errors.email = 'Email is required'
            isValid = false
        }
        else if (!emailreg.test(newuser.email.trim())) {
            errors.email = '@gmail.com is required'
            isValid = false
        }
        if (newuser.password.trim() == "") {
            errors.password = 'Password is required'
            isValid = false
        }
        else if (!passwordreg.test(newuser.password.trim())) {
            errors.password = `Password must contain 
                at least one uppercase letter,one number,
                and one special character`
            isValid = false
        }
        setError(errors)
        if (!isValid) {
            return
        }

        // fetch
        console.log(url)
        fetch(`${url}create-user`, {
            method: "POST",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fullname: newuser.fullname,
                email: newuser.email,
                password: newuser.password,
            })
        })
            .then((res) => res.json())
            .then(data => {
                console.log(data)
                if (data.success == true) {
                    alert("account created successfull")
                }
                else{
                    alert(data.message)
                }
            })
            .catch(err => console.log("error in the frontend create fetch", err))

        setNewuser({
            fullname: "",
            email: "",
            password: ""
        })
    }

    function handlechange(e) {
        const { name, value } = e.target
        if (name === "fullname") {
            const regex = /^[A-Za-z\s]*$/
            if (!regex.test(value)) {
                return;
            }
        }


        setNewuser({
            ...newuser,
            [name]: value
        })

        setError({
            ...error,
            [name]: ""
        })
    }


    return (

        <div className='gradient'>
            <div className='flex items-center min-h-screen py-10 mt-3'>

                <form action="" className="backdrop-blur-md bg-white/30 border border-white/40 rounded-lg shadow-lg w-96 mx-auto flex flex-col justify-center items-center p-4 h-auto"
                    onSubmit={handlesubmit}>
                    <div>
                        <h1 className='text-center text-xl my-3'>Join Explore</h1>
                        <p className='text-center text-xs my-3 w-80'>Create your account and start discoverring hidden places</p>
                    </div>

                    <table>
                        <tbody>
                            <tr>
                                <td>

                                    <label for="fullname" className='mt-3 mb-1'>Full Name</label>
                                </td>
                            </tr>
                            <tr>
                                <td>

                                    <input type="text"
                                        name='fullname'
                                        value={newuser.fullname}
                                        onChange={handlechange}
                                        placeholder='example: John'
                                        className='border rounded px-2 py-1 w-64' />
                                    {error.fullname && (<p className="text-red-600 text-xs  mt-2">{error.fullname}</p>)}
                                </td>
                            </tr>
                            <tr>
                                <td>

                                    <label for="email" className='mt-3 mb-1'>Email Address</label>
                                </td>
                            </tr>
                            <tr>
                                <td>

                                    <input type="email"
                                        name='email'
                                        value={newuser.email}
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
                                        value={newuser.password}
                                        onChange={handlechange}
                                        className='border rounded px-2 py-1 w-64' />
                                    {error.password && (<p className="text-red-600 text-xs mt-2" style={{ whiteSpace: 'pre-line' }}>{error.password}</p>)}
                                </td>
                            </tr>

                        </tbody>
                        <div className='mt-4 flex flex-col justify-center items-center'>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">Create Account</button>
                            <a className='text-xs mt-2'>Already have an account? <span className='text-sm text-blue-800 cursor-pointer' onClick={() => navigate('/login')}>Sign in</span></a>
                        </div>

                    </table>
                </form>
            </div>
        </div>
    )
}
