package com.recycleX.entites;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Consumer {

    @JsonProperty
    ("consumer_id")
    private int consumerId;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    @JsonProperty
    private String email;

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

    @JsonProperty("consumer_type")
    private String consumerType;

    @JsonProperty("consumer_status")
    private String consumerStatus;

    @JsonProperty("registered_at")
    private Timestamp registeredAt;

    @JsonProperty("last_modified_at")
    private Timestamp lastModifiedAt;

	public Consumer(int consumerId, String firstName, String lastName, String email, String mobileNumber,
			String password, String state, String city, String imageName, String pincode, String consumerType,
			String consumerStatus, Timestamp registeredAt, Timestamp lastModifiedAt) {
		this.consumerId = consumerId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.mobileNumber = mobileNumber;
		this.password = password;
		this.state = state;
		this.city = city;
		this.imageName = imageName;
		this.pincode = pincode;
		this.consumerType = consumerType;
		this.consumerStatus = consumerStatus;
		this.registeredAt = registeredAt;
		this.lastModifiedAt = lastModifiedAt;
	}

	public int getConsumerId() {
		return consumerId;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getEmail() {
		return email;
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

	public String getConsumerType() {
		return consumerType;
	}

	public String getConsumerStatus() {
		return consumerStatus;
	}

	public Timestamp getRegisteredAt() {
		return registeredAt;
	}

	public Timestamp getLastModifiedAt() {
		return lastModifiedAt;
	}

	public void setConsumerId(int consumerId) {
		this.consumerId = consumerId;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public void setConsumerType(String consumerType) {
		this.consumerType = consumerType;
	}

	public void setConsumerStatus(String consumerStatus) {
		this.consumerStatus = consumerStatus;
	}

	public void setRegisteredAt(Timestamp registeredAt) {
		this.registeredAt = registeredAt;
	}

	public void setLastModifiedAt(Timestamp lastModifiedAt) {
		this.lastModifiedAt = lastModifiedAt;
	}

	@Override
	public String toString() {
		return "Consumer [consumerId=" + consumerId + ", firstName=" + firstName + ", lastName=" + lastName + ", email="
				+ email + ", mobileNumber=" + mobileNumber + ", password=" + password + ", state=" + state + ", city="
				+ city + ", imageName=" + imageName + ", pincode=" + pincode + ", consumerType=" + consumerType
				+ ", consumerStatus=" + consumerStatus + ", registeredAt=" + registeredAt + ", lastModifiedAt="
				+ lastModifiedAt + "]";
	}
        
}
