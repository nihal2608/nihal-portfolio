package com.nihal_portfolio.controller;

import com.nihal_portfolio.entity.User;
import com.nihal_portfolio.request.ChangePasswordRequest;
import com.nihal_portfolio.request.UpdateOwnProfileRequest;
import com.nihal_portfolio.response.UserResponse;
import com.nihal_portfolio.respository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

// "My own account" self-service endpoints — separate from UserController
// (which is for a SUPER_ADMIN managing *other* people's roles/modules).
// Any authenticated user (ADMIN, SUPER_ADMIN, or USER) can call these for
// their own account.
@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountController {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	@GetMapping("/me")
	public UserResponse me(Authentication authentication) {
		User user = currentUser(authentication);
		return toResponse(user);
	}

	@PutMapping("/profile")
	public UserResponse updateProfile(@RequestBody UpdateOwnProfileRequest request, Authentication authentication) {
		User user = currentUser(authentication);
		if (request.getFullName() != null && !request.getFullName().isBlank()) {
			user.setFullName(request.getFullName());
		}
		userRepository.save(user);
		return toResponse(user);
	}

	@PutMapping("/password")
	public String changePassword(@RequestBody ChangePasswordRequest request, Authentication authentication) {
		User user = currentUser(authentication);

		if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
			throw new RuntimeException("Current password is incorrect");
		}
		if (request.getNewPassword() == null || request.getNewPassword().length() < 6) {
			throw new RuntimeException("New password must be at least 6 characters");
		}

		user.setPassword(passwordEncoder.encode(request.getNewPassword()));
		userRepository.save(user);
		return "Password updated successfully";
	}

	private User currentUser(Authentication authentication) {
		String email = authentication.getName();
		return userRepository.findByEmail(email).orElseThrow();
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
