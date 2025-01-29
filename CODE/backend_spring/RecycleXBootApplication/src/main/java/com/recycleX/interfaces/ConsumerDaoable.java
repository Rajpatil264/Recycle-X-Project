package com.recycleX.interfaces;
import java.util.List;

import com.recycleX.entities.Consumer;

public interface ConsumerDaoable {
	public List<Consumer> findAllConsumers();
	public Consumer findConsumerById(int id);
}
