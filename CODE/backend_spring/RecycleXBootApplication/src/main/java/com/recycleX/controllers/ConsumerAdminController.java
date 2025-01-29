package com.recycleX.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.recycleX.entities.Consumer;
import com.recycleX.interfaces.ConsumerServiceable;
import com.recycleX.models.ResponseStructure;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/admin/consumer")
public class ConsumerAdminController {

	@Autowired
	private ConsumerServiceable serviceable;

	@GetMapping(value = "/", produces = "application/json")
	public ResponseStructure getAllConsumers() {
		List<Consumer> consumers = serviceable.fetchAllConsumers();
		if (consumers != null && !consumers.isEmpty()) {
			return ResponseStructure.onSuccess(200, consumers, "Consumers fetched successfully.");
		} else {
			return ResponseStructure.onError(404, consumers, "No consumers found.");
		}
	}

	@GetMapping(value = "/{id}", produces = "application/json")
	public ResponseStructure getSupplierByEmail(@PathVariable("id") int id) {
		Consumer consumer = serviceable.fetchConsumerById(id);
		if (consumer != null) {
			return ResponseStructure.onSuccess(200, consumer, "Consumer retrieved successfully.");
		} else {
			return ResponseStructure.onError(404, null, "Consumer not found for email: " + id);
		}
	}

}
