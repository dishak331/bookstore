package com.bookstore.users.exceptions;

public class ResourceNotFoundException extends RuntimeException {

	String fieldName;
	String resourceName;
	String fieldVal;
	Integer fieldValue;
	
	public ResourceNotFoundException() {
		
		// TODO Auto-generated constructor stub
	}

	



	public ResourceNotFoundException(String fieldName, String resourceName, Integer fieldValue) {
		super(String.format("%s is not found for %s : %s",fieldName,resourceName,fieldValue));
		this.fieldName = fieldName;
		this.resourceName = resourceName;
		this.fieldValue = fieldValue;
		
	}





	public ResourceNotFoundException(String fieldName, String resourceName, String fieldVal) {
		super(String.format("%s is not found for %s : %s",fieldName,resourceName,fieldVal));
		this.fieldName = fieldName;
		this.resourceName = resourceName;
		this.fieldVal = fieldVal;
	}}

