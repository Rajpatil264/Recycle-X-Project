import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './ConsumerCart.module.css';

const ConsumerCart = () => {
    const navigate = useNavigate();
    const [recyclingCategories, setRecyclingCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('1');
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [quantity, setQuantity] = useState(0.0);
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const consumerId = sessionStorage.getItem('consumerId');
    const token = sessionStorage.getItem('token');

    const axiosConfig = {
        headers: { 'Authorization': `Bearer ${token}` }
    };

    const fetchRecyclingCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/common/getAllRecyclingCategories', axiosConfig);
            setRecyclingCategories(response.data.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching recycling categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSubcategories = async () => {
        if (!selectedCategory) return;

        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/common/getRecySubCategoriesByCatId/${selectedCategory}`, axiosConfig);
            setSubcategories(response.data.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCartItems = async () => {
        if (!consumerId || !token) return;

        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/consumer/showcart/${consumerId}`, axiosConfig);
            setCartItems(response.data.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setSelectedSubcategory(null);
    };

    const handleSubcategoryChange = (e) => {
        const selectedSub = subcategories.find(sub => sub.subcategory_id === parseInt(e.target.value, 10));
        setSelectedSubcategory(selectedSub);
    };

    const handleQuantityChange = (increment) => {
        setQuantity(prev => Math.max(0, prev + increment).toFixed(2));
    };

    const handleAddToCart = async () => {
        if (!selectedSubcategory || !consumerId || !token || quantity <= 0) return;

        try {
            setLoading(true);
            await axios.post(`http://localhost:5000/consumer/addcart/${selectedSubcategory.subcategory_id}`, { consumer_id: consumerId, quantity }, axiosConfig);
            await fetchCartItems();
            setQuantity(0.0);
            setError(null);
        } catch (error) {
            setError('Failed to add item to cart. Please try again.');
            console.error("Error adding to cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteFromCart = async (itemId) => {
        if (!consumerId || !token) return;

        try {
            setLoading(true);
            await axios.delete(`http://localhost:5000/consumer/removecart/${itemId}`, axiosConfig);
            setCartItems(cartItems.filter(item => item.item_id !== itemId));
            setError(null);
        } catch (error) {
            setError('Failed to delete item from cart. Please try again.');
            console.error("Error deleting from cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleProceedToSummary = () => {
        navigate('/consumer/summary');
    };

    useEffect(() => {
        fetchRecyclingCategories();
    }, [token]);

    useEffect(() => {
        fetchSubcategories();
    }, [selectedCategory, token]);

    useEffect(() => {
        fetchCartItems();
    }, [consumerId, token]);

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price_per_kg * item.quantity_kg, 0).toFixed(2);
    };

    return (
        <div className={styles.container}>
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.mainContent}>
                <div className={styles.formSection}>
                    <label>Select Category</label>
                    <select value={selectedCategory} onChange={handleCategoryChange} disabled={loading}>
                        {recyclingCategories.map(category => (
                            <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                        ))}
                    </select>

                    <label>Select Subcategory</label>
                    <select value={selectedSubcategory?.subcategory_id || ''} onChange={handleSubcategoryChange} disabled={!selectedCategory || loading}>
                        <option value="">Select a subcategory</option>
                        {subcategories.map(subcategory => (
                            <option key={subcategory.subcategory_id} value={subcategory.subcategory_id}>{subcategory.subcategory_name}</option>
                        ))}
                    </select>

                    <label>Quantity (kg)</label>
                    <button onClick={() => handleQuantityChange(-0.5)} disabled={quantity <= 0 || loading}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQuantityChange(0.5)} disabled={loading}>+</button>

                    <button onClick={handleAddToCart} disabled={!selectedSubcategory || quantity <= 0 || loading}>Add to Cart</button>
                </div>
            </div>

            <div className={styles.cartSection}>
                {cartItems.length > 0 ? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price/kg</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => (
                                    <tr key={item.item_id}>
                                        <td>{item.subcategory_name}</td>
                                        <td>₹{item.price_per_kg}</td>
                                        <td>{item.quantity_kg}</td>
                                        <td>₹{(item.price_per_kg * item.quantity_kg).toFixed(2)}</td>
                                        <td>
                                            <button onClick={() => handleDeleteFromCart(item.item_id)} disabled={loading}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={handleProceedToSummary}>Proceed to Order Summary</button>
                    </>
                ) : (
                    <div>Your cart is empty</div>
                )}
            </div>
        </div>
    );
};

export default ConsumerCart;
