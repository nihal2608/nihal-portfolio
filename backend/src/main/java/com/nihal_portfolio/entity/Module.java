package com.nihal_portfolio.entity;

import com.nihal_portfolio.enums.ModuleName;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbl_modules")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Module {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, unique = true)
	private ModuleName name;

	private String description;
}
