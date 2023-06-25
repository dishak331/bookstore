package com.bookstore.users.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.bookstore.users.dao.UserDao;
import com.bookstore.users.entitites.Users;

public class UserServiceImplTest {
	
	@Mock
	private UserDao userDao;
	private UserService userService;
	AutoCloseable autocloseable;
	Users user;
	
	
	@BeforeEach
	void setUp() {
		//close all the resources the moment this class finishes its execution
		autocloseable = MockitoAnnotations.openMocks( this);
		userService = new UserServiceImpl(userDao);
		user = new Users(1,"disha","dishak@gmail.com","Disha","Kapoor","12345678");
		
	}
	
	@AfterEach
	void tearDown() throws Exception {
		autocloseable.close();
	}
	
	@Test
	void testLogin() throws Exception {
		mock(Users.class);
		mock(UserDao.class);
		when(userDao.findByEmail("dishak@gmail.com")).thenReturn(List.of(user));
		assertThat(userService.login(user).getEmail()).isEqualTo(user.getEmail());
		assertThat(userService.login(user).getPassword()).isEqualTo(user.getPassword());
	}
	
	@Test
	void testRegister() throws Exception {
		mock(Users.class);
		mock(UserDao.class);
		when(userDao.save(user)).thenReturn(user);
		assertThat(userService.register(user)).isEqualTo(user);
	}
	
	@Test
	void testUpdateDetails() throws Exception {
		mock(Users.class);
		mock(UserDao.class);
		when(userDao.save(user)).thenReturn(user);
		assertThat(userService.updateDetails(user)).isEqualTo(user);
	}
	
	@Test
	void testGetDetails() throws Exception {
		mock(Users.class);
		mock(UserDao.class);
		when(userDao.findById(1)).thenReturn(Optional.of(user));
		assertThat(userService.getDetails(1)).isEqualTo(user);
	}
}
