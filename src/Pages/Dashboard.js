import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard({ isLoggedIn }) {
    const [dashboard, setDashboard] = useState([]);
    const navigate = useNavigate();
    const url = process.env.REACT_APP_BACKENDURL;

    useEffect(() => {
        fetch(`${url}get-place`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setDashboard(data.product);
            })
            .catch(err => console.error("Error fetching places:", err));
    }, [url]);

    return (
        <div className="flex flex-col items-center px-4 pt-24 pb-10">
            <h1 className="text-center font-bold text-2xl">Spots Worth Exploring</h1>
            <p className="text-sm text-center my-3 max-w-md">
                Hidden places, local gems, and unique spots waiting to be discovered around you.
            </p>

            {dashboard.length === 0 ? (
                <div className="text-center my-10 font-medium">Loading places...</div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 w-full max-w-7xl">
                    {dashboard.map((d, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300 dark:bg-gray-800"
                        >
                            <img
                                src={`${url}${d.image.filepath}`}
                                className="w-full h-48 object-cover"
                                alt={d.placename}
                            />
                            <div className="p-4">
                                <h5 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">{d.placename}</h5>
                                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                                    {d.description}
                                </p>
                                <div className="flex justify-center mt-4">
                                    <button
                                        onClick={() => {
                                            if (isLoggedIn) {
                                                navigate(`/cardview/${d.addplace_id}`);
                                            } else {
                                                navigate('/login');
                                            }
                                        }}
                                        className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded w-full"
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
    );
}
