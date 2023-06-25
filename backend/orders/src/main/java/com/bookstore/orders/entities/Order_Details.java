package com.bookstore.orders.entities;



import com.bookstore.orders.payloads.BookDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

@Entity
public class Order_Details {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int order_details_id;
	
	@ManyToOne
	@JoinColumn(name="order_id")
	private Orders order;
	
	@NotNull(message="book_id cannot be null")
	private int book_id;
	
	@NotNull
	private int book_qty;
	
	@NotNull
	private double book_price;
	@NotNull
	private double subtotal;
	private String book_image;
	public Order_Details(int order_details_id, Orders order, @NotNull int book_qty, @NotNull double book_price,
			@NotNull double subtotal,String book_image) {
		super();
		this.order_details_id = order_details_id;
		this.order = order;
		this.book_qty = book_qty;
		this.book_price = book_price;
		this.subtotal = subtotal;
		this.book_image = book_image;
	}
	public Order_Details() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getBook_image() {
		return book_image;
	}
	public void setBook_image(String book_image) {
		this.book_image = book_image;
	}
	public int getOrder_details_id() {
		return order_details_id;
	}
	public void setOrder_details_id(int order_details_id) {
		this.order_details_id = order_details_id;
	}
//	public Orders getOrder() {
//		return order;
//	}
	public void setOrder(Orders order) {
		this.order = order;
	}
	public int getBook_id() {
		return book_id;
	}
	
	public void setBook_id(int book) {
		this.book_id = book;
	}
	public int getBook_qty() {
		return book_qty;
	}
	public void setBook_qty(int book_qty) {
		this.book_qty = book_qty;
	}
	public double getBook_price() {
		return book_price;
	}
	public void setBook_price(double book_price) {
		this.book_price = book_price;
	}
	public double getSubtotal() {
		return subtotal;
	}
	public void setSubtotal(double subtotal) {
		this.subtotal = subtotal;
	}
	
	
}
