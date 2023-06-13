package com.bookstore.orders.payloads;

public class UserDto {
private int user_id;
	

	private String username;
	

	private String email;

	private String first_name;
	
	private String last_name;
	
	private String password;
	
	

	public UserDto(int user_id, String username,
			 String email,
			 String first_name, String last_name,
			String password) {
		super();
		this.user_id = user_id;
		this.username = username;
		this.email = email;
		this.first_name = first_name;
		this.last_name = last_name;
		this.password = password;
	}

	public UserDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
