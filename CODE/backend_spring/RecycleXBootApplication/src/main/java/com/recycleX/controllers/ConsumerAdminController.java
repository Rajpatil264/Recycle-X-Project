package com.recycleX.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.recycleX.entities.Consumer;
import com.recycleX.entities.RecyclingCategory;
import com.recycleX.entities.RecyclingSubCategory;
import com.recycleX.interfaces.ConsumerServiceable;
import com.recycleX.models.ResponseStructure;
import com.recycleX.models.consumer.ConsumerOrder;
import com.recycleX.models.consumer.ConsumerOrderItem;
import com.recycleX.models.consumer.ConsumerRecyclingSummary;

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
	 
	 @PostMapping(value = "/addRecyclingCategory", produces = "application/json")
	    public ResponseStructure addRecyclingCategory(@RequestParam("categoryName") String categoryName,
	                                                  @RequestParam("categoryDescription") String categoryDescription,
	                                                  @RequestParam("categoryImage") MultipartFile categoryImage) {
	        try {
	            RecyclingCategory recyclingCategory = new RecyclingCategory(0, categoryName, categoryDescription, categoryImage);
	            int status = serviceable.addRecyclingCategory(recyclingCategory);
	            return ResponseStructure.onSuccess(200, status, "Recycling Category added successfully.");
	        } catch (Exception e) {
	            return ResponseStructure.onError(500, null, "Error occurred while uploading the image.");
	        }
	    }
	 
	 @PostMapping(value = "/addRecyclingSubcategory", produces = "application/json")
	    public ResponseStructure addRecyclingSubCategory(
	            @RequestParam("categoryId") int categoryId,
	            @RequestParam("subcategoryName") String subcategoryName,
	            @RequestParam("pricePerKg") float pricePerKg,
	            @RequestParam("subcategoryImage") MultipartFile subcategoryImage) {
	        try {
	            RecyclingSubCategory recyclingSubcategory = new RecyclingSubCategory(0, categoryId, subcategoryName, pricePerKg, subcategoryImage);
	            int status = serviceable.addRecyclingSubCategory(recyclingSubcategory);
	            return ResponseStructure.onSuccess(200, status, "Recycling Subcategory added successfully.");
	        } catch (Exception e) {
	            return ResponseStructure.onError(500, null, "Error occurred while uploading the image.");
	        }
	    }
	 
	 @GetMapping("/monthlyRecycling/{consumerId}")
	    public ResponseStructure getMonthlyRecycling(@PathVariable int consumerId) {
	        List<ConsumerRecyclingSummary> data = serviceable.getMonthlyRecyclingSummary(consumerId);
	        if (!data.isEmpty()) {
	            return ResponseStructure.onSuccess(200, data, "Monthly recycling summary fetched successfully.");
	        } else {
	            return ResponseStructure.onError(404, null, "No monthly recycling data found for the consumer.");
	        }
	    }

	    @GetMapping("/yearlyRecycling/{consumerId}")
	    public ResponseStructure getYearlyRecycling(@PathVariable int consumerId) {
	        List<ConsumerRecyclingSummary> data = serviceable.getYearlyRecyclingSummary(consumerId);
	        if (!data.isEmpty()) {
	            return ResponseStructure.onSuccess(200, data, "Yearly recycling summary fetched successfully.");
	        } else {
	            return ResponseStructure.onError(404, null, "No yearly recycling data found for the consumer.");
	        }
	    }
	    
	    @GetMapping("/monthlyRecyclingAll")
	    public ResponseStructure getMonthlyRecyclingForAll() {
	        List<ConsumerRecyclingSummary> data = serviceable.getMonthlyRecyclingSummaryForAll();
	        if (!data.isEmpty()) {
	            return ResponseStructure.onSuccess(200, data, 
	                    "Monthly recycling summary for all consumers fetched successfully.");
	        } else {
	            return ResponseStructure.onError(404, null, "No data found for monthly recycling summary.");
	        }
	    }

	    @GetMapping("/yearlyRecyclingAll")
	    public ResponseStructure getYearlyRecyclingForAll() {
	        List<ConsumerRecyclingSummary> data = serviceable.getYearlyRecyclingSummaryForAll();
	        if (!data.isEmpty()) {
	            return ResponseStructure.onSuccess(200, data, 
	                    "Yearly recycling summary for all consumers fetched successfully.");
	        } else {
	            return ResponseStructure.onError(404, null, "No data found for yearly recycling summary.");
	        }
	    }
}
