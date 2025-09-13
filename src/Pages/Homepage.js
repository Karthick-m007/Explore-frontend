import React, { useEffect, useState } from 'react'
import { IoSearchCircle } from "react-icons/io5";
import { MdLocationPin } from "react-icons/md";
import { IoHeartCircleOutline } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { SiAmazongames } from "react-icons/si";
import { MdEmojiEvents } from "react-icons/md";
import { FaArtstation } from "react-icons/fa";
import { FaPlaceOfWorship } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Homepage({ isLoggedIn }) {
    const [dashboard, setDashboard] = useState([])
    const navigate = useNavigate()


    const url = process.env.REACT_APP_BACKENDURL

    useEffect(() => {
        fetch(`${url}get-place`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setDashboard(data.product)
            })
            .catch(err => console.error("Error fetching places:", err))
    }, [url])

    return (
        <div className="font-sans text-gray-800">
            {/* Hero Section */}
            <div
                className="mt-20 flex flex-col items-center justify-center px-4 py-12 md:py-20 lg:py-32 box-3 text-white text-center"
                style={{
                    background: 'linear-gradient(201deg, rgba(63, 94, 251, 0.65), rgba(252, 70, 107, 0.65))'
                }}
            >
                <h1 className="text-3xl md:text-4xl font-bold my-3">
                    Discover Hidden Gems Near You
                </h1>
                <p className="text-sm md:text-base">
                    Explore local shops, unique experiences, and services right in your city
                </p>
                <div className="flex my-4 justify-center gap-3">
                    <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
                        Explore Now
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigate('/login')}>
                        Login to Add
                    </button>
                </div>
            </div>

            {/* How it Works */}
            <div className='flex flex-col items-center justify-center gap-4 mt-5'>
                <h1 className='font-bold text-xl'>How it Works</h1>
                <div className='my-3 md:flex md:gap-5'>
                    <div className='border rounded-4 box w-80 h-52 p-2 flex flex-col justify-center items-center my-4 bg-white shadow-sm'>
                        <IoSearchCircle className='text-5xl mx-auto text-blue-400 mt-1 mb-2' />
                        <h2 className='font-bold text-lg'>Explore Local Spot</h2>
                        <p className='text-sm p-1 w-64 text-center my-2'>
                            Discover hidden gems in your own neighborhood. Start exploring nearby spots today!
                        </p>
                    </div>
                    <div className='border rounded-4 box w-80 h-52 p-2 flex flex-col justify-center items-center my-4 bg-white shadow-sm'>
                        <MdLocationPin className='text-5xl mx-auto text-green-400 mt-1 mb-2' />
                        <h2 className='font-bold text-lg'>Add Your Discoveries</h2>
                        <p className='text-sm p-1 w-64 text-center my-2'>
                            Add them to the map and let others experience them too. Share your local finds!
                        </p>
                    </div>
                    <div className='border rounded-4 box w-80 h-52 p-2 flex flex-col justify-center items-center my-4 bg-white shadow-sm'>
                        <IoHeartCircleOutline className='text-5xl mx-auto text-pink-400 mt-1 mb-2' />
                        <h2 className='font-bold text-lg'>Connect & Share</h2>
                        <p className='text-sm p-1 w-64 text-center my-2'>
                            Connect with fellow explorers. Let’s build a network of unique places.
                        </p>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className='my-5'>
                <h2 className='text-center font-bold mt-4 mb-5 text-xl'>Explore Near You</h2>
                <div className='my-3 flex flex-col items-center md:flex-row md:justify-center md:gap-5'>
                    {[
                        { title: "Local Shop", icon: <FaShoppingBag />, desc: "Handmade goods,products" },
                        { title: "Games & Fun Vibe", icon: <SiAmazongames />, desc: "Discover art, games & events" },
                        { title: "Lifestyle", icon: <FaArtstation />, desc: "Creativity and entertainment" },
                        { title: "Events", icon: <MdEmojiEvents />, desc: "Local and creative events" }
                    ].map((item, i) => (
                        <div key={i} className='flex flex-col justify-center items-center border bg-blue-50 box-2 rounded-3 w-56 p-2 my-3 shadow-sm'>
                            <div className='text-purple-500 text-3xl my-3'>{item.icon}</div>
                            <h3 className='my-1 font-bold text-md'>{item.title}</h3>
                            <p className='text-sm text-center'>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Places */}
            <div className="mb-16 bg-blue-50 pb-4">
                <h1 className='text-center pt-5 font-bold text-xl'>Spots Worth Exploring</h1>
                <p className='text-sm text-center mx-auto my-4 w-80 text-gray-600'>
                    Hidden places, local gems, and unique spots waiting to be discovered.
                </p>

                {dashboard.length === 0 ? (
                    <div className="text-center my-10 font-medium">Loading places...</div>
                ) : (
                    <div className="flex flex-col items-center my-4 md:flex-row md:justify-center md:gap-5 md:flex-wrap mx-16 g-5 ">
                        {dashboard.map((d, index) => (
                            <div key={index}>
                                <div className="card my-3 bg-white border rounded shadow-sm" style={{ width: '18rem' }}>
                                    <img
                                        src={`${url}${d.image.filepath}`}
                                        className="w-full h-48 object-center rounded-t"
                                        alt={d.placename}
                                    />
                                    <div className="p-4 flex flex-col justify-between flex-1">
                                        <h5 className="font-semibold text-lg mb-2">{d.placename}</h5>
                                        <p className="text-sm text-gray-600 line-clamp-3 w-56">{d.description}</p>
                                        <button
                                            onClick={() => {
                                                if (isLoggedIn) {
                                                    navigate(`/cardview/${d.addplace_id}`);
                                                } else {
                                                    navigate('/login');
                                                }
                                            }}
                                            className="btn btn-primary my-3"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className='mb-5 '>

                <span className='flex justify-center '>
                    <FaPlaceOfWorship className='text-4xl text-violet-400 ' />
                </span>
                <h1 className='text-center font-bold text-xl py-3 md:text-3xl'>
                    Tired of the same old places ?
                </h1>
                <span className='flex justify-center text-center'>
                    <p className='w-72 md:w-96'>Step off the beaten path and uncover hidden gems right in your neighborhood.
                        From cozy cafés to vibrant local events, there's always something new to explore.
                    </p>
                </span>
            </div>

            <div className=' flex flex-col items-center my-4 bg-blue-500 pb-5'>
                <h1 className='text-xl font-bold text-center w-80 pt-5 pb-3 md:w-96 text-white'>
                    Readyto Discover Your City'S Hidden Gems?
                </h1>
                <span className='flex justify-center'>
                    <p className='w-72 text-center text-sm py-3 md:w-full text-white'>Discover unique places around you that you’ve never noticed before.</p>
                </span>

                <div className='flex flex-col items-center border rounded-3 py-3 ps-2 w-[85%] md:w-[50%] bg-white'>
                    <button className='border bg-violet-500 py-3 px-4 flex items-center text-white font-bold rounded-full hover:bg-violet-600 ' onClick={() => navigate('/login')} >Join Our Community  <FaArrowRightLong className='ms-3 text-xl' />
</button>
                    <p className='py-4 text-center'>Bu Signing up, Your agree to our Terms and Conditions</p>
                </div>
            </div>


        </div>
    )
}
