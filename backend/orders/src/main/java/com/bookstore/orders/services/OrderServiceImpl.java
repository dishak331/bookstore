package com.bookstore.orders.services;

import java.time.LocalDateTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.bookstore.orders.dao.OrderDetailsDao;
import com.bookstore.orders.dao.OrdersDao;
import com.bookstore.orders.entities.Order_Details;
import com.bookstore.orders.entities.Orders;
import com.bookstore.orders.exceptions.ResourceNotFoundException;



@Service
public class OrderServiceImpl implements OrderService {
	
	@Autowired
	private OrdersDao orderDao;
	@Autowired
	private OrderDetailsDao orderDetailsDao;
	@Autowired
	private RestTemplate restTemplate;
	@Autowired
	private ModelMapper modelMapper;
	
	public OrderServiceImpl() {
		
	}
	
	@Override
	public List<Orders> getOrders() {
		return orderDao.findAll();
//		orderDao.findAll().forEach((order)->{
//			System.out.println(order.getOrder_details());
//		});
//		return null;
	}
	
	@Override
	public Orders getOrder(int order_id)
	{
		Orders order =  orderDao.findById(order_id).orElseThrow(()-> new ResourceNotFoundException("orderId", "Order", order_id));
		return order;
	}
	
	@Override
	public List<Orders> getOrdersByUser(int user_id){
		List<Orders> orders =  orderDao.findByUserId(user_id);
		if(orders.isEmpty())
			throw new ResourceNotFoundException("userId", "User", user_id);
		return orders;
	}
	
	@Override
	public Orders addOrder(Orders order) {
		order.setOrder_date(LocalDateTime.now());
		order.setShipping_date(LocalDateTime.now());
		order.setIs_delivered("no");
		orderDao.save(order);
		int id=order.getOrder_id();
		
		Orders o = orderDao.getOne(id);
		for(Order_Details details: order.getOrder_details()) {
			
			details.setOrder(o);
			orderDetailsDao.save(details);
			
		}
		
		System.out.println(order.getOrder_details());
		
	
		
		
		return order;
	}
}
