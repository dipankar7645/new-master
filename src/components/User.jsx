import React, { useState } from 'react';
import { useAuth } from '../UserAuthContext';
import { useNavigate } from 'react-router-dom';
import './User.css';

const User = () => {
  const { user, setUser, updateProfilePhoto } = useAuth();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(user?.photoURL || '/images/default-profile.jpg');

  const [formData, setFormData] = useState({
    firstName: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    email: user?.email || '',
    country: user?.country || '',
    state: user?.state || '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(file);
      setPreview(imageUrl);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveProfile = () => {
    setUser((prevUser) => ({
      ...prevUser,
      name: formData.firstName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      country: formData.country,
      state: formData.state,
      photoURL: selectedImage ? preview : prevUser.photoURL,
    }));

    if (selectedImage) {
      updateProfilePhoto(preview);
    }

    alert('💣 Boom! Profile successfully updated!');
    navigate('/');
  };

  if (!user) return <p>Please sign in to view your profile.</p>;

  return (
    <div className="profile-container">
      <div className="profile-left">
        <img src={preview} alt="Profile" className="profile-image" />
        <input type="file" accept="image/*" onChange={handleImageChange} className="upload-btn" />
        <h3>{formData.firstName}</h3>
        <p>{formData.email}</p>
      </div>

      <div className="profile-right">
        <h2>Profile Settings</h2>
        <div className="profile-form">
          <input name="firstName" type="text" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
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
