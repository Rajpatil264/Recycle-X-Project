package com.recycleX.entities;

import org.springframework.web.multipart.MultipartFile;

public class TrashSubCategory {
	private int subcategoryId;
	private int categoryId;
	private String subcategoryName;
	private float pricePerKg;
	private MultipartFile subcategoryImage;
	private String categoryDescription; // ✅ Newly added field

	// ✅ Updated constructor including categoryDescription
	public TrashSubCategory(int subcategoryId, int categoryId, String subcategoryName, float pricePerKg,
			MultipartFile subcategoryImage, String categoryDescription) {
		this.subcategoryId = subcategoryId;
		this.categoryId = categoryId;
		this.subcategoryName = subcategoryName;
		this.pricePerKg = pricePerKg;
		this.subcategoryImage = subcategoryImage;
		this.categoryDescription = categoryDescription;
	}

	// Getters
	public int getSubcategoryId() {
		return subcategoryId;
	}

	public int getCategoryId() {
		return categoryId;
	}

	public String getSubcategoryName() {
		return subcategoryName;
	}

	public float getPricePerKg() {
		return pricePerKg;
	}

	public MultipartFile getSubcategoryImage() {
		return subcategoryImage;
	}

	public String getCategoryDescription() {
		return categoryDescription;
	}

	// Setters
	public void setSubcategoryId(int subcategoryId) {
		this.subcategoryId = subcategoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public void setSubcategoryName(String subcategoryName) {
		this.subcategoryName = subcategoryName;
	}

	public void setPricePerKg(float pricePerKg) {
		this.pricePerKg = pricePerKg;
	}

	public void setSubcategoryImage(MultipartFile subcategoryImage) {
		this.subcategoryImage = subcategoryImage;
	}

	public void setCategoryDescription(String categoryDescription) {
		this.categoryDescription = categoryDescription;
	}

	@Override
	public String toString() {
		return "TrashSubCategory [subcategoryId=" + subcategoryId + ", categoryId=" + categoryId
				+ ", subcategoryName=" + subcategoryName + ", pricePerKg=" + pricePerKg + ", subcategoryImage="
				+ subcategoryImage + ", categoryDescription=" + categoryDescription + "]";
	}
}
