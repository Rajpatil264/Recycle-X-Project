package com.recycleX.interfaces;

import java.util.List;

import com.recycleX.entities.Supplier;
import com.recycleX.entities.TrashCategory;
import com.recycleX.entities.TrashSubCategory;
import com.recycleX.models.supplier.SupplierOrder;
import com.recycleX.models.supplier.SupplierOrderItem;
import com.recycleX.models.supplier.SupplierTrashSummary;

public interface SupplierServiceable {
	public List<Supplier> fetchAllSuppliers();
	public Supplier fetchSupplierById(int id);
	public int deleteSupplier(int id);
	public List<SupplierOrder> getAllOrders(int supplierId);
	public List<SupplierOrderItem> getOrderItemsByOrderId(int orderId);
	public int updatePriceBySubcategoryId(int subcategoryId, double newPrice);
	public int updateOrderStatus(int orderId, String status);
	public int addTrashCategory(TrashCategory trashCategory);
	public int addTrashSubCategory(TrashSubCategory trashSubCategory);
	
	// Analysis
	public List<SupplierTrashSummary> getMonthlyTrashSummary(int supplierId);
	public List<SupplierTrashSummary> getYearlyTrashSummary(int supplierId);
	public List<SupplierTrashSummary> getMonthlyTrashSummaryForAll();
	public List<SupplierTrashSummary> getYearlyTrashSummaryForAll();
	

}
