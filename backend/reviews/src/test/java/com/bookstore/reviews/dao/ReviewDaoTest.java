package com.bookstore.reviews.dao;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.bookstore.reviews.entities.Reviews;


@DataJpaTest
public class ReviewDaoTest {
	
	@Autowired
	private ReviewDao reviewDao;
	Reviews review;
	
	@BeforeEach
	void setUp() {
		review = new Reviews(1,1,5,"very good book",1,"disha");
		reviewDao.save(review);
	}
	
	@AfterEach
	void tearDown() {
		review=null;
		reviewDao.deleteAll();
	}
	
	@Test
	void testFindByDetails_Found() {
		List<Reviews> reviews = reviewDao.findByDetails(1,1);
		assertThat(reviews.get(0).getRating()).isEqualTo(review.getRating());
		
	}
	
	@Test
	void testFindByDetails_NotFound() {
		List<Reviews> reviews = reviewDao.findByDetails(2,7);
		assertThat(reviews.isEmpty()).isTrue();
	}
	
	@Test
	void testFindByBook_Found() {
		List<Reviews> reviews = reviewDao.findByBook(1);
		assertThat(reviews.get(0).getRating()).isEqualTo(review.getRating());
		
	}
	
	@Test
	void testFindByBook_NotFound() {
		List<Reviews> reviews = reviewDao.findByBook(7);
		assertThat(reviews.isEmpty()).isTrue();
	}
	
}
