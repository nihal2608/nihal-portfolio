package com.nihal_portfolio.controller;

import com.nihal_portfolio.entity.Module;
import com.nihal_portfolio.entity.User;
import com.nihal_portfolio.request.AssignModulesRequest;
import com.nihal_portfolio.response.UserResponse;
import com.nihal_portfolio.respository.ModuleRepository;
import com.nihal_portfolio.respository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

	private final UserRepository userRepository;
	private final ModuleRepository moduleRepository;

	// Only a SUPER_ADMIN should be able to see the full user list / manage
	// accounts. Adjust the role name here if your UserDetailsService grants
	// authorities without the "ROLE_" prefix convention.
	@PreAuthorize("hasRole('SUPER_ADMIN')")
	@GetMapping
	public List<UserResponse> getAll() {
		return userRepository.findAll().stream().map(this::toResponse).toList();
	}

	@PreAuthorize("hasRole('SUPER_ADMIN')")
	@GetMapping("/{id}")
	public UserResponse getById(@PathVariable Long id) {
		User user = userRepository.findById(id).orElseThrow();
		return toResponse(user);
	}

	// Assign a role and/or module access to a user. Only SUPER_ADMIN can do
	// this — this is the endpoint the "Users" admin page calls.
	@PreAuthorize("hasRole('SUPER_ADMIN')")
	@PutMapping("/{id}/modules")
	public UserResponse assignModules(@PathVariable Long id, @RequestBody AssignModulesRequest request) {
		User user = userRepository.findById(id).orElseThrow();

		if (request.getRole() != null) {
			user.setRole(request.getRole());
		}

		if (request.getModuleIds() != null) {
			Set<Module> modules = new HashSet<>(moduleRepository.findAllById(request.getModuleIds()));
			user.setModules(modules);
		}

		userRepository.save(user);
		return toResponse(user);
	}

	private UserResponse toResponse(User user) {
		return UserResponse.builder()
				.id(user.getId())
				.fullName(user.getFullName())
				.email(user.getEmail())
				.role(user.getRole())
				.active(user.getActive())
				.createdAt(user.getCreatedAt())
				.modules(user.getModules().stream().map(m -> m.getName().name()).toList())
				.build();
	}
}
