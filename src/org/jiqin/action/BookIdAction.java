package org.jiqin.action;

import java.util.List;
import java.util.Map;

import org.apache.struts2.ServletActionContext;
import org.jiqin.service.BookService;

import com.opensymphony.xwork2.ActionSupport;

public class BookIdAction extends ActionSupport{
	private boolean success;
	private Map data;
	private BookService bookService;
	
	public BookIdAction(){
		this.bookService = new BookService();
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	
	
	public Map getData() {
		return data;
	}
	public void setData(Map data) {
		this.data = data;
	}
	public String execute(){
		int id = Integer.valueOf(ServletActionContext.getRequest().getParameter("bookId"));
		Map m = this.bookService.getBookById(id);
		if(m.size() == 0){
			this.setSuccess(false);
		}else{
			this.setSuccess(true);
			this.setData(m);
		}
		return SUCCESS;
	}
}
