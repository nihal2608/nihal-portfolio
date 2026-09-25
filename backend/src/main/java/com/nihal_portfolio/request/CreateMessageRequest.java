package com.nihal_portfolio.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateMessageRequest {
	private String name;
	private String email;
	private String message;
}
