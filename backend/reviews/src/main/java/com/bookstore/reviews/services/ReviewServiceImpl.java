package com.bookstore.reviews.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.bookstore.reviews.dao.ReviewDao;
import com.bookstore.reviews.entities.Reviews;
import com.bookstore.reviews.exceptions.ResourceNotFoundException;
import com.bookstore.reviews.payloads.BookDto;

@Service
public class ReviewServiceImpl implements ReviewService {
	
	@Autowired
	private ReviewDao reviewDao;
	@Autowired
	private RestTemplate restTemplate;
	@Autowired
	private ModelMapper modelMapper;
//	@Autowired
//	private BookDao bookDao;

	@Override
	public List<Reviews> getReviews(int user_id, int book_id) {
		// TODO Auto-generated method stub
		
		 List<Reviews> findByDetails = reviewDao.findByDetails(user_id, book_id);
		if(findByDetails.isEmpty())
			throw new ResourceNotFoundException("Review","book id or user id","userId= "+user_id +" and bookId= "+book_id);
		return findByDetails;
	}
	
	@Override
	public List<Reviews> getReviewsByBookId(int book_id) {
		List<Reviews> findByDetails = reviewDao.findByBook(book_id);
		if(findByDetails.isEmpty())
			throw new ResourceNotFoundException("book", "book_id", book_id);
		return findByDetails;
	}

	@Override
	public Reviews postReview(Reviews review) {
		reviewDao.save(review);
		int id=review.getBook_id();
		System.out.println(id);
		Object forObj = this.restTemplate.getForObject("http://localhost:9002/books/"+id, Object.class);
		System.out.print("/////////////");
		System.out.println(forObj);
		BookDto book = this.modelMapper.map(forObj, BookDto.class);
		
		
		int average = (int)Math.round((book.getAverage_reviews()*book.getTotal_reviews()+review.getRating())/(book.getTotal_reviews()+1));
		book.setAverage_reviews(average);
		book.setTotal_reviews(book.getTotal_reviews()+1);
//		bookDao.save(book);
		this.restTemplate.put("http://localhost:9002/books", book);
		return review;
		
	}

}
