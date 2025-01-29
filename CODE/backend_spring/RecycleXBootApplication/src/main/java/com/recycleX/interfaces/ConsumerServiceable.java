package com.recycleX.interfaces;

import java.util.List;

import com.recycleX.entities.Consumer;

public interface ConsumerServiceable {
	public List<Consumer> fetchAllConsumers();
	public Consumer fetchConsumerById(int id);
}
