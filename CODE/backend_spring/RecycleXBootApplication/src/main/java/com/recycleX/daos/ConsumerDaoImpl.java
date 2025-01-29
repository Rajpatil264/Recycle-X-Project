package com.recycleX.daos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.recycleX.entities.Consumer;
import com.recycleX.interfaces.ConsumerDaoable;
import com.recycleX.mapper.ConsumerRowMapper;

@Repository
public class ConsumerDaoImpl implements ConsumerDaoable {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private ConsumerRowMapper mapper;

	@Override
	public List<Consumer> findAllConsumers() {
		String sql = "SELECT consumer_id, first_name, last_name, email, mobile_number, password, state, city, imageName, pincode, consumer_type, consumer_status, registered_at, last_modified_at FROM consumer WHERE consumer_status ='Active'";
		return jdbcTemplate.query(sql, mapper);
	}

	@Override
	public Consumer findConsumerById(int id) {
		String sql = "SELECT consumer_id, first_name, last_name, email, mobile_number, password, state, city, imageName, pincode, consumer_type, consumer_status, registered_at, last_modified_at "
				+ "FROM consumer WHERE consumer_id = ? AND consumer_status ='Active'";
		return jdbcTemplate.queryForObject(sql, mapper, id);
	}

}
