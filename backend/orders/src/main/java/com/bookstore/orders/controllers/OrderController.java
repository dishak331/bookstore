package com.bookstore.orders.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.orders.entities.Orders;
import com.bookstore.orders.services.OrderService;


@CrossOrigin
@RestController
public class OrderController {
	@Autowired
	private OrderService orderService;
	
	@GetMapping("/orders")
	public List<Orders> getOrders() {
		return this.orderService.getOrders();
	}
	
	@GetMapping("/orders/{order_id}")
	public Orders getOrder(@PathVariable String order_id) {
		return this.orderService.getOrder(Integer.parseInt(order_id));
	}
	
	@GetMapping("/orders/users/{user_id}")
	public List<Orders> getOrdersByUser(@PathVariable int user_id){
		return this.orderService.getOrdersByUser(user_id);
	}
	
	@PostMapping("/orders")
	public Orders addOrder(@RequestBody Orders order) {
		return this.orderService.addOrder(order);
	}
}
