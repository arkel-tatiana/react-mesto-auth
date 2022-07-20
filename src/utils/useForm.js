import React, { useState } from 'react';
import EditProfilePopup from '../components/EditProfilePopup';
import EditAvatarPopup from '../components/EditAvatarPopup';
export const useForm = (inputValues) => {
  console.log(inputValues)
const [values, setValues] = useState(inputValues)

const handleChange = (event) => { 
  const { name, value } = event.target
    setValues((prev) => ({ 
    ...prev, 
    [name]: value
  })) 
};
return (values, handleChange, setValues);
}