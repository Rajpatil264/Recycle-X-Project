package com.recycleX.entites;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Supplier {
    @JsonProperty("supplier_id")
    private int supplierId;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    @JsonProperty("mobile_number")
    private String mobileNumber;

    @JsonProperty
    private String password;

    @JsonProperty
    private String state;

    @JsonProperty
    private String city;

    @JsonProperty("image_name")
    private String imageName;

    @JsonProperty
    private String pincode;

    @JsonProperty("supplier_type")
    private String supplierType;

    @JsonProperty("supplier_status")
    private String supplierStatus;

    @JsonProperty("registered_at")
    private Timestamp registeredAt;

    @JsonProperty("last_modified_at")
    private Timestamp lastModifiedAt;

	public Supplier(int supplierId, String firstName, String lastName, String mobileNumber, String password,
			String state, String city, String imageName, String pincode, String supplierType, String supplierStatus,
			Timestamp registeredAt, Timestamp lastModifiedAt) {
		this.supplierId = supplierId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.mobileNumber = mobileNumber;
		this.password = password;
		this.state = state;
		this.city = city;
		this.imageName = imageName;
		this.pincode = pincode;
		this.supplierType = supplierType;
		this.supplierStatus = supplierStatus;
		this.registeredAt = registeredAt;
		this.lastModifiedAt = lastModifiedAt;
	}

	public int getSupplierId() {
		return supplierId;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public String getPassword() {
		return password;
	}

	public String getState() {
		return state;
	}

	public String getCity() {
		return city;
	}

	public String getImageName() {
		return imageName;
	}

	public String getPincode() {
		return pincode;
	}

	public String getSupplierType() {
		return supplierType;
	}

	public String getSupplierStatus() {
		return supplierStatus;
	}

	public Timestamp getRegisteredAt() {
		return registeredAt;
	}

	public Timestamp getLastModifiedAt() {
		return lastModifiedAt;
	}

	public void setSupplierId(int supplierId) {
		this.supplierId = supplierId;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setState(String state) {
		this.state = state;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public void setSupplierType(String supplierType) {
		this.supplierType = supplierType;
	}

	public void setSupplierStatus(String supplierStatus) {
		this.supplierStatus = supplierStatus;
	}

	public void setRegisteredAt(Timestamp registeredAt) {
		this.registeredAt = registeredAt;
	}

	public void setLastModifiedAt(Timestamp lastModifiedAt) {
		this.lastModifiedAt = lastModifiedAt;
	}

	@Override
	public String toString() {
		return "Supplier [supplierId=" + supplierId + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", mobileNumber=" + mobileNumber + ", password=" + password + ", state=" + state + ", city=" + city
				+ ", imageName=" + imageName + ", pincode=" + pincode + ", supplierType=" + supplierType
				+ ", supplierStatus=" + supplierStatus + ", registeredAt=" + registeredAt + ", lastModifiedAt="
				+ lastModifiedAt + "]";
	}
    
	
}
