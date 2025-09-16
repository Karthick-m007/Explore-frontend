import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function CardView() {
  const { id } = useParams();
  const [view, setView] = useState(null);
  const url = process.env.REACT_APP_BACKENDURL;


  useEffect(() => {
    fetch(`${url}get-place/${id}`, {
      method: "GET",
      headers:{"Content-Type":"application/json"},
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        console.log("fetch")
        if (data.success) {
          console.log(data)
          setView(data.data);
        } else {
          console.error(data.message);
        }
      })
      .catch(err => console.error("Error fetching place:", err));
  }, [url, id]);


  if (!view) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="md:flex md:flex-col md:justify-center items-center mt-32 max-w-5xl mx-auto my-10 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg w-full h-80 object-center"
        src={`${url}${view.image.filepath}`}
        alt={view.placename}
      />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{view.placename}</h5>
        <h3 className="mb-1 font-medium text-gray-700 dark:text-gray-300">Rating: {view.rating}</h3>
        <h3 className="mb-3 font-normal text-gray-700 dark:text-gray-400">Location: {view.location}</h3>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{view.description}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{view.detailinfo}</p>
      </div>
    </div>
  );
}
