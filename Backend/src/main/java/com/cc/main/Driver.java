package com.cc.main;

import org.hibernate.Session;

import com.cc.util.HibernateUtil;

public class Driver {

	
	public static void main(String[] args) {
		Session s = HibernateUtil.getSession();
		s.close();
		
	}
}
