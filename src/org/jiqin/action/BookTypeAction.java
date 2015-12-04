package org.jiqin.action;

import java.util.ArrayList;
import java.util.List;

import org.apache.struts2.ServletActionContext;
import org.jiqin.model.Book;
import org.jiqin.model.Booktype;
import org.jiqin.service.BookTypeService;

import com.opensymphony.xwork2.ActionSupport;

public class BookTypeAction extends ActionSupport {
	private List list;
	private int totalCount;
	private BookTypeService bookTypeService;
	private int id;
	private String title;
	private String detail;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	private boolean success;

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}


	public BookTypeAction() {
		this.bookTypeService = new BookTypeService();
	}

	public List getList() {
		return list;
	}

	public void setList(List list) {
		this.list = list;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public String show() {
		this.setList(this.bookTypeService.getBookTypes());
		this.setTotalCount(this.bookTypeService.getBookTypes().size());
		return SUCCESS;
	}

	public String add() {
		Booktype booktype=new Booktype(id,title,detail);
		this.bookTypeService.add(booktype);
		int bookId = this.bookTypeService.getLastBook();
		if (bookId == -1) {
			this.setSuccess(false);
		} else {
			this.setSuccess(true);
			this.setId(bookId);
		}
		return SUCCESS;
	}

}
