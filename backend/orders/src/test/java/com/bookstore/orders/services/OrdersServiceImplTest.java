package com.bookstore.orders.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.bookstore.orders.dao.OrderDetailsDao;
import com.bookstore.orders.dao.OrdersDao;
import com.bookstore.orders.entities.Order_Details;
import com.bookstore.orders.entities.Orders;


public class OrdersServiceImplTest {
	@Mock
	private OrdersDao orderDao;
	@Mock
	private OrderDetailsDao orderDetailsDao;
	private OrderService orderService;
	AutoCloseable autocloseable;
	Orders order;
	Order_Details orderDetails;
	
	
	@BeforeEach
	void setUp() {
		//close all the resources the moment this class finishes its execution
		autocloseable = MockitoAnnotations.openMocks( this);
		orderService = new OrderServiceImpl(orderDao,orderDetailsDao);
		List<Order_Details> details = new ArrayList<>();
		orderDetails = new Order_Details(1,order,2,5.0,10.0);
		details.add(orderDetails);
		order = new Orders(1,LocalDateTime.now(),1,"yes",LocalDateTime.now(),10.0,details);
		
	}
	
	@AfterEach
	void tearDown() throws Exception {
		autocloseable.close();
	}
	
	@Test
	void testGetOrders() throws Exception {
		mock(Orders.class);
		mock(OrdersDao.class);
		when(orderDao.findAll()).thenReturn(List.of(order));
		assertThat(orderService.getOrders().get(0)).isEqualTo(order);
		
	}
	
	@Test
	void testGetOrder() throws Exception {
		mock(Orders.class);
		mock(OrdersDao.class);
		when(orderDao.findById(1)).thenReturn(Optional.of(order));
		assertThat(orderService.getOrder(1)).isEqualTo(order);
	}
	
	@Test
	void testGetOrdersByUser() throws Exception {
		mock(Orders.class);
		mock(OrdersDao.class);
		when(orderDao.findByUserId(1)).thenReturn(List.of(order));
		assertThat(orderService.getOrdersByUser(1).get(0)).isEqualTo(order);
	}
	
	@Test
	void testAddOrder() throws Exception {
		mock(Orders.class);
		mock(OrdersDao.class);		
		
		when(orderDao.save(order)).thenReturn(order);
		
		when(orderDetailsDao.save(orderDetails)).thenReturn(orderDetails);
		
		assertThat(orderService.addOrder(order)).isEqualTo(order);
	}
}
