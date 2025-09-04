// src/components/Topbar.jsx
import React, { useState } from "react";
import { CustomDialog } from "./dialog";
import { Button } from "./Button";
import { Search, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { addForgery } from "../../redux/defaultSlice";
import { networkObject } from "../../pages/network";


export const Topbar = () => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [Name, setName] = useState("");
const [msisdn, setMsisdn] = useState("");
const [files, setFiles] = useState([]);
const [isUploading,setIsUploading]=useState(false);

const [images, setImages] = useState([]);

const handleFileChange = (files) => {
  const newFiles = Array.from(files);
  setFiles((prev) => [...prev, ...newFiles]);
};


const handleRemoveFile =(index) => {
  setFiles((prev) => prev.filter((_, i) => i !== index));
};

const handleSubmit =async (e) => {
  e.preventDefault();
  setIsUploading(true);
  // Construct form data or send via API
  const formData = new FormData();
  formData.append("names", Name);
  formData.append("msisdn", msisdn);
  files.forEach((file) => formData.append("images", file));

  
  if (Name === '' ||
    msisdn === undefined ||
    msisdn === '' ||
    Name === undefined ||
    (/[+#$%@!*-]/.test(Name)) ||
    (/[+#$%@!*-]/.test(msisdn)) ||
    (/[a-zA-Z]/.test(msisdn)) 
) {
    alert('Check your input...make sure the phone number is correct');
    setName("");
    setMsisdn("");
    setFiles([]);
    setIsUploading(false);
    return false;
}

if (await networkObject.isNetworkError()) {
  alert('Network Error');
  return;
}

  console.log("Submitting:", { Name, msisdn, files });

  //{ names:Name, msisdn:msisdn,images:files}
const result = networkObject.sendPostRequestForm(formData,'/admin/add-forgery-item');
result.then((result) => {
   
    if (result) {
        alert('Done adding forgery');
        dispatch(addForgery({payload:{ name: Name,id:result.id,attempts:result.attempts,timeStamp:result.timeStamp,msisdn: msisdn,images:imagesToUpload }}));
    }
    else {
      alert('Error occured');
        // Reset
  setName("");
  setMsisdn("");
  setFiles([]);
  setIsUploading(false);
        console.error('Something went wrong while polling the server');

    }
})

  // Reset
  setName("");
  setMsisdn("");
  setFiles([]);
setIsUploading(false);
 // onClose();
};

  return (
    <div className="flex justify-between items-center bg-white shadow px-4 py-2 rounded-md mb-6">
      {/* Search */}
      <div className="flex items-center bg-gray-100 px-3 py-1 rounded-md w-1/3">
        <Search size={16} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-sm flex-1"
        />
      </div>

      {/* Profile */}
      <div className="relative">
      <button
              onClick={() => setOpenDialog(true)}
              className="w-full text-left px-4 py-2 text-white rounded-lg bg-red-700 hover:bg-red-400">
              + Add Forgery
            </button>

       {/* Dialog for Adding Forgery */}
       <CustomDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Add Forgery"
      >
          <form onSubmit={handleSubmit}>
        <div className="flex space-x-[50%]" >
          <div>
        <label className="block text-xl text-red-700 mb-2">Name</label>
        <input
          type="text"
          className="border rounded p-2 w-full mb-4 border-gray-400  w-full 
             focus:outline-none focus:border-red-900"
          value={Name} placeholder="delos kevo"
          onChange={(e) => setName(e.target.value)}
          required
        />
</div>

<div>
        <label className="block text-xl text-red-700 mb-2">MSISDN</label>
        <input
          type="text"
          className="border rounded p-2 w-full mb-4 border-gray-400  w-full 
             focus:outline-none focus:border-red-900"
          value={msisdn}
          placeholder="741882818"
          onChange={(e) => setMsisdn(e.target.value)} required
        />
        </div>
</div>
       {/* 
       
        <label className="block text-xl text-red-700 mb-2">Upload Images</label>
       <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="mb-4"
          required
        />
      */ }

<h3 className="text-xl font-bold mb-6 text-red-900">Drag Images</h3>
    <div
            onDrop={(e) => {
              e.preventDefault();
              handleFileChange(e.dataTransfer.files);
            }}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById("fileInput").click()}
            className="border-4 mb-6 border-dashed border-red-300 rounded-3xl p-12 text-center cursor-pointer hover:bg-blue-50 transition-all duration-300 hover:shadow-lg"
          >
            <p className="text-gray-600 text-lg font-medium">
              Drag & drop up to 4 images here, or click to select
            </p>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files)}
            />
          </div>

        {/* Preview uploaded images */}
        {files.length > 0 && (
          <div className="grid grid-cols-3 gap-1 mb-4">
            {files.map((file, index) => {
              const url = URL.createObjectURL(file);
              return (
                <div
                  key={index}
                  className="relative border rounded overflow-hidden"
                >
                  <img
                    src={url}
                    alt={file.name}
                    className="w-full h-150 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="absolute top-1 right-1 bg-red-900 text-white rounded-full px-2 py-0.5 text-xs hover:bg-red-700"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}

  

  {
    <Button
    type="submit"
    className="w-full rounded-xl text-white p-3 bg-red-900 hover:bg-red-700"
  >{
    isUploading ? (
      <div className="flex flex-col items-center mt-6">
      <div className="w-10 h-10 border-4 border-white-900 border-t-transparent rounded-full animate-spin"></div>
    </div>
    
       ):'Submit'
  }
  
</Button> } 
      </form>
      </CustomDialog>
      </div>
    </div>
  );
};
