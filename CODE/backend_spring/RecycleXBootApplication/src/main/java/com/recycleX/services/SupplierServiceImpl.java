package com.recycleX.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recycleX.entities.Supplier;
import com.recycleX.entities.TrashCategory;
import com.recycleX.entities.TrashSubCategory;
import com.recycleX.interfaces.SupplierDaoable;
import com.recycleX.interfaces.SupplierServiceable;
import com.recycleX.models.supplier.SupplierOrder;
import com.recycleX.models.supplier.SupplierOrderItem;
import com.recycleX.models.supplier.SupplierTrashSummary;

@Service
public class SupplierServiceImpl implements SupplierServiceable {

	@Autowired
	private SupplierDaoable daoable;
	
	@Override
	public List<Supplier> fetchAllSuppliers() {
		return daoable.findAllSuppliers();
	}

	@Override
	public Supplier fetchSupplierById(int id) {
		return daoable.findSupplierById(id);
	}

	@Override
	public int deleteSupplier(int id) {
		return daoable.delete(id);
	}

	@Override
	public List<SupplierOrder> getAllOrders(int supplierId) {
		return daoable.findAllSupplierOrders(supplierId);
	}

	@Override
	public List<SupplierOrderItem> getOrderItemsByOrderId(int orderId) {
		return daoable.findOrderItemsByOrderId(orderId);
	}

	@Override
	public List<SupplierTrashSummary> getMonthlyTrashSummary(int supplierId) {
		return daoable.findMonthlyTrashSummary(supplierId);
	}

	@Override
	public List<SupplierTrashSummary> getYearlyTrashSummary(int supplierId) {
		return daoable.findYearlyTrashSummary(supplierId);
	}

	@Override
	public List<SupplierTrashSummary> getMonthlyTrashSummaryForAll() {
		return daoable.findMonthlyTrashSummaryForAll();
	}

	@Override
	public List<SupplierTrashSummary> getYearlyTrashSummaryForAll() {
		return daoable.findYearlyTrashSummaryForAll();
	}

	@Override
	public int updateOrderStatus(int orderId, String status) {
		return daoable.modifyOrderStatus(orderId,status);
	}

	@Override
	public int updatePriceBySubcategoryId(int subcategoryId, double newPrice) {
		return daoable.modifyPriceBySubcategoryId(subcategoryId,newPrice);
	}

	@Override
	public int addTrashCategory(TrashCategory trashCategory) {
		return daoable.saveTrashCategory(trashCategory);
	}

	@Override
	public int addTrashSubCategory(TrashSubCategory trashSubCategory) {
		return daoable.saveTrashSubCategory(trashSubCategory);
	}

}
