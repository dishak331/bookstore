package com.bookstore.orders.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore.orders.entities.Order_Details;

//import com.example.bookstore.entities.Order_Details;

public interface OrderDetailsDao extends JpaRepository<Order_Details, Integer> {

}
