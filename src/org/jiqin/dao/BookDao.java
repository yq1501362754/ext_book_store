package org.jiqin.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.hibernate.Session;
import org.jiqin.model.Book;
import org.jiqin.util.HibernateSessionFactory;


public class BookDao {
	public void addBook(Book book){
		Session session = HibernateSessionFactory.getSession();
		try{
			session.beginTransaction().begin();
			session.save(book);
			session.beginTransaction().commit();
		}catch(Exception e){
			e.printStackTrace();
			session.beginTransaction().rollback();
		}
	}

	public List getBooks() {
		List list = null;
		List l=new ArrayList();
		Session session = HibernateSessionFactory.getSession();
		try{
			session.beginTransaction().begin();
			list = session.createQuery("select b.author, b.bookName, b.id, b.price, b.brief, bt.title from Book as b, Booktype as bt where b.typeId = bt.id").list();
			
			for(Iterator iter=list.iterator();iter.hasNext();)
			{
				Map m=new HashMap();
				Object[] object=(Object [])iter.next();
				m.put("author", object[0]);
				m.put("bookName", object[1]);
				m.put("id", object[2]);
				m.put("price", object[3]);
				m.put("brief", object[4]);
				m.put("title", object[5]);
				l.add(m);
			}
			session.beginTransaction().commit();
		}catch(Exception e){
			e.printStackTrace();
			session.beginTransaction().rollback();
		}
		return l;
	}

	public int getLastBook() {
		Session session = HibernateSessionFactory.getSession();
		int bookId = -1;
		try{
			session.beginTransaction().begin();
			List list = session.createSQLQuery("select last_insert_id() bookId from book").list();
			for(Iterator iter=list.iterator();iter.hasNext();){
				bookId = Integer.valueOf(iter.next().toString());
			}
			session.beginTransaction().commit();
		}catch(Exception e){
			e.printStackTrace();
			session.beginTransaction().rollback();
		}
		return bookId;
	}

	public Map getBookById(int id) {
		List list = null;
		//List l=new ArrayList();
		Map m=new HashMap();
		Session session = HibernateSessionFactory.getSession();
		try{
			session.beginTransaction().begin();
			list = session.createQuery("select b.author, b.bookName, b.id, b.price, b.brief, bt.title, b.typeId from Book as b, Booktype as bt where b.typeId = bt.id and b.id = "+id).list();
			Iterator iter=list.iterator();
			if(iter.hasNext())
			{
				Object[] object=(Object [])iter.next();
				m.put("author", object[0]);
				m.put("bookName", object[1]);
				m.put("id", object[2]);
				m.put("price", object[3]);
				m.put("brief", object[4]);
				m.put("title", object[5]);
				m.put("bookTypeId", object[6]);
			}
			//System.out.println(m);
			session.beginTransaction().commit();
		}catch(Exception e){
			e.printStackTrace();
			session.beginTransaction().rollback();
		}
		return m;
	}

	public boolean modify(Book book) {
		int updateEntities = 0;
		boolean success = false;
		Session session = HibernateSessionFactory.getSession();
		try{
			session.beginTransaction().begin();
			updateEntities = session.createQuery("update Book set bookName = :bookName , author = :author, brief = :brief, price = :price, typeId = :typeId where id = :id")
								.setParameter("bookName", book.getBookName())
								.setParameter("author", book.getAuthor())
								.setParameter("brief", book.getBrief())
								.setParameter("price", book.getPrice())
								.setParameter("typeId", book.getTypeId())
								.setParameter("id", book.getId())
								.executeUpdate();
			session.beginTransaction().commit();
		}catch(Exception e){
			e.printStackTrace();
			session.beginTransaction().rollback();
		}
		if(updateEntities != 0){
			success = true;
		}
		return success;
	}

	public boolean deleteBooks(List list) {
		int deleteEntities = 0;
		boolean success = false;
		Session session = HibernateSessionFactory.getSession();
		try{
			for(Iterator iter = list.iterator(); iter.hasNext();){
				session.beginTransaction().begin();
				deleteEntities = session.createQuery("delete Book where id = :id")
									.setParameter("id", iter.next())
									.executeUpdate();
				session.beginTransaction().commit();
			}
		}catch(Exception e){
			e.printStackTrace();
			session.beginTransaction().rollback();
		}
		if(deleteEntities != 0){
			success = true;
		}
		return success;
	}
}
