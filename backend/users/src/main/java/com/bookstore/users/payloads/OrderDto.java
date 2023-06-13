package com.bookstore.users.payloads;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.bookstore.users.entitites.Users;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;

public class OrderDto {
private int order_id;
	
	private LocalDateTime order_date;
	private Users user;
	private String is_delivered;
	private LocalDateTime shipping_date;
	private double total;
	
	
	
	

	public OrderDto(int order_id, LocalDateTime order_date, Users user, String is_delivered, LocalDateTime shipping_date,
			 double total) {
		super();
		this.order_id = order_id;
		this.order_date = order_date;
		this.user = user;
		this.is_delivered = is_delivered;
		this.shipping_date = shipping_date;
		this.total = total;
	}
	
	

	public OrderDto() {
		super();
		// TODO Auto-generated constructor stub
	}



	public int getOrder_id() {
		return order_id;
	}

	public void setOrder_id(int order_id) {
		this.order_id = order_id;
	}

	public LocalDateTime getOrder_date() {
		return order_date;
	}

	public void setOrder_date(LocalDateTime order_date) {
		this.order_date = order_date;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	public String getIs_delivered() {
		return is_delivered;
	}

	public void setIs_delivered(String is_delivered) {
		this.is_delivered = is_delivered;
	}

	public LocalDateTime getShipping_date() {
		return shipping_date;
	}

	public void setShipping_date(LocalDateTime shipping_date) {
		this.shipping_date = shipping_date;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

//	public List<Order_Details> getOrder_details() {
//		return order_details;
//	}
//
//	public void setOrder_details(List<Order_Details> order_details) {
//		this.order_details = order_details;
//	}
	
}
