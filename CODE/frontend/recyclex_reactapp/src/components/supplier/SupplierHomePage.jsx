import React from 'react';
import SupplierNavbar from './SupplierNavbar';
import './SupplierHomePage.module.css';

const SupplierHomePage = () => {
    return (
        <div className="supplier-home-page">
            <SupplierNavbar />
            <main className="main-content">
                <h1>Supplier Dashboard</h1>
                <p>Welcome to your supplier dashboard.</p>
                <ul>
                    <li>Project 1</li>
                    <li>Project 2</li>
                    <li>Project 3</li>
                </ul>
            </main>
        </div>
    );
};

export default SupplierHomePage;