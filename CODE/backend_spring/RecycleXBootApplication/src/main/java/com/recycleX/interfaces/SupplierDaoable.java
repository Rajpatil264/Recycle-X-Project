package com.recycleX.interfaces;

import java.util.List;

import com.recycleX.entities.Supplier;
import com.recycleX.entities.TrashCategory;
import com.recycleX.entities.TrashSubCategory;
import com.recycleX.models.supplier.SupplierOrder;
import com.recycleX.models.supplier.SupplierOrderItem;
import com.recycleX.models.supplier.SupplierTrashSummary;

public interface SupplierDaoable {
	public List<Supplier> findAllSuppliers();
	public Supplier findSupplierById(int id);
	public int delete(int id);
	public List<SupplierOrder> findAllSupplierOrders(int supplierId);
	public List<SupplierOrderItem> findOrderItemsByOrderId(int orderId);
	public int modifyOrderStatus(int orderId, String status);
	public int modifyPriceBySubcategoryId(int subcategoryId, double newPrice);
	public int saveTrashCategory(TrashCategory trashCategory);
	public int saveTrashSubCategory(TrashSubCategory trashSubCategory);
	
	// Analysis
	public List<SupplierTrashSummary> findMonthlyTrashSummary(int supplierId);
	public List<SupplierTrashSummary> findYearlyTrashSummary(int supplierId);
	public List<SupplierTrashSummary> findMonthlyTrashSummaryForAll();
	public List<SupplierTrashSummary> findYearlyTrashSummaryForAll();
	

}
