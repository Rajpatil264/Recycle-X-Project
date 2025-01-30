package com.recycleX.interfaces;

import java.util.List;

import com.recycleX.entities.Consumer;
import com.recycleX.models.consumer.ConsumerOrder;
import com.recycleX.models.consumer.ConsumerOrderItem;

public interface ConsumerServiceable {
	public List<Consumer> fetchAllConsumers();
	public Consumer fetchConsumerById(int id);
	public int deleteConsumer(int id);
	public List<ConsumerOrder> getAllOrders(int consumerId);
	public List<ConsumerOrderItem> getOrderItemsByOrderId(int orderId);
	public int updateOrderStatus(int orderId, String status);
	public int updatePriceBySubcategoryId(int subcategoryId, double price);
}
