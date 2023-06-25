package com.bookstore.books.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.books.entities.Books;
import com.bookstore.books.services.BookService;
//import com.example.bookstore.entities.Books;

import jakarta.validation.Valid;

@CrossOrigin
@RestController
public class BookController {
	
	@Autowired
	private BookService bookService;
	
	@GetMapping("/books")
	public List<Books> getAllBooks(){
		return this.bookService.getBooks();
	}
	
	@GetMapping("/books/{book_id}")
	public Books getBook(@PathVariable String book_id) {
		return this.bookService.getBook(Integer.parseInt(book_id));
	}
	
	@PostMapping("/books")
	public Books addBook(@Valid @RequestBody Books book) {
		return this.bookService.addBook(book);
	}
	
	@PutMapping("/books")
	public Books updateBook(@Valid @RequestBody Books book) {
		return this.bookService.updateBook(book);
	
}
}
