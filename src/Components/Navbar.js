import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi'; // Menu icons

export default function Navbar({ isLoggedIn, setIsloggedin }) {
    const navigate = useNavigate();
    const url = process.env.REACT_APP_BACKENDURL;
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        fetch(`${url}logout`, {
            method: "DELETE",
            credentials: 'include'
        })
            .then(res => res.json())
            .then(() => {
                setIsloggedin(false);
                navigate('/login');
            })
            .catch((err) => {
                console.log("logout failed", err);
            });
    };

    return (
        <div>
            <nav className="bg-blue-100 border-b border-blue-200 text-gray-800 p-4 fixed w-[100%] top-0 z-[9999] shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
                    <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
                        Explore
                    </h1>

                    {/* Hamburger Icon (Mobile Only) */}
                    <div className="md:hidden">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
                            {menuOpen ? <HiX className="text-3xl" /> : <HiMenu className="text-3xl" />}
                        </button>
                    </div>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-6 font-medium">
                        <li className=" cursor-pointer transition" onClick={() => navigate('/')}>Home</li>
                        <li className=" cursor-pointer transition" onClick={() => navigate('/dashboard')}>All Places</li>
                        <li className=" cursor-pointer transition" onClick={() => navigate('/addplace')}>Add New Place</li>
                    </ul>

                    {/* Desktop Buttons */}
                    <div className="hidden md:flex space-x-4">
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate('/create')}
                                    className="bg-rose-400 px-4 py-2 rounded hover:bg-gray-800 transition"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {menuOpen && (
                    <div className="md:hidden px-4 pt-4 pb-6 bg-blue-100 border-t border-blue-200 text-gray-800 shadow-md space-y-4">

                        <ul className="flex flex-col space-y-3 font-medium">
                            <li className=" cursor-pointer transition" onClick={() => { navigate('/'); setMenuOpen(false); }}>Home</li>
                            <li className=" cursor-pointer transition" onClick={() => { navigate('/dashboard'); setMenuOpen(false); }}>All Products</li>
                            <li className=" cursor-pointer transition" onClick={() => { navigate('/addplace'); setMenuOpen(false); }}>Add New Place</li>
                        </ul>
                        <div className="pt-4 border-t border-white/30">
                            {isLoggedIn ? (
                                <button
                                    onClick={() => { handleLogout(); setMenuOpen(false); }}
                                    className="bg-red-600 w-full px-4 py-2 rounded hover:bg-red-700 transition"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => { navigate('/login'); setMenuOpen(false); }}
                                        className="bg-green-600 w-full px-4 py-2 rounded hover:bg-green-700 transition mb-2"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => { navigate('/create'); setMenuOpen(false); }}
                                        className="bg-rose-400 w-full px-4 py-2 rounded hover:bg-gray-800 transition"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}
