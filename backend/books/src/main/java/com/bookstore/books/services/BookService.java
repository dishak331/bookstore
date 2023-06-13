package com.bookstore.books.services;

import java.util.List;

import com.bookstore.books.entities.Books;

public interface BookService {
	public List<Books> getBooks();
	public Books getBook(int book_id);
	public Books addBook(Books book);
	public Books updateBook(Books book);
}
