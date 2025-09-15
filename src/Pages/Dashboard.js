import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard({ isLoggedIn}) {
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
        <div className='flex flex-col mt-28 mb-[400%] md:mb-96 items-center h-screen'>
            <h1 className="text-center my-3 font-bold text-2xl">Spots Worth Exploring</h1>
            <p className="text-xs text-center mx-auto my-3 w-96">
                Hidden places, local gems, and unique spots waiting to be discovered around you.
            </p>

            {dashboard.length === 0 ? (
                <div className="text-center my-10  font-medium">Loading places...</div>
            ) : (
                <div className="flex flex-col items-center my-4 md:flex-row md:justify-center md:gap-5 md:flex-wrap md:mx-5">
                    {
                        dashboard.map((d, index) => (
                            <div
                                key={index}

                            >
                                <div className="card my-3" style={{ width: '18rem' }}>
                                    <img
                                        src={`${url}${d.image.filepath}`}
                                        className="w-full h-48 object-center"
                                        alt={d.placename}
                                    />
                                    <div className="card-body">
                                        <h5 className="font-semibold text-lg mb-2">{d.placename}</h5>
                                        <p className="text-sm text-gray-600 line-clamp-3 w-60">{d.description}</p>
                                        <div className='flex justify-center items-center'>
                                            <button
                                                onClick={() => {
                                                    if (isLoggedIn) {
                                                        navigate(`/cardview/${d.addplace_id}`);
                                                    } else {
                                                        navigate('/login');
                                                    }
                                                }}
                                                className="btn btn-primary my-3 w-52 "
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    )
}
