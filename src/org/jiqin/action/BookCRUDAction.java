package org.jiqin.action;

import java.util.ArrayList;
import java.util.List;

import org.apache.struts2.ServletActionContext;
import org.jiqin.model.Book;
import org.jiqin.service.BookService;

import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class BookCRUDAction extends ActionSupport {
	private String author;
	private String bookName;
	private Integer bookTypeId;
	private Float price;
	private String brief;
	private Integer id;

	private boolean success;
	private int bookId;
	private BookService bookService;

	public BookCRUDAction() {
		this.bookService = new BookService();
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public Integer getBookTypeId() {
		return bookTypeId;
	}

	public void setBookTypeId(Integer bookTypeId) {
		this.bookTypeId = bookTypeId;
	}

	public Float getPrice() {
		return price;
	}

	public void setPrice(Float price) {
		this.price = price;
	}

	public String getBrief() {
		return brief;
	}

	public void setBrief(String brief) {
		this.brief = brief;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public int getBookId() {
		return bookId;
	}

	public void setBookId(int bookId) {
		this.bookId = bookId;
	}

	public String add() {
		Book book = new Book();
		book.setAuthor(author);
		book.setBookName(bookName);
		book.setBrief(brief);
		book.setPrice(price);
		book.setTypeId(bookTypeId);
		this.bookService.addBook(book);
		int bookId = this.bookService.getLastBook();
		if (bookId == -1) {
			this.setSuccess(false);
		}
		else {
			this.setSuccess(true);
			this.setBookId(bookId);
		}
		return SUCCESS;
	}

	public String modify() {
		Book book = new Book();
		book.setAuthor(author);
		book.setBookName(bookName);
		book.setBrief(brief);
		book.setPrice(price);
		book.setTypeId(bookTypeId);
		book.setId(id);
		this.success = this.bookService.modify(book);
		this.setBookId(this.getId());
		return SUCCESS;
	}

	public String delete() {
		String bookIds = ServletActionContext.getRequest().getParameter("bookIds");
		String[] ids = bookIds.split("-");
		List list = new ArrayList();
		for (int i = 0; i < ids.length; i++) {
			int id = Integer.valueOf(ids[i]);
			list.add(id);
		}
		this.setSuccess(this.bookService.deleteBooks(list));
		return SUCCESS;
	}
}
