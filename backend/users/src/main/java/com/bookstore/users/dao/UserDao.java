package com.bookstore.users.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookstore.users.entitites.Users;



public interface UserDao extends JpaRepository<Users, Integer> 
{
	
	@Query("select u from Users u where u.email=:email")
	List<Users> findByEmail(@Param(value = "email") String email);
}
