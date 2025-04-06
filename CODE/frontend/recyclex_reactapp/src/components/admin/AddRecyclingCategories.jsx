import React, { useState, useEffect } from "react";
import styles from "../../styles/adminStyles/AddRecyclingCategories.module.css";

const AddRecyclingCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryForm, setCategoryForm] = useState({
    categoryName: "",
    categoryDescription: "",
    categoryImage: null,
  });

  const [subcategoryForm, setSubcategoryForm] = useState({
    categoryId: "",
    pricePerKg: "",
    subcategoryImage: null,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/common/getAllRecyclingCategories"
      );
      const data = await response.json();

      // Ensure data is always an array
      const normalized = Array.isArray(data) ? data : [];
      setCategories(normalized);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]); // fallback
    }
  };

  const handleCategoryChange = (e) => {
    const { name, value, files } = e.target;
    setCategoryForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubcategoryChange = (e) => {
    const { name, value, files } = e.target;
    setSubcategoryForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryName", categoryForm.categoryName);
    formData.append("categoryDescription", categoryForm.categoryDescription);
    if (categoryForm.categoryImage) {
      formData.append("categoryImage", categoryForm.categoryImage);
    }

    try {
      const response = await fetch(
        "http://localhost:8080/admin/consumer/addRecyclingCategory",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      if (response.ok) {
        alert("Category added!");
        setCategoryForm({
          categoryName: "",
          categoryDescription: "",
          categoryImage: null,
        });
        fetchCategories();
      } else {
        alert(result.message || "Failed to add category.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubcategorySubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryId", subcategoryForm.categoryId);
    formData.append("pricePerKg", subcategoryForm.pricePerKg);
    if (subcategoryForm.subcategoryImage) {
      formData.append("subcategoryImage", subcategoryForm.subcategoryImage);
    }

    try {
      const response = await fetch(
        "http://localhost:8080/admin/consumer/addRecyclingSubCategory",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      if (response.ok) {
        alert("Subcategory added!");
        setSubcategoryForm({
          categoryId: "",
          pricePerKg: "",
          subcategoryImage: null,
        });
      } else {
        alert(result.message || "Failed to add subcategory.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.trashCategoriesContainer}>
      {/* CATEGORY FORM */}
      <section className={styles.categorySection}>
        <h2>Add Recycling Category</h2>
        <form onSubmit={handleCategorySubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Category Name</label>
            <input
              name="categoryName"
              value={categoryForm.categoryName}
              onChange={handleCategoryChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Category Description</label>
            <input
              name="categoryDescription"
              value={categoryForm.categoryDescription}
              onChange={handleCategoryChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Category Image</label>
            <input
              type="file"
              name="categoryImage"
              onChange={handleCategoryChange}
              accept="image/*"
            />
          </div>
          <button type="submit" className={styles.btn}>
            Add Category
          </button>
        </form>
      </section>

      {/* SUBCATEGORY FORM */}
      <section className={styles.subcategorySection}>
        <h2>Add Recycling Subcategory</h2>
        <form onSubmit={handleSubcategorySubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Select Category</label>
            <select
              name="categoryId"
              value={subcategoryForm.categoryId}
              onChange={handleSubcategoryChange}
              required
            >
              <option value="">-- Select --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Price per Kg</label>
            <input
              type="number"
              name="pricePerKg"
              value={subcategoryForm.pricePerKg}
              onChange={handleSubcategoryChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Subcategory Image</label>
            <input
              type="file"
              name="subcategoryImage"
              onChange={handleSubcategoryChange}
              accept="image/*"
            />
          </div>
          <button type="submit" className={styles.btn}>
            Add Subcategory
          </button>
        </form>
      </section>
    </div>
  );
};

export default AddRecyclingCategories;
