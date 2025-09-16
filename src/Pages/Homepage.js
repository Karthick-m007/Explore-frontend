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
       setTimeout(() => {
           fetch(`${url}get-place`, {
               method: 'GET',
                headers: { 'Content-Type': 'application/json' },
               credentials: 'include',
           })
               .then(res => res.json())
               .then(data => {
                   console.log(data)
                   setDashboard(data.product)
               })
               .catch(err => console.error("Error fetching places:", err))
       }, 3000);
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
                    <div className="flex justify-content-center my-10 font-medium">
                        <div class="loader">
                            <div class="truckWrapper">
                                <div class="truckBody">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 198 93"
                                        class="trucksvg"
                                    >
                                        <path
                                            stroke-width="3"
                                            stroke="#282828"
                                            fill="#F83D3D"
                                            d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
                                        ></path>
                                        <path
                                            stroke-width="3"
                                            stroke="#282828"
                                            fill="#7D7C7C"
                                            d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
                                        ></path>
                                        <path
                                            stroke-width="2"
                                            stroke="#282828"
                                            fill="#282828"
                                            d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
                                        ></path>
                                        <rect
                                            stroke-width="2"
                                            stroke="#282828"
                                            fill="#FFFCAB"
                                            rx="1"
                                            height="7"
                                            width="5"
                                            y="63"
                                            x="187"
                                        ></rect>
                                        <rect
                                            stroke-width="2"
                                            stroke="#282828"
                                            fill="#282828"
                                            rx="1"
                                            height="11"
                                            width="4"
                                            y="81"
                                            x="193"
                                        ></rect>
                                        <rect
                                            stroke-width="3"
                                            stroke="#282828"
                                            fill="#DFDFDF"
                                            rx="2.5"
                                            height="90"
                                            width="121"
                                            y="1.5"
                                            x="6.5"
                                        ></rect>
                                        <rect
                                            stroke-width="2"
                                            stroke="#282828"
                                            fill="#DFDFDF"
                                            rx="2"
                                            height="4"
                                            width="6"
                                            y="84"
                                            x="1"
                                        ></rect>
                                    </svg>
                                </div>
                                <div class="truckTires">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 30 30"
                                        class="tiresvg"
                                    >
                                        <circle
                                            stroke-width="3"
                                            stroke="#282828"
                                            fill="#282828"
                                            r="13.5"
                                            cy="15"
                                            cx="15"
                                        ></circle>
                                        <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 30 30"
                                        class="tiresvg"
                                    >
                                        <circle
                                            stroke-width="3"
                                            stroke="#282828"
                                            fill="#282828"
                                            r="13.5"
                                            cy="15"
                                            cx="15"
                                        ></circle>
                                        <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
                                    </svg>
                                </div>
                                <div class="road"></div>

                                <svg
                                    viewBox="0 0 453.459 453.459"
                                    xmlns="http://www.w3.org/2000/svg"
                                    id="Capa_1"
                                    version="1.1"
                                    fill="#000000"
                                    className="lampPost"
                                >

                                    <path
                                        d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993
c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514
c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16
c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914
h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75
v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795
V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z
M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017
h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
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
