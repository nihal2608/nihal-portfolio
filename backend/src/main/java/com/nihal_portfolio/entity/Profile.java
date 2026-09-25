package com.nihal_portfolio.entity;

import com.nihal_portfolio.common.BaseEntity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbl_profile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Profile extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String fullName;

	private String designation;

	@Column(length = 5000)
	private String about;

	private String email;

	private String phone;

	private String location;

	private Integer experienceYears;

	private String github;

	private String linkedin;

	private String website;

	private String profileImage;

	private String resume;
	
	 private String portfolio;


}