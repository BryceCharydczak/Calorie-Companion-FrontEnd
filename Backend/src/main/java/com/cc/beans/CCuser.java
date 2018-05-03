package com.cc.beans;

import java.sql.Date;

import javax.persistence.*;


@Entity
@Table(name="CCUSER")
public class CCuser {
		
		@Id
		@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="userSequence")
		@SequenceGenerator(allocationSize=1,name="userSequence",sequenceName="SQ_USER_PK")
		@Column(name="ID")
		private int id;
		
		@Column(name="EMAIL")
		private String email;
		
		@Column(name="PASSWORD")
		String password;
		
		@Column(name="GENDER")
		String gender;
		
		@Column(name="WEIGHT")
		int weight;
		
		@Column(name="HEIGHT")
		int height;
		
		@Column(name="BIRTHDATE")
		Date birthdate;
}
