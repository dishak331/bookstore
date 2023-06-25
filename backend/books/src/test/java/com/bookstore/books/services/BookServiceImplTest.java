package com.bookstore.books.services;

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
import org.springframework.web.client.RestTemplate;

import com.bookstore.books.dao.BookDao;
import com.bookstore.books.entities.Books;
import com.bookstore.books.payloads.ReviewDto;



public class BookServiceImplTest {
	@Mock
	private BookDao bookDao;
	@Mock
	private RestTemplate restTemplate;
	private BookService bookService;
	AutoCloseable autocloseable;
	Books book;
	ReviewDto review;
	
	
	@BeforeEach
	void setUp() {
		//close all the resources the moment this class finishes its execution
		autocloseable = MockitoAnnotations.openMocks( this);
		bookService = new BookServiceImpl(bookDao);
		review = new ReviewDto(1,1,5,"very good book",1,"disha");
		List<ReviewDto> reviews = new ArrayList<>();
		book = new Books(1,"Harry Porter","J.K. Rowling","Very good book",23,0,"www.google.com","no",reviews,0);
	
		
	}
	
	@AfterEach
	void tearDown() throws Exception {
		autocloseable.close();
	}
	
	@Test
	void testGetBooks() throws Exception {
		mock(Books.class);
		mock(BookDao.class);
		when(bookDao.findAll()).thenReturn(List.of(book));
		assertThat(bookService.getBooks().get(0)).isEqualTo(book);
		
	}
	
	@Test
	void testGetBook() throws Exception {
		mock(Books.class);
		mock(BookDao.class);
		when(bookDao.findById(1)).thenReturn(Optional.of(book));
		when(restTemplate.getForObject("http://localhost:9003/reviews/books/1", List.class)).thenReturn(List.of(review));
		assertThat(bookService.getBook(1).getTitle()).isEqualTo(book.getTitle());
	}
	
	@Test
	void testAddBook() throws Exception {
		mock(Books.class);
		mock(BookDao.class);
		when(bookDao.save(book)).thenReturn(book);
		assertThat(bookService.addBook(book).getTitle()).isEqualTo(book.getTitle());
	}
	
	@Test
	void testUpdateBook() throws Exception {
		mock(Books.class);
		mock(BookDao.class);
		book.setTitle("Haarryy Porter");
		when(bookDao.save(book)).thenReturn(book);
		assertThat(bookService.updateBook(book).getTitle()).isEqualTo(book.getTitle());
	}
}
