package com.bookstore.orders.entities;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


import com.bookstore.orders.payloads.UserDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;

@Entity
public class Orders {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int order_id;
	
	private LocalDateTime order_date;
	@NotNull(message="User_id cannot be null")
	private int user_id;
	private String is_delivered;
	private LocalDateTime shipping_date;
	@NotNull(message="total cannot be null")
	private double total;
	
	@OneToMany(mappedBy = "order",cascade = CascadeType.ALL)
	@JsonIgnoreProperties("order")
	List<Order_Details> order_details = new ArrayList<>();
	
	

	public Orders(int order_id, LocalDateTime dateTime, int user_id, String is_delivered, LocalDateTime dateTime2,
			@NotNull(message = "total cannot be null") double total, List<Order_Details> order_details) {
		super();
		this.order_id = order_id;
		this.order_date = dateTime;
		this.user_id = user_id;
		this.is_delivered = is_delivered;
		this.shipping_date = dateTime2;
		this.total = total;
		this.order_details = order_details;
	}
	
	

	public Orders() {
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

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user) {
		this.user_id = user;
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

	public List<Order_Details> getOrder_details() {
		return order_details;
	}

	public void setOrder_details(List<Order_Details> order_details) {
		this.order_details = order_details;
	}
	

	
	
	
	
}
