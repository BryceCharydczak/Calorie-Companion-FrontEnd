package CComp.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import CComp.Models.Food;
import CComp.Models.User;

@Repository
public interface FoodRepo extends JpaRepository<Food, Long>{
	public List<Food> findFoodsByUserid(Long id);

}
