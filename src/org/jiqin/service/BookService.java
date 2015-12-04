package org.jiqin.service;

import java.util.List;
import java.util.Map;

import org.jiqin.dao.BookDao;
import org.jiqin.model.Book;

public class BookService {
	private BookDao bookDao;
	
	public BookService(){
		bookDao = new BookDao();
	}
	public int addBook(Book book){
		int bookId = -1;
		bookDao.addBook(book);
		bookId = bookDao.getLastBook();
		return bookId;
	}

	public List getBooks() {
		return bookDao.getBooks();
	}
	
	public int getLastBook(){
		return bookDao.getLastBook();
	}
	
	public Map getBookById(int id){
		return bookDao.getBookById(id);
	}
	public boolean modify(Book book) {
		return bookDao.modify(book);
	}
	public boolean deleteBooks(List list) {
		return bookDao.deleteBooks(list);
	}
}
