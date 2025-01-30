package com.recycleX.daos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.recycleX.entities.Consumer;
import com.recycleX.interfaces.ConsumerDaoable;
import com.recycleX.mapper.consumer.ConsumerOrderItemRowMapper;
import com.recycleX.mapper.consumer.ConsumerOrderRowMapper;
import com.recycleX.mapper.consumer.ConsumerRowMapper;
import com.recycleX.models.consumer.ConsumerOrder;
import com.recycleX.models.consumer.ConsumerOrderItem;

@Repository
public class ConsumerDaoImpl implements ConsumerDaoable {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private ConsumerRowMapper mapper;

	@Autowired
	private ConsumerOrderRowMapper orderRowMapper;

	@Autowired
	private ConsumerOrderItemRowMapper itemRowMapper;

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

	@Override
	public int delete(int id) {
		String sql = "UPDATE consumer SET consumer_status = 'InActive' WHERE consumer_id = ? ";
		return jdbcTemplate.update(sql, id);
	}

	@Override
	public List<ConsumerOrder> findAllOrders(int consumerId) {
		String sql = "SELECT * FROM consumerorders_v WHERE consumer_id = ?";
		return jdbcTemplate.query(sql, orderRowMapper, consumerId);
	}

	@Override
	public List<ConsumerOrderItem> findOrderItemsByOrderId(int orderId) {
		String sql = "SELECT coi.subcategory_id, ts.subcategory_name, coi.quantity_kg, ts.image_name "
				+ "FROM consumerorderitems_v coi "
				+ "JOIN trashsubcategories_v ts ON coi.subcategory_id = ts.subcategory_id " + "WHERE coi.order_id = ?";
		return jdbcTemplate.query(sql, itemRowMapper, orderId);
	}

	@Override
	public int modifyOrderStatus(int orderId, String status) {
        String sql = "UPDATE consumerorders_v SET order_status = ? WHERE order_id = ? AND order_status = 'pending'";
        return jdbcTemplate.update(sql, status, orderId);
	}

	@Override
	public int modifyPriceBySubcategoryId(int subcategoryId, double price) {
		String sql = "UPDATE recyclingsubcategories_v SET price_per_kg = ? WHERE subcategory_id = ?";
        return jdbcTemplate.update(sql, price, subcategoryId);
	}

}
