import './App.css';
import React, { useState } from 'react';

function App() {
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [licenseNo, setLicenseNo] = useState();
  const [doe, setDOE] = useState();

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('image', image);
    
    try {
      const response = await fetch(`http://127.0.0.1:5000/upload-image`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setName(data["name"]);
      setLicenseNo(data["license_no"]);
      setDOE(data["date_of_Exp"]);
      console.log(data);
      console.log(data["name"]);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>License Text Extract</h1>
        <input style={{}} type='file' name='file' onChange={handleChange} />
        <button className='AppImageButton' onClick={uploadImage}>Upload Image</button>
        
        {/* Display extracted data */}
        <div style={{ marginTop: '20px' }}>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>License Number:</strong> {licenseNo}</p>
          <p><strong>Date of Expiry:</strong> {doe}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
