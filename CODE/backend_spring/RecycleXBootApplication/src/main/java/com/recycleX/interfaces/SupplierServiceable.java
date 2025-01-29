package com.recycleX.interfaces;

import java.util.List;

import com.recycleX.entities.Supplier;

public interface SupplierServiceable {
	public List<Supplier> fetchAllSuppliers();
	public Supplier fetchSupplierById(int id);
}
