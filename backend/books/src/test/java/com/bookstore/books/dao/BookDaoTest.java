package com.bookstore.books.dao;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.bookstore.books.entities.Books;
import com.bookstore.books.payloads.ReviewDto;



@DataJpaTest
public class BookDaoTest {
	@Autowired
	private BookDao bookDao;
	Books book;
	ReviewDto review;
	
	@BeforeEach
	void setUp() {
		review = new ReviewDto(1,1,5,"very good book",1,"disha");
		List<ReviewDto> reviews = new ArrayList<>();
		book = new Books(1,"Harry Porter","J.K. Rowling","Very good book",23,0,"www.google.com","no",reviews,0);
		bookDao.save(book);
	}
	
	@AfterEach
	void tearDown() {
		book=null;
		review=null;
		bookDao.deleteAll();
	}
	
	
}
