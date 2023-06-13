package com.bookstore.orders.services;

import java.util.List;

import com.bookstore.orders.entities.Orders;


public interface OrderService {
	public List<Orders> getOrders();
	public Orders getOrder(int order_id);
	public Orders addOrder(Orders order);
	public List<Orders> getOrdersByUser(int user_id);
}
