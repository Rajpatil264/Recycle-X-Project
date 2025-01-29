package com.recycleX.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recycleX.entities.Consumer;
import com.recycleX.interfaces.ConsumerDaoable;
import com.recycleX.interfaces.ConsumerServiceable;

@Service
public class ConsumerServiceImpl implements ConsumerServiceable {

	@Autowired
	private ConsumerDaoable daoable;
	
	@Override
	public List<Consumer> fetchAllConsumers() {
		return daoable.findAllConsumers();
	}
	@Override
	public Consumer fetchConsumerById(int id) {
		return daoable.findConsumerById(id);
	}

}
