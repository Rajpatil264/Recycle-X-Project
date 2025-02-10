import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import ConsumerNavbar from './ConsumerNavBar';
import ConsumerFooter from './ConsumerFooter';
import styles from '../../styles/consumerStyles/ConsumerHomePage.module.css';

const ConsumerHomePage = () => {
    const [serviceAvailable, setServiceAvailable] = useState(null);
    const [pincode, setPincode] = useState('');
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState({});
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const consumerId = useMemo(() => sessionStorage.getItem('consumerId'), []);
    const token = useMemo(() => sessionStorage.getItem('token'), []);

    const axiosInstance = useMemo(() => {
        return axios.create({
            baseURL: 'http://localhost:5000',
            headers: { 'Authorization': `Bearer ${token}` }
        });
    }, [token]);

    const checkServiceAvailability = useCallback(async () => {
        if (!pincode) return;

        try {
            setIsLoading(true);
            const response = await axiosInstance.post('/common/findServiceByPincode', { pincode });
            setServiceAvailable(response.data.data.length > 0);
            setError(null);
        } catch (error) {
            console.error("Error checking service availability:", error);
            setError("Error checking pincode.");
            setServiceAvailable(null);
        } finally {
            setIsLoading(false);
        }
    }, [pincode, axiosInstance]);

    const fetchSubcategories = useCallback(async (categoryId) => {
        try {
            const response = await axiosInstance.get(`/common/getRecySubCategoriesByCatId/${categoryId}`);
            setSubcategories(prev => ({
                ...prev,
                [categoryId]: response.data.data
            }));
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    }, [axiosInstance]);

    const fetchCategories = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get('/common/getAllTrashCategories');
            const categoryData = response.data.data;
            setCategories(categoryData);

            const promises = categoryData.map(category => {
                if (!subcategories[category.rp_category_id]) {
                    return fetchSubcategories(category.rp_category_id);
                }
                return Promise.resolve();
            });

            await Promise.all(promises);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setError("Error fetching categories.");
        } finally {
            setIsLoading(false);
        }
    }, [axiosInstance, fetchSubcategories, subcategories]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (pincode) {
                checkServiceAvailability();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [pincode, checkServiceAvailability]);

    const filteredSubcategories = useMemo(() => {
        let filtered = selectedCategory === 'all'
            ? Object.values(subcategories).flat()
            : subcategories[selectedCategory] || [];

        if (searchQuery) {
            filtered = filtered.filter(sub =>
                sub.subcategory_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return filtered;
    }, [selectedCategory, subcategories, searchQuery]);

    const handleSearchChange = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    const handlePincodeChange = useCallback((e) => {
        setPincode(e.target.value);
    }, []);

    const handleCategorySelect = useCallback((categoryId) => {
        setSelectedCategory(categoryId);
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => !prev);
    }, []);

    return (
        <div className={styles.container}>
            <nav className={styles['nav-container']}>
                <ConsumerNavbar />
                <button
                    className={styles.hamburger}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <span className={styles['hamburger-line']}></span>
                    <span className={styles['hamburger-line']}></span>
                    <span className={styles['hamburger-line']}></span>
                </button>
            </nav>

            <div className={`${styles['mobile-menu']} ${isMobileMenuOpen ? styles.active : ''}`}>
                {/* Add your mobile menu items here */}
            </div>

            <main className={styles.main}>
                <h1 className={styles['page-title']}>Scrap Prices</h1>

                <div className={styles['search-section']}>
                    <div className={styles['search-container']}>
                        <div className={styles['search-input-wrapper']}>
                            <input
                                type="text"
                                placeholder="Search any materials..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className={styles['search-input']}
                            />
                        </div>
                        <select
                            className={styles['city-select']}
                            value={pincode}
                            onChange={handlePincodeChange}
                        >
                            <option value="">Select City</option>
                            <option value="400001">Mumbai</option>
                            <option value="110001">Delhi</option>
                            <option value="560001">Bangalore</option>
                        </select>
                    </div>
                </div>

                <div className={styles['categories-section']}>
                    <div className={styles['categories-container']}>
                        <button
                            className={`${styles['category-button']} ${selectedCategory === 'all' ? styles.active : ''}`}
                            onClick={() => handleCategorySelect('all')}
                        >
                            All
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.rp_category_id}
                                className={`${styles['category-button']} ${selectedCategory === category.rp_category_id ? styles.active : ''}`}
                                onClick={() => handleCategorySelect(category.rp_category_id)}
                            >
                                {category.rp_category_name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles['subcategories-grid']}>
                    {filteredSubcategories.map((subcategory) => (
                        <div
                            key={subcategory.subcategory_id}
                            className={styles['subcategory-card']}
                        >
                            <div className={styles['subcategory-image-container']}>
                                <img
                                    src={`http://localhost:3000/images/${subcategory.subcategory_image}`}
                                    alt={subcategory.subcategory_image}
                                    className={styles['subcategory-image']}
                                    onError={(e) => {
                                        e.target.src = 'http://localhost:3000/images/placeholder.jpg';
                                    }}
                                />
                            </div>
                            <h3 className={styles['subcategory-title']}>
                                {subcategory.subcategory_name}
                            </h3>
                            <p className={styles['subcategory-price']}>
                                ₹{subcategory.price_per_kg}/Kg
                            </p>
                        </div>
                    ))}
                </div>

                {error && (
                    <div className={styles['error-message']}>
                        {error}
                    </div>
                )}
                {serviceAvailable !== null && (
                    <div className={serviceAvailable ? styles['service-available'] : styles['service-unavailable']}>
                        {serviceAvailable
                            ? 'Service available in your area!'
                            : 'Sorry, service not available in your area.'
                        }
                    </div>
                )}
            </main>
            <ConsumerFooter />
        </div>
    );
};

export default ConsumerHomePage;