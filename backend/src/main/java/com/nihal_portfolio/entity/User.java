package com.nihal_portfolio.entity;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.nihal_portfolio.enums.Role;
//user_modules
@Entity
@Table(name = "tbl_users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String fullName;

	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	@Builder.Default
	private Boolean active = true;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role;

	private LocalDateTime createdAt = LocalDateTime.now();

	private LocalDateTime updatedAt = LocalDateTime.now();

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "tbl_user_modules", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "module_id"))
	@Builder.Default
	private Set<Module> modules = new HashSet<>();

}