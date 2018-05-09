package CComp.Controller;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;


import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import CComp.Models.User;
import CComp.Services.UserService;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {
	
	
	@Bean
	PasswordEncoder getEncoder() {
	    return new BCryptPasswordEncoder();
	}
	
	@Autowired
	UserService service;
	
	@PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, consumes=MediaType.APPLICATION_JSON_VALUE)
	public User addUser(@Valid @RequestBody User user) {


		
		String pw_hash = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()); 
		user.setPassword(pw_hash);
		
		return service.addUser(user);
	}
	
	
	@GetMapping(produces=MediaType.APPLICATION_JSON_VALUE)
	public List<User> findAllUsers() {
		return service.findAllUsers();
	}

	@GetMapping(value="/{id}", produces=MediaType.APPLICATION_JSON_VALUE)
	public User findUserById(@PathVariable("id") Long id) {
		return service.findUserById(id);
	}
	
	@PostMapping(value="/login", produces=MediaType.APPLICATION_JSON_VALUE, consumes=MediaType.APPLICATION_JSON_VALUE)
	public User loginUser(@RequestBody User user) {
		
		//String pw_hash = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()); 
		//user.setPassword(pw_hash);
		
		User cUser = service.findUserByEmail(user.getEmail());
		
		if (BCrypt.checkpw(user.getPassword(), cUser.getPassword()))
		    return cUser;
		else
		    return null;
		
		//return service.loginUser(user);
	}
	

	
	
	
	
	

}
