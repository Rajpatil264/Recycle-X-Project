import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/consumerStyles/ConsumerOrderSummary.module.css';

const AddressForm = React.memo(({ isEditing, data, setData, onSubmit, onCancel, loading }) => {
    const [formData, setFormData] = useState(data);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={(e) => onSubmit(e, isEditing)} className={styles.addressForm}>
            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
            <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
            <input type="text" name="street_name" placeholder="Street Name" value={formData.street_name} onChange={handleChange} required />
            <input type="text" name="landmark" placeholder="Landmark" value={formData.landmark} onChange={handleChange} required />
            <button type="submit" disabled={loading}>{isEditing ? 'Update' : 'Add'} Address</button>
            <button type="button" onClick={onCancel} disabled={loading}>Cancel</button>
        </form>
    );
});

const ConsumerOrderSummary = () => {
    const navigate = useNavigate();
    const [deliveryAddresses, setDeliveryAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const consumerId = sessionStorage.getItem('consumerId');
    const token = sessionStorage.getItem('token');
    const consumerName = sessionStorage.getItem('consumerName');

    const axiosConfig = { headers: { 'Authorization': `Bearer ${token}` } };

    useEffect(() => {
        const fetchDeliveryAddresses = async () => {
            if (!consumerId || !token) return;

            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/consumer/delivery', axiosConfig);
                const filteredAddresses = response.data.data.filter(addr => addr.consumer_id === parseInt(consumerId, 10));
                setDeliveryAddresses(filteredAddresses);
                if (filteredAddresses.length > 0) setSelectedAddress(filteredAddresses[0]);
                setError(null);
            } catch (err) {
                setError("Failed to load addresses. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchDeliveryAddresses();
    }, [consumerId, token]);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (!consumerId || !token) return;

            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/consumer/showcart/${consumerId}`, axiosConfig);
                setCartItems(response.data.data);
                setTotalItems(response.data.data.length);
                const total = response.data.data.reduce((sum, item) => sum + (item.price_per_kg * item.quantity_kg), 0);
                setTotalPrice(total.toFixed(2));
                setError(null);
            } catch (err) {
                setError("Failed to load cart items. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchCartItems();
    }, [consumerId, token]);

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            setError("Please select a delivery address");
            return;
        }

        if (cartItems.length === 0) {
            setError("Your cart is empty");
            return;
        }

        try {
            setLoading(true);
            navigate('/success');
        } catch (err) {
            setError("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {error && <div className={styles.error}>{error}</div>}
            <h2>Order Summary</h2>

            <div className={styles.orderSummary}>
                <h3>Order Details</h3>
                <p>Total Items: {totalItems}</p>
                {cartItems.length > 0 ? (
                    <>
                        <table className={styles.cartTable}>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price/kg</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => (
                                    <tr key={item.item_id}>
                                        <td>{item.subcategory_name}</td>
                                        <td>₹{item.price_per_kg}</td>
                                        <td>{item.quantity_kg} kg</td>
                                        <td>₹{(item.price_per_kg * item.quantity_kg).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className={styles.total}>Total Amount: ₹{totalPrice}</p>
                        <button onClick={handlePlaceOrder} disabled={!selectedAddress || loading}>Place Order</button>
                    </>
                ) : (
                    <p>Your cart is empty</p>
                )}
            </div>
        </div>
    );
};

export default ConsumerOrderSummary;
