package com.bookstore.users.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookstore.users.dao.UserDao;
import com.bookstore.users.entitites.Users;
import com.bookstore.users.exceptions.InvalidCredentialsException;
import com.bookstore.users.exceptions.ResourceNotFoundException;



@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserDao userDao;
	
	public UserServiceImpl() {}
	
	@Override
	public Users login(Users user) throws Exception {
		List<Users> details = userDao.findByEmail(user.getEmail());
				if(details.isEmpty())
			throw new InvalidCredentialsException("user does not exist");
		

		if(details.get(0).getPassword().equals(user.getPassword()))
		return details.get(0);
		
		throw new InvalidCredentialsException("password incorrect");
	}
	
	@Override
	public Users register(Users user) throws Exception {
		List<Users> details = userDao.findByEmail(user.getEmail());
		if(!details.isEmpty())
			throw new InvalidCredentialsException("user already exists");
		userDao.save(user);
		return user;
	}
	
	@Override
	public Users updateDetails(Users user) throws Exception {
		userDao.save(user);
		return user;
		
	}
	
	@Override
	public Users getDetails(int user_id) {
		return userDao.findById(user_id).orElseThrow(()-> new ResourceNotFoundException("userId", "User", user_id));
		
	}
}
