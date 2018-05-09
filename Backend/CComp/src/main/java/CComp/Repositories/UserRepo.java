package CComp.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import CComp.Models.User;

@Repository
public interface UserRepo extends JpaRepository<User,Long>{

	public User findUserByEmail(String email);
	public User findUserByEmailAndPassword(String email, String password);

}
