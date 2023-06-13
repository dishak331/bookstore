package com.bookstore.orders.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookstore.orders.entities.Orders;

//import com.example.bookstore.entities.Orders;

public interface OrdersDao extends JpaRepository<Orders, Integer> {
	@Query("select u from Orders u where u.user_id=:user")
	public List<Orders> findByUserId(@Param(value="user") int user_id);
}
