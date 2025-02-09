import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './UserTypeSelection.module.css';
import { FaInfoCircle } from 'react-icons/fa';
import SupplierIcon from '../assets/icons/supplier.png';
import ConsumerIcon from '../assets/icons/consumer.png';

const UserTypeSelection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true);
        }, 100);
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 position-relative">
            {/* Help Button */}
            <div
                className={`${styles.helpButton}`}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <FaInfoCircle className={styles.helpIcon} />
                <span className={styles.helpText}>Help</span>

                {/* Tooltip */}
                {showTooltip && (
                    <div className={styles.tooltip}>
                        <h6>Supplier</h6>
                        <p>A supplier provides recyclable waste materials.</p>
                        <p>They help sustainability by ensuring waste is collected and processed.</p>
                        <p>At RecycleX, suppliers sell waste for reuse.</p>
                        <hr />
                        <h6>Consumer</h6>
                        <p>A consumer buys high-quality recycled materials.</p>
                        <p>They use recyclables for manufacturing and production.</p>
                        <p>At RecycleX, consumers support the circular economy.</p>
                    </div>
                )}
            </div>

            {/* Main Container */}
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card-group">
                            {/* Supplier Card */}
                            <div className={`card ${styles.userTypeContainer} ${isVisible ? styles.visible : ''} ${styles.spacedCard} ${styles.ratioCard}`}>
                                <div className="card-body text-center">
                                    <img src={SupplierIcon} alt="Supplier Icon" className={styles.icon} />
                                    <h5 className="card-title">Supplier</h5>
                                    <p className="card-text">Sell your recyclable waste effortlessly and play a vital role in creating a cleaner, greener environment while earning rewards.</p>
                                    <button className={`btn ${styles.signInButton}`}>Sign In</button><br />
                                    <button className={`btn ${styles.signUpButton}`}>Click here to Sign Up</button>
                                </div>
                            </div>

                            {/* Consumer Card */}
                            <div className={`card ${styles.userTypeContainer} ${isVisible ? styles.visible : ''} ${styles.spacedCard} ${styles.ratioCard}`}>
                                <div className="card-body text-center">
                                    <img src={ConsumerIcon} alt="Consumer Icon" className={styles.icon} />
                                    <h5 className="card-title">Consumer</h5>
                                    <p className="card-text">Get high-quality recycled materials, processed and refined by RecycleX, ready for use in your manufacturing and production needs.</p>
                                    <button className={`btn ${styles.signInButton}`}>Sign In</button><br />
                                    <button className={`btn ${styles.signUpButton}`}>Click here to Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserTypeSelection;
