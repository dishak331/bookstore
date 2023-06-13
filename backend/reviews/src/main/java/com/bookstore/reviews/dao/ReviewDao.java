package com.bookstore.reviews.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookstore.reviews.entities.Reviews;

//import com.example.bookstore.entities.Reviews;

public interface ReviewDao extends JpaRepository<Reviews, Integer> 
{
	@Query("select u from Reviews u where u.user_id=:user and u.book_id=:book")
	List<Reviews> findByDetails(@Param(value = "user") int user_id, @Param(value="book") int book_id);
	
	@Query("select u from Reviews u where u.book_id=:book")
	List<Reviews> findByBook(@Param(value="book") int book_id);

}
