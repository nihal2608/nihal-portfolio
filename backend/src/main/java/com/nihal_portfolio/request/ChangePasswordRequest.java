package com.nihal_portfolio.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChangePasswordRequest {
	private String oldPassword;
	private String newPassword;
}
