package com.recycleX.interfaces;

import java.util.List;

import com.recycleX.entities.Supplier;

public interface SupplierDaoable {
	public List<Supplier> findAllSuppliers();
	public Supplier findSupplierById(int id);
}
