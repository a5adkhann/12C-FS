import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast'
const Uploader = () => {

  const [myFile, setMyFile] = useState(null);

  const handleUpload = async(e) => {
    e.preventDefault();
    try{

      const formData = new FormData();
      formData.append("myImage", myFile);
      const response = await axios.post("http://localhost:2000/api/file-upload", formData);
      console.log(response);
      toast.success(response.data.message);
    }
    catch(err){
      console.log("Error uploading file", err);
    }
  }
  return (
    <>
    <form className='flex justify-center py-24' enctype="multipart/form-data" onSubmit={handleUpload}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">File Upload</legend>
        <div className="join">
          <input type="file" className="input join-item" onChange={(e) => setMyFile(e.target.files[0])} />
          <button className="btn join-item">save</button>
        </div>
      </fieldset>
      </form>
    </>
  )
}

export default Uploader
