import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import FormField from './Components/FormField';
import './App.css'

const SALT = import.meta.env.VITE_SALT;
const SECRET = import.meta.env.VITE_SECRET;
const key = CryptoJS.SHA256(SECRET);

function decryptField(data, iv) {
  try {
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.enc.Base64.parse(data) },
      key,
      { iv: CryptoJS.enc.Base64.parse(iv), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    ).toString(CryptoJS.enc.Utf8);

    if (!decrypted.startsWith(SALT)) return null;

    //Strip the SALT from the decrypted value
    
    const stripped = decrypted.slice(SALT.length);
    const [label, type] = stripped.split(":");
    if (!label || !type) return null;

    return { label, type };
  } catch (e) {
    return null;
  }
}

function App() {
  const [fields, setFields] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/form")
      .then(res => {
        const validFields = res.data.map(f => decryptField(f.data, f.iv)).filter(Boolean);
        setFields(validFields);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = () => {

    const currentField = fields[currentIndex];
  const currentValue = formData[currentField.label];

  if (!currentValue || currentValue.trim() === "") {
    alert(`${currentField.label} is required.`);
    return;
  }
  
    if (currentIndex + 1 < fields.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      axios.post("http://localhost:5000/api/submit", formData)
        .then(() => { alert("Form submitted successfully!");
         setFormData({});          
         setCurrentIndex(0);
        } )  
        .catch(err => alert("Submission failed",err));
    }
  };

  return (
    
  <div className='form-div'>
    <div className='form-container'>
      <h2 style={{fontSize:'30px'}}>🔒 Secure Dynamic Form</h2>
      <div className='form-field'>
        {fields[currentIndex] && (
          <FormField
            field={fields[currentIndex]}
            value={formData[fields[currentIndex].label] || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        )}
      </div>
    </div>
  </div>
);
  
}

 

export default App;