package com.recycleX.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.recycleX.interfaces.ConsumerServiceable;
import com.recycleX.models.ResponseStructure;
import com.recycleX.entites.Consumer;

import java.util.List;

@RestController
@CrossOrigin
public class ConsumerController {

	@Autowired
	private ConsumerServiceable serviceable;

	@GetMapping(value = "/admin/consumer", produces = "application/json")
	public ResponseStructure getAllConsumers() {
		List<Consumer> consumers = serviceable.fetchAllConsumers();
		if (consumers != null && !consumers.isEmpty()) {
			return ResponseStructure.onSuccess(200, consumers, "Consumers fetched successfully.");
		} else {
			return ResponseStructure.onError(404, consumers, "No consumers found.");
		}
	}

	@GetMapping(value = "/admin/consumer/{email}", produces = "application/json")
	public ResponseStructure getSupplierByEmail(@PathVariable("email") String email) {
		Consumer consumer = serviceable.fetchConsumerByEmail(email);
		if (consumer != null) {
			return ResponseStructure.onSuccess(200, consumer, "Consumer retrieved successfully.");
		} else {
			return ResponseStructure.onError(404, null, "Consumer not found for email: " + email);
		}
	}

}
