package org.jiqin.model;



/**
 * Book entity. @author MyEclipse Persistence Tools
 */

public class Book  implements java.io.Serializable {


    // Fields    

     private Integer id;
     private String bookName;
     private String author;
     private Integer typeId;
     private Float price;
     private String brief;


    // Constructors

    /** default constructor */
    public Book() {
    }

    
    /** full constructor */
    public Book(String bookName, String author, Integer typeId, Float price, String brief) {
        this.bookName = bookName;
        this.author = author;
        this.typeId = typeId;
        this.price = price;
        this.brief = brief;
    }

   
    // Property accessors

    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }

    public String getBookName() {
        return this.bookName;
    }
    
    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getAuthor() {
        return this.author;
    }
    
    public void setAuthor(String author) {
        this.author = author;
    }

    public Integer getTypeId() {
        return this.typeId;
    }
    
    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    public Float getPrice() {
        return this.price;
    }
    
    public void setPrice(Float price) {
        this.price = price;
    }

    public String getBrief() {
        return this.brief;
    }
    
    public void setBrief(String brief) {
        this.brief = brief;
    }
   








}