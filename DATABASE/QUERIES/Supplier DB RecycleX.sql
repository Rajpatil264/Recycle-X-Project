-- Supplier Table
CREATE TABLE Supplier (
    supplier_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    mobile_number VARCHAR(15) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    state VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    pincode CHAR(6) NOT NULL,
    supplier_type ENUM('Individual', 'Organization', 'Government') NOT NULL DEFAULT 'Individual',
    
    -- Maintaining the logs of Operations
    registered_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP  INVISIBLE,
    last_modified_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP INVISIBLE,
    last_modified_by VARCHAR(255)  DEFAULT (CURRENT_USER) INVISIBLE,

    -- Extra column for future use
    extra_col1 VARCHAR(255)  DEFAULT NULL INVISIBLE,
    extra_col2 VARCHAR(255)  DEFAULT NULL INVISIBLE,
    extra_col3 VARCHAR(255)  DEFAULT NULL INVISIBLE,
    extra_col4 VARCHAR(255)  DEFAULT NULL INVISIBLE,
    extra_col5 VARCHAR(255)  DEFAULT NULL INVISIBLE
);

-- Indexes on the Supplier Table
CREATE INDEX idx_supplier_first_name ON Supplier (first_name);

-- ServiceZones table (Common for both Supplier & Consumer)
CREATE TABLE ServiceZones (
    pincode VARCHAR(10) PRIMARY KEY,
    state VARCHAR(100) NOT NULL UNIQUE,
    city VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    service_type ENUM('Delivery', 'Pickup', 'Both') NOT NULL
);


-- Trash Categories Table
CREATE TABLE TrashCategories (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL UNIQUE,
    category_description TEXT NOT NULL,

    -- Maintaining the logs of Operations
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP INVISIBLE,
    last_modified_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP INVISIBLE,
    last_modified_by VARCHAR(255)  NOT NULL DEFAULT (CURRENT_USER) INVISIBLE,

    -- Extra column for future use
    extra_col1 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col2 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col3 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col4 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col5 VARCHAR(255) DEFAULT NULL INVISIBLE
);

-- Trash Sub-Categories Table
CREATE TABLE TrashSubCategories (
    subcategory_id INT PRIMARY KEY,
    category_id INT NOT NULL,
    subcategory_name VARCHAR(255) NOT NULL UNIQUE,
    price_per_kg FLOAT NOT NULL,
    category_description TEXT NOT NULL,

    -- Maintaining the logs of Operations    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP INVISIBLE,
    last_modified_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP INVISIBLE,
    last_modified_by VARCHAR(255)  NOT NULL DEFAULT (CURRENT_USER) INVISIBLE,

    -- Extra column for future use
    extra_col1 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col2 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col3 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col4 VARCHAR(255) DEFAULT NULL INVISIBLE,
    extra_col5 VARCHAR(255) DEFAULT NULL INVISIBLE,

    -- Foreign key 
    FOREIGN KEY (category_id) REFERENCES TrashCategories(category_id)
);


-- (Many to Many Relationship table) Supplier & Categories
CREATE TABLE SupplierSelections (
    selection_id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_id INT NOT NULL,
    category_id INT NOT NULL,
  
    -- Foreign key 
    FOREIGN KEY (supplier_id) REFERENCES Supplier(supplier_id),
    FOREIGN KEY (category_id) REFERENCES TrashCategories(category_id)
);

-- Supplier Order table
CREATE TABLE SupplierOrders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_id INT NOT NULL,
    order_date DATE NOT NULL,
    order_time TIME NOT NULL,
    order_status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',

    -- Maintaining the logs of Operations   
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP INVISIBLE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP INVISIBLE,

    -- Foreign key 
    FOREIGN KEY (supplier_id) REFERENCES Supplier(supplier_id)
);

-- Order Item table
CREATE TABLE OrderItems (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    subcategory_id INT NOT NULL,

    -- Quantity must be greater than 1Kg
    quantity_kg FLOAT NOT NULL CHECK(quantity_kg > 1),
   
    -- Foreign key 
    FOREIGN KEY (order_id) REFERENCES SupplierOrders(order_id),
    FOREIGN KEY (subcategory_id) REFERENCES TrashSubCategories(subcategory_id)
);

-- Pickup Address for each order
CREATE TABLE PickupAddress (
    order_id INT PRIMARY KEY,
    supplier_name VARCHAR(255) NOT NULL,
    state VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    street_name VARCHAR(255),
    landmark VARCHAR(255),

    -- Maintaining the logs of Operations   
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP INVISIBLE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP INVISIBLE,

    -- Foreign key 
    FOREIGN KEY (order_id) REFERENCES SupplierOrders(order_id)
);

-- View for Supplier Table
CREATE VIEW Supplier_v AS
SELECT 
    supplier_id,
    first_name,
    last_name,
    mobile_number,
    password,
    state,
    city,
    pincode,
    supplier_type
FROM Supplier;

-- View for ServiceZones Table
CREATE VIEW ServiceZones_v AS
SELECT 
    pincode,
    state,
    city,
    district,
    service_type
FROM ServiceZones;

-- View for TrashCategories Table
CREATE VIEW TrashCategories_v AS
SELECT 
    category_id,
    category_name,
    category_description
FROM TrashCategories;

-- View for TrashSubCategories Table
CREATE VIEW TrashSubCategories_v AS
SELECT 
    subcategory_id,
    category_id,
    subcategory_name,
    price_per_kg,
    category_description
FROM TrashSubCategories;

-- View for SupplierSelections Table
CREATE VIEW SupplierSelections_v AS
SELECT 
    selection_id,
    supplier_id,
    category_id
FROM SupplierSelections;

-- View for SupplierOrders Table
CREATE VIEW SupplierOrders_v AS
SELECT 
    order_id,
    supplier_id,
    order_date,
    order_time,
    order_status
FROM SupplierOrders;

-- View for OrderItems Table
CREATE VIEW OrderItems_v AS
SELECT 
    item_id,
    order_id,
    subcategory_id,
    quantity_kg
FROM OrderItems;

-- View for PickupAddress Table
CREATE VIEW PickupAddress_v AS
SELECT 
    order_id,
    supplier_name,
    state,
    city,
    pincode,
    street_name,
    landmark
FROM PickupAddress;
 