package com.recycleX.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recycleX.entities.Supplier;
import com.recycleX.interfaces.SupplierDaoable;
import com.recycleX.interfaces.SupplierServiceable;

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

}
