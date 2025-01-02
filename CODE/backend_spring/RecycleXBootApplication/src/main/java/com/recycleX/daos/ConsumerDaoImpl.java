package com.recycleX.daos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.recycleX.entites.Consumer;
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
		String sql = "SELECT consumer_id, first_name, last_name, email, mobile_number, password, state, city, imageName, pincode, consumer_type, consumer_status, registered_at, last_modified_at FROM consumer";
		return jdbcTemplate.query(sql, mapper);
	}

	@Override
	public Consumer findConsumerByEmail(String email) {
		String sql = "SELECT consumer_id, first_name, last_name, email, mobile_number, password, state, city, imageName, pincode, consumer_type, consumer_status, registered_at, last_modified_at "
				+ "FROM consumer WHERE email = ?";
		return jdbcTemplate.queryForObject(sql, mapper, email);

	}

}
