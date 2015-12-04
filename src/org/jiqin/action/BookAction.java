package org.jiqin.action;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import net.sf.json.JSONArray;

import org.jiqin.model.Book;
import org.jiqin.service.BookService;

import com.opensymphony.xwork2.ActionSupport;

public class BookAction extends ActionSupport{
	private BookService bookService;
	/*private String bookName;
	private String author;
	private Integer typeId;
	private Float price;
	private String brief;*/
	
	//private String jsonString;
	private int totalCount;
	private List list;
	

	public BookAction(){
		this.bookService = new BookService();
	}
	
	/*public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public Integer getTypeId() {
		return typeId;
	}

	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
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
	}*/

	/*public String getJsonString() {
		return jsonString;
	}

	public void setJsonString(String jsonString) {
		this.jsonString = jsonString;
	}*/

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public List getList() {
		return list;
	}

	public void setList(List list) {
		this.list = list;
	}

	public String show(){
		//List list = bookService.getBooks();
		//JSONArray array = JSONArray.fromObject(list);
		//this.setTotalCount(list.size());
		//this.jsonString = "{totalCount:"+this.getTotalCount()+",results:"+array.toString()+"}";
		//System.out.println(this.jsonString);
		
		this.setList(bookService.getBooks());
		this.setTotalCount(this.getList().size());
		return SUCCESS;
	}
}
