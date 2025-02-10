import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ConsumerProfile.module.css';

const ConsumerProfile = () => {
    const [consumerData, setConsumerData] = useState({});
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('/default.jpg');
    const [editing, setEditing] = useState(false);
    const id = sessionStorage.getItem('consumerId');
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchConsumerData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/consumer/getConsumerById/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = response.data.data;
                setConsumerData({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    mobileNumber: data.mobile_number,
                    state: data.state,
                    city: data.city,
                    pincode: data.pincode,
                    password: data.password,
                    imageName: data.imageName
                });

                if (data.imageName) {
                    setPreviewImage(`http://localhost:5000/uploads/Consumer_Images/${data.imageName}`);
                }
            } catch (error) {
                console.error("Error fetching consumer data:", error);
            }
        };
        fetchConsumerData();
    }, [id, token]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleImageUpload = async () => {
        if (!image) return alert("Please select an image first!");

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post(`http://localhost:5000/consumer/uploadimg/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            const uploadedImageName = response.data.data.image;
            setPreviewImage(`http://localhost:5000/uploads/Consumer_Images/${uploadedImageName}`);
            setConsumerData({ ...consumerData, imageName: uploadedImageName });
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleInputChange = (e) => {
        setConsumerData({ ...consumerData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/consumer/update/${id}`, consumerData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className={styles.profileContainer}>
            <div className={styles.imageContainer}>
                <img
                    src={previewImage}
                    alt="Profile"
                    className={styles.profileImage}
                    onClick={() => document.getElementById('imageInput').click()}
                />
                <input
                    type="file"
                    id="imageInput"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
                <button onClick={handleImageUpload} className={styles.uploadButton}>
                    Upload Image
                </button>
            </div>

            <div className={styles.formContainer}>
                <form>
                    <div className={styles.twoColumns}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" id="firstName" name="firstName" value={consumerData.firstName || ''} onChange={handleInputChange} disabled={!editing} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" id="lastName" name="lastName" value={consumerData.lastName || ''} onChange={handleInputChange} disabled={!editing} />
                        </div>
                    </div>
                    <div className={styles.twoColumns}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="mobileNumber">Mobile Number:</label>
                            <input type="text" id="mobileNumber" name="mobileNumber" value={consumerData.mobileNumber || ''} onChange={handleInputChange} disabled={!editing} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" value={consumerData.password || ''} onChange={handleInputChange} disabled={!editing} />
                        </div>
                    </div>

                    <div className={styles.oneColumn}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="state">State:</label>
                            <input type="text" id="state" name="state" value={consumerData.state || ''} onChange={handleInputChange} disabled={!editing} />
                        </div>
                    </div>
                    <div className={styles.oneColumn}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="city">City:</label>
                            <input type="text" id="city" name="city" value={consumerData.city || ''} onChange={handleInputChange} disabled={!editing} />
                        </div>
                    </div>
                    <div className={styles.oneColumn}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="pincode">Pincode:</label>
                            <input type="text" id="pincode" name="pincode" value={consumerData.pincode || ''} onChange={handleInputChange} disabled={!editing} />
                        </div>
                    </div>

                    <div className={styles.buttonGroup}>
                        {editing ? (
                            <>
                                <button type="button" onClick={handleUpdate} className={styles.saveButton}>Save</button>
                                <button type="button" onClick={() => setEditing(false)} className={styles.cancelButton}>Cancel</button>
                            </>
                        ) : (
                            <button type="button" onClick={() => setEditing(true)} className={styles.editButton}>Edit Profile</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ConsumerProfile;
