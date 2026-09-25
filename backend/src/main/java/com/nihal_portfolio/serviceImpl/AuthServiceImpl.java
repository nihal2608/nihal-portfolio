package com.nihal_portfolio.serviceImpl;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nihal_portfolio.entity.AdminInvite;
import com.nihal_portfolio.entity.User;
import com.nihal_portfolio.enums.ModuleName;
import com.nihal_portfolio.enums.Role;
import com.nihal_portfolio.request.LoginRequest;
import com.nihal_portfolio.request.RegisterRequest;
import com.nihal_portfolio.response.LoginResponse;
import com.nihal_portfolio.respository.AdminInviteRepository;
import com.nihal_portfolio.respository.ModuleRepository;
import com.nihal_portfolio.respository.UserRepository;
import com.nihal_portfolio.security.JwtService;
import com.nihal_portfolio.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final UserRepository repository;
	private final ModuleRepository moduleRepository;
	private final AdminInviteRepository inviteRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JwtService jwtService;

	@Override
	public String register(RegisterRequest request) {
		if (repository.existsByEmail(request.getEmail())) {
			throw new RuntimeException("Email already exists");
		}

		User.UserBuilder builder = User.builder()
				.fullName(request.getFullName())
				.email(request.getEmail())
				.createdAt(LocalDateTime.now())
				.password(passwordEncoder.encode(request.getPassword()))
				.active(true);

		// 1) Was this email pre-approved by a SUPER_ADMIN via an invite?
		//    If so, that invite decides the role + modules — not us.
		var pendingInvite = inviteRepository.findByEmailAndAcceptedFalse(request.getEmail());

		if (pendingInvite.isPresent()) {
			AdminInvite invite = pendingInvite.get();
			builder.role(invite.getRole()).modules(new HashSet<>(invite.getModules()));
			repository.save(builder.build());

			invite.setAccepted(true);
			invite.setAcceptedAt(LocalDateTime.now());
			inviteRepository.save(invite);

			return "Registration successful. You've been given " + invite.getRole() + " access as invited.";
		}

		// 2) No invite. The very first account ever created becomes
		//    SUPER_ADMIN (with every module) so there's always someone able
		//    to create invites for everyone else. Anyone after that with no
		//    invite registers as a plain USER — no admin panel access.
		boolean isFirstUser = repository.count() == 0;

		if (isFirstUser) {
			builder.role(Role.SUPER_ADMIN).modules(new HashSet<>(moduleRepository.findAll()));
		} else {
			builder.role(Role.USER);
		}

		repository.save(builder.build());

		return isFirstUser
				? "Registration successful. You're the first account, so you've been made SUPER_ADMIN."
				: "Registration successful. Ask a SUPER_ADMIN to invite you for admin access.";
	}

	@Override
	public LoginResponse login(LoginRequest request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.getEmail(),
						request.getPassword()
				)
		);

		User user = repository.findByEmail(request.getEmail()).orElseThrow();
		String token = jwtService.generateToken(user);

		List<String> moduleNames = user.getRole() == Role.SUPER_ADMIN
				? List.of(ModuleName.values()).stream().map(Enum::name).collect(Collectors.toList())
				: user.getModules().stream().map(m -> m.getName().name()).collect(Collectors.toList());

		return LoginResponse.builder()
				.token(token)
				.type("Bearer")
				.fullName(user.getFullName())
				.email(user.getEmail())
				.role(user.getRole().name())
				.modules(moduleNames)
				.build();
	}
}
