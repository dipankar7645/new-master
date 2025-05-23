import React, { useState } from 'react';
import { useAuth } from '../UserAuthContext';
import './User.css';

const User = () => {
  const { user } = useAuth();

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(user?.photoURL || '/images/default-profile.jpg');
  const [savedImage, setSavedImage] = useState(preview);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    address: user?.address || '',
    email: user?.email || '',
    country: user?.country || '',
    state: user?.state || '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveProfile = () => {
    // For now we just update the savedImage locally
    if (selectedImage) {
      setSavedImage(preview);
    }

    // Optionally, you can save formData to a backend or global state
    alert("Profile updated!");
  };

  if (!user) return <p>Please sign in to view your profile.</p>;

  return (
    <div className="profile-container">
      <div className="profile-left">
        <img src={savedImage} alt="Profile" className="profile-image" />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="upload-btn"
        />
        <h3>{formData.firstName || user.name}</h3>
        <p>{formData.email}</p>
      </div>

      <div className="profile-right">
        <h2>Profile Settings</h2>
        <div className="profile-form">
          <input name="firstName" type="text" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
          <input name="lastName" type="text" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
          <input name="phone" type="text" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          <input name="address" type="text" placeholder="Address" value={formData.address} onChange={handleChange} />
          <input name="email" type="email" placeholder="Email ID" value={formData.email} onChange={handleChange} />
          <div className="location">
            <input name="country" type="text" placeholder="Country" value={formData.country} onChange={handleChange} />
            <input name="state" type="text" placeholder="State/Region" value={formData.state} onChange={handleChange} />
          </div>
          <button className="save-btn" onClick={handleSaveProfile}>Save Profile</button>
        </div>
      </div>
    </div>
  );
};

export default User;
