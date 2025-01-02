package com.recycleX.interfaces;
import java.util.List;

import com.recycleX.entites.Consumer;

public interface ConsumerDaoable {
	public List<Consumer> findAllConsumers();
	public Consumer findConsumerByEmail(String email);
}
