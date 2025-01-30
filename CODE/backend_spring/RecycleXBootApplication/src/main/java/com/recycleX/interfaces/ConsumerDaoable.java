package com.recycleX.interfaces;

import java.util.List;

import com.recycleX.entities.Consumer;
import com.recycleX.entities.RecyclingCategory;
import com.recycleX.entities.RecyclingSubCategory;
import com.recycleX.models.consumer.ConsumerOrder;
import com.recycleX.models.consumer.ConsumerOrderItem;
import com.recycleX.models.consumer.ConsumerRecyclingSummary;

public interface ConsumerDaoable {
	public List<Consumer> findAllConsumers();

	public Consumer findConsumerById(int id);

	public int delete(int id);

	public List<ConsumerOrder> findAllOrders(int consumerId);

	public List<ConsumerOrderItem> findOrderItemsByOrderId(int orderId);

	public int modifyOrderStatus(int orderId, String status);

	public int modifyPriceBySubcategoryId(int subcategoryId, double price);

	public int saveRecyclingCategory(RecyclingCategory recyclingCategory);

	public int saveRecyclingSubCategory(RecyclingSubCategory recyclingSubcategory);

	// Analysis
	public List<ConsumerRecyclingSummary> findMonthlyRecyclingSummary(int consumerId);

	public List<ConsumerRecyclingSummary> findYearlyRecyclingSummary(int consumerId);

	public List<ConsumerRecyclingSummary> findYearlyRecyclingSummaryForAll();

	public List<ConsumerRecyclingSummary> findMonthlyRecyclingSummaryForAll();
}
