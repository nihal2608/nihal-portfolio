package com.nihal_portfolio.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageResponse {
	private Long id;
	private String name;
	private String email;
	private String message;
	private boolean read;
	private boolean replied;
	private String replyText;
	private LocalDateTime repliedAt;
	private LocalDateTime createdAt;
}
