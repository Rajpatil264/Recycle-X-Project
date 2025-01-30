package com.recycleX.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.recycleX.entities.Consumer;
import com.recycleX.interfaces.ConsumerServiceable;
import com.recycleX.models.ResponseStructure;
import com.recycleX.models.consumer.ConsumerOrder;
import com.recycleX.models.consumer.ConsumerOrderItem;

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
	public ResponseStructure getConsumerById(@PathVariable int id) {
		Consumer consumer = serviceable.fetchConsumerById(id);
		if (consumer != null) {
			return ResponseStructure.onSuccess(200, consumer, "Consumer retrieved successfully.");
		} else {
			return ResponseStructure.onError(404, consumer, "Consumer not found");
		}
	}

	@DeleteMapping(value="/{id}", produces = "application/json")
	public ResponseStructure consumerDelete(@PathVariable("id") int id) {
		int status = serviceable.deleteConsumer(id);
		if (status > 0) {
			return ResponseStructure.onSuccess(200, status, "Consumer deleted successfully.");
		} else {
			return ResponseStructure.onError(404, status, "Consumer not found");
		}
	}
	
	 @GetMapping(value = "/orders/{consumerId}", produces = "application/json")
	    public ResponseStructure consumerAllOrders(@PathVariable int consumerId) {
	        List<ConsumerOrder> consumerOrders = serviceable.getAllOrders(consumerId);
	        if (!consumerOrders.isEmpty()) {
	            return ResponseStructure.onSuccess(200, consumerOrders, "Consumer Orders fetched successfully");
	        } else {
	            return ResponseStructure.onError(404, consumerOrders, "No Consumer Orders found");
	        }
	    }
	 
	 @GetMapping(value = "/orderItems/{orderId}", produces = "application/json")
	    public ResponseStructure consumerOrderItems(@PathVariable int orderId) {
	        List<ConsumerOrderItem> orderItems = serviceable.getOrderItemsByOrderId(orderId);

	        if (!orderItems.isEmpty()) {
	            return ResponseStructure.onSuccess(200, orderItems, "Consumer order items fetched successfully");
	        } else {
	            return ResponseStructure.onError(404, null, "No consumer order items found for the given order ID");
	        }
	    }
	 
	 @PatchMapping("/updateOrderStatus/{orderId}")
	    public ResponseStructure consumerOrderStatus(@PathVariable int orderId, @RequestParam String status) {
	        int result = serviceable.updateOrderStatus(orderId, status);
	        if (result > 0) {
	            return ResponseStructure.onSuccess(200, result, "Order status updated successfully.");
	        } else {
	            return ResponseStructure.onError(404, null, "No matching pending order found or status update failed.");
	        }
	    }
	 
	 @PutMapping("/updatePrice/{subcategoryId}")
	    public ResponseStructure updatePrice(@PathVariable int subcategoryId, @RequestParam double price) {
	        int result = serviceable.updatePriceBySubcategoryId(subcategoryId, price);
	        if (result > 0) {
	            return ResponseStructure.onSuccess(200, null, "Price updated successfully.");
	        } else {
	            return ResponseStructure.onError(404, null, "No subcategory found with the given ID.");
	        }
	    }
}
