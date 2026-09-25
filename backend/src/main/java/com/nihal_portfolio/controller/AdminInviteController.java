package com.nihal_portfolio.controller;

import com.nihal_portfolio.entity.AdminInvite;
import com.nihal_portfolio.entity.Module;
import com.nihal_portfolio.enums.Role;
import com.nihal_portfolio.request.CreateInviteRequest;
import com.nihal_portfolio.response.AdminInviteResponse;
import com.nihal_portfolio.respository.AdminInviteRepository;
import com.nihal_portfolio.respository.ModuleRepository;
import com.nihal_portfolio.respository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

// Only a SUPER_ADMIN can decide, ahead of time, what role/modules a future
// admin will get. This is the "decide before they register" mechanism.
@RestController
@RequestMapping("/api/admin-invites")
@RequiredArgsConstructor
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class AdminInviteController {

	private final AdminInviteRepository inviteRepository;
	private final ModuleRepository moduleRepository;
	private final UserRepository userRepository;

	@GetMapping
	public List<AdminInviteResponse> getAll() {
		return inviteRepository.findAll().stream().map(this::toResponse).toList();
	}

	@PostMapping
	public AdminInviteResponse create(@RequestBody CreateInviteRequest request, Authentication authentication) {
		if (userRepository.existsByEmail(request.getEmail())) {
			throw new RuntimeException("That email already has an account — use the Users page to change its role/modules instead.");
		}
		if (inviteRepository.findByEmailAndAcceptedFalse(request.getEmail()).isPresent()) {
			throw new RuntimeException("There's already a pending invite for that email.");
		}
		if (request.getRole() == Role.USER) {
			throw new RuntimeException("Invites are only for ADMIN or SUPER_ADMIN — regular USER accounts don't need one.");
		}

		Set<Module> modules = request.getRole() == Role.SUPER_ADMIN
				? new HashSet<>(moduleRepository.findAll())
				: (request.getModuleIds() == null ? new HashSet<>() : new HashSet<>(moduleRepository.findAllById(request.getModuleIds())));

		AdminInvite invite = AdminInvite.builder()
				.email(request.getEmail())
				.role(request.getRole())
				.modules(modules)
				.invitedByEmail(authentication.getName())
				.accepted(false)
				.createdAt(LocalDateTime.now())
				.build();

		inviteRepository.save(invite);
		return toResponse(invite);
	}

	@DeleteMapping("/{id}")
	public void revoke(@PathVariable Long id) {
		inviteRepository.deleteById(id);
	}

	private AdminInviteResponse toResponse(AdminInvite invite) {
		return AdminInviteResponse.builder()
				.id(invite.getId())
				.email(invite.getEmail())
				.role(invite.getRole())
				.modules(invite.getModules().stream().map(m -> m.getName().name()).toList())
				.invitedByEmail(invite.getInvitedByEmail())
				.accepted(invite.isAccepted())
				.createdAt(invite.getCreatedAt())
				.acceptedAt(invite.getAcceptedAt())
				.build();
	}
}
