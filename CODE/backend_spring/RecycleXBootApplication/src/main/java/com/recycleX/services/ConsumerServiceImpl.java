package com.recycleX.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recycleX.entites.Consumer;
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
	public Consumer fetchConsumerByEmail(String email) {
		return daoable.findConsumerByEmail(email);
	}

}
