package org.jiqin.service;

import java.util.List;

import org.jiqin.dao.BookTypeDao;
import org.jiqin.model.Booktype;


public class BookTypeService {
	
	private BookTypeDao bookTypeDao;
	
	public BookTypeService(){
		this.bookTypeDao = new BookTypeDao();
	}
	
	public List getBookTypes(){
		return this.bookTypeDao.getBooktypes();
	}
	public int add(Booktype booktype){
		int bookId = -1;
		bookTypeDao.addBooktype(booktype);
		bookId = bookTypeDao.getLastBooktype();
		return bookId;
		
	}
	public int getLastBook(){
		return bookTypeDao.getLastBooktype();
	}
	
}
