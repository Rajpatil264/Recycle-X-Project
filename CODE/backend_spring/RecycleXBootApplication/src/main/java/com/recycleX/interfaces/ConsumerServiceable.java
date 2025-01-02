package com.recycleX.interfaces;

import java.util.List;

import com.recycleX.entites.Consumer;

public interface ConsumerServiceable {
	public List<Consumer> fetchAllConsumers();
	public Consumer fetchConsumerByEmail(String email);
}
