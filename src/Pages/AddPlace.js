import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddPlace() {
    const url = process.env.REACT_APP_BACKENDURL
    console.log(url)
    const navigate= useNavigate()
    const [place, setPlace] = useState({
        placename: "",
        location: "",
        image: "",
        rating: "",
        description: "",
        detailinfo: "",


    })
    const [previewUrl, setPreviewUrl] = useState(null);

    const [error, setError] = useState({
        placename: "",
        location: "",
        image: "",
        rating: "",
        description: "",
        detailinfo: "",

    })


    function handlechange(e) {
        const { name, value, files } = e.target
        if (name === "rating") {
            const regex = /^[1-5]?$/
            if (!regex.test(value)) {
                return;
            }
        }
        if (name === 'image') {
            const file = files[0];
            if (file) {
                setPlace({
                    ...place,
                    image: file
                });
                setPreviewUrl(URL.createObjectURL(file)); 
            }
        }
        else {
            setPlace({
                ...place,
                [name]: value
            })
        }
    }





    function handlesubmit(e) {
        e.preventDefault()

        const errors = {
            placename: "",
            location: "",
            image: "",
            rating: "",
            description: "",
            detailinfo: "",

        }
        const ratingreg = /^[1-5]$/
        let isvalid = true
        if (place.placename.trim() == "") {
            errors.placename = "Placename field required"
            isvalid = false
        }
        if (place.location.trim() == "") {
            errors.location = "Location field required"
            isvalid = false
        }
        if (!place.image) {
            errors.image = "Image field required"
            isvalid = false
        }
        if (place.rating.trim() == "") {
            errors.rating = "Rating field required"
            isvalid = false
        }
        else if (!ratingreg.test(place.rating)) {
            errors.rating = "enter the rating number between 1-5"
            isvalid = false
        }
        if (place.description.trim() == "") {
            errors.description = "Description field required"
            isvalid = false
        }
        if (place.detailinfo.trim() == "") {
            errors.detailinfo = "Detail info field required"
            isvalid = false
        }


        setError(errors)
        if (!isvalid) {
            return
        }

        const formdata = new FormData()
        formdata.append('placename', place.placename)
        formdata.append('location', place.location)
        formdata.append('image', place.image)
        formdata.append('rating', place.rating)
        formdata.append('description', place.description)
        formdata.append('detailinfo', place.detailinfo)


        fetch(`${url}add-new-place`, {
            method: "POST",
            credentials: "include",
            body: formdata
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success == true) {
                    alert("successfull added ")
                    navigate('/dashboard')
                    
                }
                else{
                    alert(data.message)
                }
            })
            .catch(err => console.log("error in the front end add place", err))

setPlace({
    placename: "",
    location: "",
    image: "",
    rating: "",
    description: "",
    detailinfo: "",
})
    }




    return (
        <div className='gradient2'>
            <form
                action=""
                className='w-full max-w-[90%] md:max-w-3xl mx-auto flex flex-col justify-center items-center p-4 h-auto'
                onSubmit={handlesubmit}
            >
                <div className= 'mt-28 backdrop-blur-md bg-white/35 border-white/50 rounded-lg shadow-lg border py-4 px-4 w-full'>
                    <div>
                        <h1 className='text-center my-3 text-xl'>Add a New Place</h1>
                        <p className='text-sm text-center'>Share your favourite hidden gem with the Explore community</p>
                    </div>

                    <table className='w-full'>
                        <tbody>
                            {/* Place Name */}
                            <tr>
                                <td>
                                    <label htmlFor="placename" className='mb-2 mt-4 block'>Place Name</label>
                                    <input type="text"
                                        name='placename'
                                        value={place.placename}
                                        onChange={handlechange}
                                        className='border rounded p-1 w-full' />
                                    {error.placename && (<p className="text-red-600 text-xs  mt-2">{error.placename}</p>)}

                                </td>
                            </tr>

                            {/* Location */}
                            <tr>
                                <td>
                                    <label htmlFor="location" className='mb-2 mt-4 block'>Location</label>
                                    <input type="text"
                                        name='location'
                                        value={place.location}
                                        onChange={handlechange}
                                        className='border rounded p-1 w-full' />
                                    {error.location && (<p className="text-red-600 text-xs  mt-2">{error.location}</p>)}
                                </td>
                            </tr>

                            {/* Image */}
                            <tr>
                                <td>
                                    <label htmlFor="image" className='mb-2 mt-4 block'>Image</label>
                                    <input type="file"
                                        name='image'
                                        accept='image/*'
                                        onChange={handlechange}
                                        className='border rounded p-1 w-full' />
                                    {previewUrl && (
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="mt-2 rounded-md shadow-md"
                                            style={{ maxWidth: '50%', maxHeight: '100px' }}
                                        />
                                    )}
                                    {error.image && (<p className="text-red-600 text-xs  mt-2">{error.image}</p>)}
                                </td>
                            </tr>

                            {/* Rating */}
                            <tr>
                                <td>
                                    <label htmlFor="rating" className='mb-2 mt-4 block'>Rating</label>
                                    <input type="text"
                                        name='rating'
                                        value={place.rating}
                                        onChange={handlechange}
                                        pattern='[1-5]'
                                        maxLength={1}
                                        className='border rounded p-1 w-full' />
                                    {error.rating && (<p className="text-red-600 text-xs  mt-2">{error.rating}</p>)}
                                </td>
                            </tr>

                            {/* Short Description */}
                            <tr>
                                <td>
                                    <label htmlFor="description" className='mb-2 mt-4 block'>Description</label>
                                    <textarea
                                        name='description'
                                        value={place.description}
                                        onChange={handlechange}
                                        className='border rounded p-1 w-full' />
                                    {error.description && (<p className="text-red-600 text-xs  mt-2">{error.description}</p>)}
                                </td>
                            </tr>

                            {/* Detailed Information */}
                            <tr>
                                <td>
                                    <label htmlFor="information" className='mb-2 mt-4 block'>Detail Information</label>
                                    <textarea
                                        name='detailinfo'
                                        value={place.detailinfo}
                                        onChange={handlechange}
                                        className='border rounded p-1 w-full' />
                                    {error.detailinfo && (<p className="text-red-600 text-xs  mt-2">{error.detailinfo}</p>)}
                                </td>
                            </tr>




                            {/* Submit Button */}
                            <tr>
                                <td>
                                    <div className='mt-4 flex flex-col justify-center items-center'>
                                        <button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'>Add Place</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    )
}


// <tr>
//     <td className='flex flex-col md:flex-row justify-between gap-4 mt-4'>
{/* Name */ }
{/* <div className='flex flex-col w-full md:w-1/2'>
            <label htmlFor="name" className='mb-1'>Name</label>
            <input type="text" className='border rounded p-1 w-full' />
        </div> */}

{/* Email */ }
{/* <div className='flex flex-col w-full md:w-1/2'>
            <label htmlFor="useremail" className='mb-1'>User Email</label>
            <input type="email" className='border rounded p-1 w-full' />
        </div>
    </td>
</tr> */}