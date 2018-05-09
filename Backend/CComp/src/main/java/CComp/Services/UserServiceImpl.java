package CComp.Services;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import CComp.Models.User;
import CComp.Repositories.UserRepo;

@Service
@Transactional
public class UserServiceImpl implements UserService{


	@Autowired
	UserRepo repo;

	public User addUser(User newUser) {
		
		for(User u : findAllUsers()) {
			if (u.getEmail().equals(newUser.getEmail())) {
				return null;
			}
		}
		
		
		
		return repo.save(newUser);
	}

	public List<User> findAllUsers() {
		return repo.findAll();
	}

	public User findUserById(Long id) {
		return repo.getOne(id);
	}

	public User findUserByEmail(String email) {
		return repo.findUserByEmail(email);
	}
	
	public User loginUser(User u){
	
		return repo.findUserByEmailAndPassword(u.getEmail(), u.getPassword());
	}
	
}
