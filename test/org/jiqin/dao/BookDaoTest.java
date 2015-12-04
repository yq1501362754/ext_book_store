package org.jiqin.dao;

import static org.junit.Assert.*;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.jiqin.model.Book;
import org.junit.Test;

public class BookDaoTest {

	@Test
	public void testAddBook() {
		Book book = new Book();
		book.setAuthor("cjq");
		book.setBookName("C++");
		book.setBrief("aaaaaaaaaaaa");
		book.setPrice(12.00f);
		book.setTypeId(1);
		new BookDao().addBook(book);
	}

	@Test
	public void testGetBook() {
		List list = new BookDao().getBooks();
		System.out.println(list.size());
	}
	
	@Test
	public void testGetBookById() {
		Map m = new BookDao().getBookById(10);
		System.out.println(m);
		//System.out.println(list.size());
	}
}
