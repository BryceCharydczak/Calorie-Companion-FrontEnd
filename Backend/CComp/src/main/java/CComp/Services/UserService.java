package CComp.Services;

import java.util.List;

import CComp.Models.User;

public interface UserService {

	public User addUser (User newUser);
	public List<User> findAllUsers();
	public User findUserById(Long id);
	public User findUserByEmail(String email);
	public User loginUser(User u);
	
	
}
