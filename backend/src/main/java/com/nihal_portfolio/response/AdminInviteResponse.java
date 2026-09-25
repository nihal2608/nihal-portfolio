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
public class AdminInviteResponse {
	private Long id;
	private String email;
	private Role role;
	private List<String> modules;
	private String invitedByEmail;
	private boolean accepted;
	private LocalDateTime createdAt;
	private LocalDateTime acceptedAt;
}
