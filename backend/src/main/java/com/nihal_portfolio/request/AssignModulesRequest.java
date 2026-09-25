package com.nihal_portfolio.request;

import com.nihal_portfolio.enums.Role;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssignModulesRequest {
	// Optional: change the user's role at the same time (e.g. promote USER -> ADMIN).
	private Role role;

	// IDs of Module rows this user should have access to.
	// SUPER_ADMIN ignores this list entirely (always has access to everything).
	private List<Long> moduleIds;
}
