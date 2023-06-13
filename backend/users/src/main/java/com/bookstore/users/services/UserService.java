package com.bookstore.users.services;

import com.bookstore.users.entitites.Users;

public interface UserService {
	public Users login(Users user) throws Exception;
	public Users register(Users user) throws Exception;
	public Users updateDetails(Users user) throws Exception;
	public Users getDetails(int id);
}
