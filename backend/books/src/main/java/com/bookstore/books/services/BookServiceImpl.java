package com.bookstore.books.services;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.bookstore.books.dao.BookDao;
import com.bookstore.books.entities.Books;
import com.bookstore.books.exceptions.ResourceNotFoundException;
import com.bookstore.books.payloads.ReviewDto;


@Service
public class BookServiceImpl implements BookService {
	@Autowired
	private BookDao bookDao;
	@Autowired
	private RestTemplate restTemplate;
	@Autowired
	private ModelMapper modelMapper;
	
	public BookServiceImpl() {
//		list=new ArrayList<>();
	}
	
	public BookServiceImpl(BookDao bookDao) {
		this.bookDao = bookDao;
	}

	@Override
	public List<Books> getBooks(){
		
		return bookDao.findAll();
	}
	
	@Override
	public Books getBook(int book_id) {
		
		Books book =  bookDao.findById(book_id).orElseThrow(()-> new ResourceNotFoundException("bookId", "Book", book_id));
		try {
		List<Object> forObject = this.restTemplate.getForObject("http://localhost:9003/reviews/books/"+book_id, List.class);
		List<ReviewDto> reviews = new ArrayList<>();
		forObject.forEach((obj)->{
			ReviewDto rev = this.modelMapper.map(obj,ReviewDto.class);
			reviews.add(rev);
			
		});
		book.setReviews(reviews);
		} catch(Exception e) {
			book.setReviews(new ArrayList<>());
		}
		
//		book.setReviews(reviews);
		return book;
	}
	
	@Override
	public Books addBook(Books book) {
	
		book.setTotal_reviews(0);
		book.setAverage_reviews(0);
		book.setOut_of_stock("no");
		 bookDao.save(book);
		 return book;
		}
	
	@Override
	public Books updateBook(Books book) {
		bookDao.save(book);
		return book;
	}
	}


