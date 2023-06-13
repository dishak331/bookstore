package com.bookstore.users.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.users.entitites.Users;
import com.bookstore.users.services.UserService;

import jakarta.validation.Valid;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/login")
	public Users login(@RequestBody Users user) throws Exception {
		return this.userService.login(user);
	}
	
	@PostMapping("/register")
	public Users register(@Valid @RequestBody Users user) throws Exception {
		return this.userService.register(user);
	}
	
	@PutMapping("/users")
	public Users updateDetails(@Valid @RequestBody Users user) throws Exception {
		return this.userService.updateDetails(user);
	}
	
	@GetMapping("/users/{user_id}")
	public Users getDetails(@PathVariable String user_id){
		return this.userService.getDetails(Integer.parseInt(user_id));
	}
}
