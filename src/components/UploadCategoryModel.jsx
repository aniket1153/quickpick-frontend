import React, { useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';



const handleSubmit =async(e)=>{
  e.preventDefault(); 
  try {
    setLoading(true)
    const response = await Axios({
         ...SummaryApi.addCategory,
         data:data
    })

    const { data: responseData} =response
    console.log("API Response:", responseData);

    if(responseData.success){
      toast.success(responseData.message)
      close()
      fetchData()
    }
  } catch (error) {
    AxiosToastError(error)
  }
  finally{
    setLoading(false)
  }

}
const UploadCategoryModel = ({close, fetchData}) => {
  const [data,setData] = useState({
    name : "",
    image: ""
  })

  const [loading ,setLoading] =useState(false)
 const handleOnChange =(e)=>{
    const {name , value} = e.target
    setData((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }

  const handleSubmit =async(e)=>{
    e.preventDefault(); 
    try {
      setLoading(true)
      const response = await Axios({
           ...SummaryApi.addCategory,
           data:data
      })

      const { data: responseData} =response
      console.log("API Response:", responseData);

      if(responseData.success){
        toast.success(responseData.message)
        close()
        fetchData()
      }
    } catch (error) {
      AxiosToastError(error)
    }
    finally{
      setLoading(false)
    }

  }
const handleUploadCategoryImage =async(e)=>{
  const file = e.target.files[0]
  if(!file){
    return
  }

  const response = await uploadImage(file)
  const {data :ImageResponse} = response

  setData((preve)=>{
    return{
      ...preve,
      image :ImageResponse.data.url
    }
  })
  
}




  return (
    <section className="fixed top-0 bottom-0 right-0 left-0  bg-neutral-800/70 z-50 flex justify-center items-center ">
      <div className="bg-white max-w-4xl w-full p-4 rounded-lg shadow-lg relative">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">Category</h2>
          <button
            onClick={close}
            className="absolute top-6 right-3 text-gray-600 hover:text-red-500"
          >
            <IoMdCloseCircle size={32} />
          </button>
        </div>
        <form className="my-3 grid gap-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label id="categoryName" htmlFor="">
              Name
            </label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter a categoryName"
              value={data.name}
              name="name"
              onChange={handleOnChange}
              className="bg-blue-50 border border-blue-200 focus-within:border-red-500 outline-none rounded"
            />
            <label htmlFor=""></label>
          </div>
          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border bg-blue-50 h-36 w-full lg:w-36 flex justify-center items-center rounded">
                {data.image ? (
                  <img
                    alt="Category"
                    src={data.image}
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">No Image</p>
                )}
              </div>

              <label htmlFor="uploadCategoryImage">
                <div
                  className={`
     ${
       !data.name
         ? "bg-gray-400"
         : "border-red-400  hover:bg-red-500 hover:text-white "
     }
     px-3 py-3 rounded cursor-pointer border font-medium
      `}
                >
                  Upload Image
                </div>
                <input
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <button
            className={`
      ${data.name && data.image ? "bg-red-500 text-white hover:bg-red-400 hover:text-white rounded" :"bg-gray-300 rounded"}
      py-2 font-semibold  hover:
      `}

          >
            Add Category
          </button>
        </form>
      </div>
    </section>
  );
}

export default UploadCategoryModel