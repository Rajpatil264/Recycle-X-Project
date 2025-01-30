package com.recycleX.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.recycleX.entities.Supplier;
import com.recycleX.entities.TrashCategory;
import com.recycleX.entities.TrashSubCategory;
import com.recycleX.interfaces.SupplierServiceable;
import com.recycleX.models.ResponseStructure;
import com.recycleX.models.supplier.SupplierOrder;
import com.recycleX.models.supplier.SupplierOrderItem;
import com.recycleX.models.supplier.SupplierTrashSummary;

@RestController
@CrossOrigin
@RequestMapping("/admin/supplier")
public class SupplierAdminController {

	@Autowired
	private SupplierServiceable serviceable;

	@GetMapping(value = "/", produces = "application/json")
	public ResponseStructure getAllSuppliers() {
		List<Supplier> suppliers = serviceable.fetchAllSuppliers();
		if (!suppliers.isEmpty()) {
			return ResponseStructure.onSuccess(200, suppliers, "Suppliers fetched successfully");
		} else {
			return ResponseStructure.onError(404, null, "No suppliers found");
		}
	}

	@GetMapping(value = "/{id}", produces = "application/json")
	public ResponseStructure getSupplierById(@PathVariable("id") int id) {
		Supplier supplier = serviceable.fetchSupplierById(id);
		if (supplier != null) {
			return ResponseStructure.onSuccess(200, supplier, "Supplier fetched successfully");
		} else {
			return ResponseStructure.onError(404, null, "Supplier not found");
		}
	}

	@DeleteMapping(value = "/{id}", produces = "application/json")
	public ResponseStructure supplierDelete(@PathVariable int id) {
		int status = serviceable.deleteSupplier(id);
		if (status > 0) {
			return ResponseStructure.onSuccess(200, status, "Supplier deleted successfully");
		} else {
			return ResponseStructure.onError(404, status, "Supplier not found");
		}
	}

	@GetMapping(value = "/orders/{supplierId}", produces = "application/json")
	public ResponseStructure supplierAllOrders(@PathVariable int supplierId) {
		List<SupplierOrder> supplierOrders = serviceable.getAllOrders(supplierId);
		if (!supplierOrders.isEmpty()) {
			return ResponseStructure.onSuccess(200, supplierOrders, "Suppliers Orders fetched successfully");
		} else {
			return ResponseStructure.onError(404, supplierOrders, "No Suppliers Orders found");
		}
	}

	@GetMapping(value = "/orderItems/{orderId}", produces = "application/json")
	public ResponseStructure supplierOrderItems(@PathVariable int orderId) {
		List<SupplierOrderItem> orderItems = serviceable.getOrderItemsByOrderId(orderId);

		if (!orderItems.isEmpty()) {
			return ResponseStructure.onSuccess(200, orderItems, "Supplier order items fetched successfully");
		} else {
			return ResponseStructure.onError(404, null, "No supplier order items found for the given order ID");
		}
	}

	@PatchMapping("/updateOrderStatus/{orderId}")
	public ResponseStructure supplierOrderStatus(@PathVariable int orderId, @RequestParam String status) {
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

	@PostMapping(value = "/addTrashCategory", produces = "application/json")
	public ResponseStructure addTrashCategory(@RequestParam("categoryName") String categoryName,
			@RequestParam("categoryDescription") String categoryDescription,
			@RequestParam("categoryImage") MultipartFile categoryImage) {
		try {
			TrashCategory trashCategory = new TrashCategory(0, categoryName, categoryDescription, categoryImage);
			int status = serviceable.addTrashCategory(trashCategory);
			return ResponseStructure.onSuccess(200, status, "Trash Category added successfully.");
		} catch (Exception e) {
			return ResponseStructure.onError(500, null, "Error occurred while uploading the image.");
		}
	}

	@PostMapping(value = "/addTrashSubcategory", produces = "application/json")
	public ResponseStructure addTrashSubcategory(@RequestParam("categoryId") int categoryId,
	                                             @RequestParam("subcategoryName") String subcategoryName,
	                                             @RequestParam("pricePerKg") float pricePerKg,
	                                             @RequestParam("subcategoryImage") MultipartFile subcategoryImage) {
	    try {
	        TrashSubCategory trashSubCategory = new TrashSubCategory(0, categoryId, subcategoryName, pricePerKg, subcategoryImage);
	        int status = serviceable.addTrashSubCategory(trashSubCategory);
	        return ResponseStructure.onSuccess(200, status, "Trash Subcategory added successfully.");
	    } catch (Exception e) {
	        return ResponseStructure.onError(500, null, "Error occurred while uploading the image.");
	    }
	}

	
	@GetMapping("/monthlyTrash/{supplierId}")
	public ResponseStructure getMonthlyTrash(@PathVariable int supplierId) {
		List<SupplierTrashSummary> data = serviceable.getMonthlyTrashSummary(supplierId);
		if (!data.isEmpty()) {
			return ResponseStructure.onSuccess(200, data, "Monthly trash summary fetched successfully.");
		} else {
			return ResponseStructure.onError(404, null, "No monthly trash data found for the supplier.");
		}
	}

	@GetMapping("/yearlyTrash/{supplierId}")
	public ResponseStructure getYearlyTrash(@PathVariable int supplierId) {
		List<SupplierTrashSummary> data = serviceable.getYearlyTrashSummary(supplierId);
		if (!data.isEmpty()) {
			return ResponseStructure.onSuccess(200, data, "Yearly trash summary fetched successfully.");
		} else {
			return ResponseStructure.onError(404, null, "No yearly trash data found for the supplier.");
		}
	}

	@GetMapping("/monthlyTrashAll")
	public ResponseStructure getMonthlyTrashForAll() {
		List<SupplierTrashSummary> data = serviceable.getMonthlyTrashSummaryForAll();
		if (!data.isEmpty()) {
			return ResponseStructure.onSuccess(200, data,
					"Monthly trash summary for all suppliers fetched successfully.");
		} else {
			return ResponseStructure.onError(404, null, "No data found for monthly trash summary.");
		}
	}

	@GetMapping("/yearlyTrashAll")
	public ResponseStructure getYearlyTrashForAll() {
		List<SupplierTrashSummary> data = serviceable.getYearlyTrashSummaryForAll();
		if (!data.isEmpty()) {
			return ResponseStructure.onSuccess(200, data,
					"Yearly trash summary for all suppliers fetched successfully.");
		} else {
			return ResponseStructure.onError(404, null, "No data found for yearly trash summary.");
		}
	}
}
