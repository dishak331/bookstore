package com.bookstore.users.entitites;

import java.util.ArrayList;
import java.util.List;

import com.bookstore.users.payloads.OrderDto;
import com.bookstore.users.payloads.ReviewDto;

//import com.example.bookstore.entities.Orders;
//import com.example.bookstore.entities.Reviews;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Users {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int user_id;
	
	@NotBlank(message="Username cannot be blank")
	private String username;
	
	@NotBlank(message="Email cannot be null")
	private String email;
	
	@NotBlank(message="First name cannot be null")
	private String first_name;
	
	private String last_name;
	
	@NotBlank(message="password cannot be null")
	private String password;
	
//	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
//	List<ReviewDto> reviews = new ArrayList<>();
//	
//	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
//	List<OrderDto> order = new ArrayList<>();

	public Users(int user_id, @NotBlank(message = "Username cannot be blank") String username,
			@NotBlank(message = "Email cannot be null") String email,
			@NotBlank(message = "First name cannot be null") String first_name, String last_name,
			@NotBlank(message = "password cannot be null") String password) {
		super();
		this.user_id = user_id;
		this.username = username;
		this.email = email;
		this.first_name = first_name;
		this.last_name = last_name;
		this.password = password;
	}

	public Users() {
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

