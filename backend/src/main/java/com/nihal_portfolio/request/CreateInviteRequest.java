package com.nihal_portfolio.request;

import com.nihal_portfolio.enums.Role;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateInviteRequest {
	private String email;
	private Role role; // ADMIN or SUPER_ADMIN
	private List<Long> moduleIds; // ignored if role is SUPER_ADMIN (gets everything anyway)
}
