package CComp.Services;

import java.util.List;

import CComp.Models.Food;

public interface FoodService {
	
	public Food addFood(Food newFood);
	public List<Food> findAllFoods();
	public List<Food> findFoodsByUserid(Long id);

}
