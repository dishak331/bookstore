package com.bookstore.reviews.payloads;

public class BookDto {
	private int book_id;
	private String title;
	private String author;
	private String description;
	private int price;
	private int total_reviews;
	private int average_reviews;
	private String image_url;
	private String out_of_stock;
	


	public BookDto(int book_id, String title,
			 String author, String description,
			 int price, int total_reviews, String image_url,
			String out_of_stock, int average_reviews) {
		super();
		this.book_id = book_id;
		this.title = title;
		this.author = author;
		this.description = description;
		this.price = price;
		this.total_reviews = total_reviews;
		this.image_url = image_url;
		this.out_of_stock = out_of_stock;
		
		this.average_reviews=average_reviews;
	}


	public BookDto() {
		super();
		// TODO Auto-generated constructor stub
	}


	public int getBook_id() {
		return book_id;
	}


	public void setBook_id(int book_id) {
		this.book_id = book_id;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getAuthor() {
		return author;
	}


	public void setAuthor(String author) {
		this.author = author;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public int getPrice() {
		return price;
	}


	public void setPrice(int price) {
		this.price = price;
	}


	public int getTotal_reviews() {
		return total_reviews;
	}
	
	public void setAverage_reviews(int average_reviews) {
		this.average_reviews = average_reviews;
	}
	
	public int getAverage_reviews() {
		return average_reviews;
	}


	public void setTotal_reviews(int total_reviews) {
		this.total_reviews = total_reviews;
	}


	public String getImage_url() {
		return image_url;
	}


	public void setImage_url(String image_url) {
		this.image_url = image_url;
	}


	public String getOut_of_stock() {
		return out_of_stock;
	}


	public void setOut_of_stock(String out_of_stock) {
		this.out_of_stock = out_of_stock;
	}
}
