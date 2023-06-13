package com.bookstore.books.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.bookstore.books.payloads.ApiResponse;


@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException ex){
		Map<String, String> errors = new HashMap<>();
		
		ex.getBindingResult().getAllErrors().forEach(err->{
			String field = ((FieldError)err).getField();
			String message = err.getDefaultMessage();
			errors.put(field, message);
		});
		
		return errors;
	}
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResponse> resourceNotFoundHandler(ResourceNotFoundException ex){
		ApiResponse response = new ApiResponse(ex.getMessage(),false);
		return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(InvalidCredentialsException.class)
	public ResponseEntity<ApiResponse> invalidCredientialHandler(InvalidCredentialsException ex){
		ApiResponse response = new ApiResponse(ex.getMessage(),false);
		return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
	}
}
