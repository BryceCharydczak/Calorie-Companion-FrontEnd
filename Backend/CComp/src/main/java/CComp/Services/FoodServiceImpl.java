package CComp.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import CComp.Models.Food;
import CComp.Repositories.FoodRepo;

@Service
@Transactional
public class FoodServiceImpl implements FoodService {

	@Autowired
	FoodRepo repo;
	
	@Override
	public Food addFood(Food newFood) {
		
		return repo.save(newFood);
	}

	@Override
	public List<Food> findAllFoods() {
		
		return repo.findAll();
	}
	
	public List<Food> findFoodsByUserid(Long id){
		return repo.findFoodsByUserid(id);
	}

}
