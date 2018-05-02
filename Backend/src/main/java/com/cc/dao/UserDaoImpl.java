package com.cc.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.cc.beans.CCuser;
import com.cc.util.HibernateUtil;

public class UserDaoImpl implements UserDao {

	public List<CCuser> getUsers() {
		Session s = HibernateUtil.getSession();
		Query q = s.createQuery("from CCUSER");
		List<CCuser> users = q.list();
		s.close();
		return users;
	}

	public CCuser getUserById(int id) {
		Session s = HibernateUtil.getSession();
		CCuser u = (CCuser) s.get(CCuser.class, id);
		s.close();
		return u;
	}

	public int addUser(CCuser user) {
		Session s = HibernateUtil.getSession();
		Transaction t = s.beginTransaction();
		int result = (Integer) s.save(user);
		t.commit();
		s.close();
		return result;
	}

	public void updateUser(CCuser user) {
		Session s = HibernateUtil.getSession();
		Transaction t = s.beginTransaction();
		s.merge(user);
		t.commit();
		s.close();
		
	}

	public void deleteUser(CCuser user) {
		Session s = HibernateUtil.getSession();
		Transaction t = s.beginTransaction();
		s.delete(user);
		t.commit();
		s.close();
		
	}

}
