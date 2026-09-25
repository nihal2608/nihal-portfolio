package com.nihal_portfolio.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {
	private String token;
	private String type;
	private String fullName;
	private String email;
	private String role;

	// Names of modules this user can access in the admin panel, e.g.
	// ["PROJECTS", "SKILLS"]. SUPER_ADMIN gets every module name here.
	private List<String> modules;
}
