package com.bookstore.books.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore.books.entities.Books;

//import com.example.bookstore.entities.Books;

public interface BookDao extends JpaRepository<Books, Integer> {

}
