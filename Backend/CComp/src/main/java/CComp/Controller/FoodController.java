package CComp.Controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import CComp.Models.Food;
import CComp.Models.User;
import CComp.Services.FoodService;



@CrossOrigin
@RestController
@RequestMapping("/foods")
public class FoodController {

	@Autowired
	FoodService service;
	
	
	@PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, consumes=MediaType.APPLICATION_JSON_VALUE)
	public List<Food> addFoods(@Valid @RequestBody List<Food> newFoods) {
		
		List<Food> foods = new ArrayList<Food>();
		for (Food f : newFoods) {
			service.addFood(f);
			foods.add(f);
		}
		
		
		
		return foods;
	}
	
	@GetMapping(produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Food> findAllFoods() {
		return service.findAllFoods();
	}
	
	@GetMapping(value="/user/{id}", produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Food> findUserById(@PathVariable("id") Long id) {
		return service.findFoodsByUserid(id);
	}
}
