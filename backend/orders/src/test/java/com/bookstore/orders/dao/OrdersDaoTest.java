package com.bookstore.orders.dao;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.bookstore.orders.entities.Order_Details;
import com.bookstore.orders.entities.Orders;

@DataJpaTest
public class OrdersDaoTest {
	@Autowired
	private OrdersDao orderDao;
	Orders order;
	
	@BeforeEach
	void setUp() {
		List<Order_Details> details = new ArrayList<>();
		order = new Orders(1,LocalDateTime.now(),1,"yes",LocalDateTime.now(),10.0,details);
		orderDao.save(order);
	}
	
	@AfterEach
	void tearDown() {
		order=null;
		orderDao.deleteAll();
	}
	
	@Test
	void testFindByUserId_Found() {
		List<Orders> orders = orderDao.findByUserId(1);
		assertThat(orders.get(0).getTotal()).isEqualTo(order.getTotal());
		
	}
	
	@Test
	void testFindByEmail_NotFound() {
		List<Orders> orders = orderDao.findByUserId(77);
		assertThat(orders.isEmpty()).isTrue();
	}
}
