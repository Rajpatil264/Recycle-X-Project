package com.recycleX.daos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.recycleX.entities.Supplier;
import com.recycleX.interfaces.SupplierDaoable;
import com.recycleX.mapper.SupplierRowMapper;

@Repository
public class SupplierDaoImpl implements SupplierDaoable {
		
	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private SupplierRowMapper mapper;
	
	@Override
	public List<Supplier> findAllSuppliers() {
	    String sql = "SELECT supplier_id, first_name, last_name, mobile_number, password, state, city, imageName, pincode, supplier_type, supplier_status, registered_at, last_modified_at " +
	                 "FROM supplier WHERE supplier_status ='Active'";
	    return jdbcTemplate.query(sql, mapper);
	}

	@Override
	public Supplier findSupplierById(int id) {
	    String sql = "SELECT supplier_id, first_name, last_name, mobile_number, password, state, city, imageName, pincode, supplier_type, supplier_status, registered_at, last_modified_at " +
	                 "FROM supplier WHERE supplier_id = ? AND supplier_status ='Active'";
	    return jdbcTemplate.queryForObject(sql, mapper, id);
	}


}
