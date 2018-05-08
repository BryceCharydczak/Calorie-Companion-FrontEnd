package CComp.Models;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name = "foods")
public class Food implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name="Id")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	
	@Column(name="Userid")
	private Long userid;
	
	@Column(name="Name")
	private String name;
	
	@Column(name="Calories")
	private float calories;
	
	@Column(name="Carbs")
	private float carbs;
	
	@Column(name="Fats")
	private float fats;
	
	@Column(name="Protein")
	private float protein;
	
	@Column(name="Time")
	private Timestamp time;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userid;
	}

	public void setUserId(Long userid) {
		this.userid = userid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public float getCalories() {
		return calories;
	}

	public void setCalories(float calories) {
		this.calories = calories;
	}

	public float getCarbs() {
		return carbs;
	}

	public void setCarbs(float carbs) {
		this.carbs = carbs;
	}

	public float getFats() {
		return fats;
	}

	public void setFats(float fats) {
		this.fats = fats;
	}

	public float getProtein() {
		return protein;
	}

	public void setProtein(float protein) {
		this.protein = protein;
	}

	public Timestamp getTime() {
		return time;
	}

	public void setTime(Timestamp time) {
		this.time = time;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + Float.floatToIntBits(calories);
		result = prime * result + Float.floatToIntBits(carbs);
		result = prime * result + Float.floatToIntBits(fats);
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + Float.floatToIntBits(protein);
		result = prime * result + ((time == null) ? 0 : time.hashCode());
		result = prime * result + ((userid == null) ? 0 : userid.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Food other = (Food) obj;
		if (Float.floatToIntBits(calories) != Float.floatToIntBits(other.calories))
			return false;
		if (Float.floatToIntBits(carbs) != Float.floatToIntBits(other.carbs))
			return false;
		if (Float.floatToIntBits(fats) != Float.floatToIntBits(other.fats))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (Float.floatToIntBits(protein) != Float.floatToIntBits(other.protein))
			return false;
		if (time == null) {
			if (other.time != null)
				return false;
		} else if (!time.equals(other.time))
			return false;
		if (userid == null) {
			if (other.userid != null)
				return false;
		} else if (!userid.equals(other.userid))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Food [id=" + id + ", userId=" + userid + ", name=" + name + ", calories=" + calories + ", carbs="
				+ carbs + ", fats=" + fats + ", protein=" + protein + ", time=" + time + "]";
	}

	public Food(Long id, Long userId, String name, float calories, float carbs, float fats, float protein,
			Timestamp time) {
		super();
		this.id = id;
		this.userid = userId;
		this.name = name;
		this.calories = calories;
		this.carbs = carbs;
		this.fats = fats;
		this.protein = protein;
		this.time = time;
	}
	
	public Food() {
		super();
	}
}
