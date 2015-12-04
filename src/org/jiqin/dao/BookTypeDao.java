package org.jiqin.dao;

import java.util.Iterator;
import java.util.List;

import org.hibernate.Session;
import org.jiqin.model.Book;
import org.jiqin.model.Booktype;
import org.jiqin.util.HibernateSessionFactory;

public class BookTypeDao {
	public List getBooktypes(){
		Session session = HibernateSessionFactory.getSession();
		List list = null;
		try{
			session.beginTransaction().begin();
			list = session.createQuery("from Booktype").list();
			session.beginTransaction().commit();
		}catch(Exception e){
			e.printStackTrace();
			session.beginTransaction().rollback();
		}
		return list;
	}
	public void addBooktype(Booktype booktype){
		Session session = HibernateSessionFactory.getSession();
		try{
			session.beginTransaction().begin();
			session.save(booktype);
			session.beginTransaction().commit();
		}catch(Exception e){
			e.printStackTrace();
			session.beginTransaction().rollback();
		}
	}
	public int getLastBooktype() {
		Session session = HibernateSessionFactory.getSession();
		int bookId = -1;
		try{
			session.beginTransaction().begin();
			List list = session.createSQLQuery("select last_insert_id() bookId from booktype").list();
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
}
