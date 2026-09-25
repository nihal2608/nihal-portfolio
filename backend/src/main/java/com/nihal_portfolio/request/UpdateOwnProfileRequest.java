package com.nihal_portfolio.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateOwnProfileRequest {
	private String fullName;
}
