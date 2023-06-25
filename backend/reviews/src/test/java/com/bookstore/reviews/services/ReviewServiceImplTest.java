package com.bookstore.reviews.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.web.client.RestTemplate;

import com.bookstore.reviews.dao.ReviewDao;
import com.bookstore.reviews.entities.Reviews;
import com.bookstore.reviews.payloads.BookDto;


public class ReviewServiceImplTest {
	@Mock
	private ReviewDao reviewDao;
	@Mock
	private RestTemplate restTemplate;
	@Mock
	private ModelMapper modelMapper;
	private ReviewService reviewService;
	AutoCloseable autocloseable;
	Reviews review;
	BookDto book;
	
	
	@BeforeEach
	void setUp() {
		//close all the resources the moment this class finishes its execution
		autocloseable = MockitoAnnotations.openMocks( this);
		reviewService = new ReviewServiceImpl(reviewDao,restTemplate, modelMapper);
		List<Reviews> reviews = new ArrayList<>();
		book= new BookDto(1,"Harry Porter","J.K. Rowling","very good book",10,0,"www.google.com","no",0);
		book.setAverage_reviews(1);
		book.setTotal_reviews(1);
		review = new Reviews(1,1,5,"very good book",1,"disha");
		
	}
	
	@AfterEach
	void tearDown() throws Exception {
		autocloseable.close();
	}
	
	@Test
	void testGetReviews() throws Exception {
		mock(Reviews.class);
		mock(ReviewDao.class);
		when(reviewDao.findByDetails(1,1)).thenReturn(List.of(review));
		assertThat(reviewService.getReviews(1,1).get(0)).isEqualTo(review);
	}
	
	@Test
	void testGetReviewsByBookId() throws Exception {
		mock(Reviews.class);
		mock(ReviewDao.class);
		when(reviewDao.findByBook(1)).thenReturn(List.of(review));
		assertThat(reviewService.getReviewsByBookId(1).get(0)).isEqualTo(review);
	}
	
	
}
