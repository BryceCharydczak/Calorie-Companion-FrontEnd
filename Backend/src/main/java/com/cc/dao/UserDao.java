package com.cc.dao;
import java.util.List;

import com.cc.beans.CCuser;

public interface UserDao {

	
	public List<CCuser> getUsers();
	public CCuser getUserById(int id);
	public int addUser(CCuser user);
	public void updateUser(CCuser user);
	public void deleteUser(CCuser user);
	
	
}
