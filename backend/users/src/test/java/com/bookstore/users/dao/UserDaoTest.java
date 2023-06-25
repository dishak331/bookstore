package com.bookstore.users.dao;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookstore.users.entitites.Users;

@DataJpaTest
public class UserDaoTest  {

	@Autowired
	private UserDao userDao;
	Users user;
	
	@BeforeEach
	void setUp() {
		user = new Users(1,"disha","dishak@gmail.com","Disha","Kapoor","12345678");
		userDao.save(user);
	}
	
	@AfterEach
	void tearDown() {
		user=null;
		userDao.deleteAll();
	}
	
	@Test
	void testFindByEmail_Found() {
		List<Users> users = userDao.findByEmail("dishak@gmail.com");
		assertThat(users.get(0).getPassword()).isEqualTo(user.getPassword());
		
	}
	
	@Test
	void testFindByEmail_NotFound() {
		List<Users> users = userDao.findByEmail("dd.com");
		assertThat(users.isEmpty()).isTrue();
	}
	
	//	@Query("select u from Users u where u.email=:email")
//	List<Users> findByEmail(@Param(value = "email") String email);
}
