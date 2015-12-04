package org.jiqin.model;



/**
 * Booktype entity. @author MyEclipse Persistence Tools
 */

public class Booktype  implements java.io.Serializable {


    // Fields    

     private Integer id;
     private String title;
     private String detail;


    // Constructors

    /** default constructor */
    public Booktype() {
    }

    
    /** full constructor */
    public Booktype(String title, String detail) {
        this.title = title;
        this.detail = detail;
    }
    public Booktype(int id,String title, String detail) {
    	this.id=id;
        this.title = title;
        this.detail = detail;
    }


   
    // Property accessors

    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }

    public String getDetail() {
        return this.detail;
    }
    
    public void setDetail(String detail) {
        this.detail = detail;
    }
   








}