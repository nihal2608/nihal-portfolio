package com.nihal_portfolio.response;

import com.nihal_portfolio.enums.Role;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
	private Long id;
	private String fullName;
	private String email;
	private Role role;
	private Boolean active;
	private LocalDateTime createdAt;

	// Module names this user can access, e.g. ["PROJECTS", "SKILLS"].
	private List<String> modules;
}
