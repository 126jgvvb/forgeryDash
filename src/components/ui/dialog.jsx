import React, { useState, useEffect, useRef } from "react";
import { networkObject } from "../../pages/network";
import { Button } from "./Button";
import { useDispatch } from "react-redux";
import { addForgery } from "../../redux/defaultSlice";

export const CustomDialog = ({ open, onClose, title, children }) => {
  const overlayRef = useRef();
  const dispatch=useDispatch();

  // Close on click outside
  const handleClickOutside = (e) => {
    if (overlayRef.current && e.target === overlayRef.current) {
      onClose();
    }
  };

  const uploadNewForgery=async()=>{
    const Name = document.getElementById('name').value;
    const msisdn = document.getElementById('msisdn').value;
    const imagesToUpload=document.getElementById('selected_images').value;

    if (Name === '' ||
        msisdn === undefined ||
        msisdn === '' ||
        Name === undefined ||
        (/[+#$%@!*-]/.test(Name)) ||
        (/[+#$%@!*-]/.test(msisdn)) ||
        (/[a-zA-Z]/.test(msisdn)) 
    ) {
        alert('Check your input...make sure the phone number is correct');
        return false;
    }

    if (await networkObject.isNetworkError()) {
        alert('Network Error');
        return;
    }

    const result = networkObject.sendPostRequest({ names:Name, msisdn:msisdn,images:imagesToUpload},'/admin/add-forgery-item');
    result.then((result) => {
       
        if (result) {
            alert('Done adding forgery');
            dispatch(addForgery({payload:{ name: Name,id:result.id,attempts:result.attempts,timeStamp:result.timeStamp,msisdn: msisdn,images:imagesToUpload }}));
        }
        else {
            console.error('Something went wrong while polling the server');

        }
    })


  }

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleClickOutside} 
      className="fixed inset-0 z-50 flex  items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div className="bg-white rounded-2xl shadow-lg  max-w-4xl overflow-scroll h-[90vh] max-h-[200vh] w-full p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-red-700 font-semibold">{title}</h2>
          <Button onClick={onClose} variant="secondary" size="sm">
            X
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
