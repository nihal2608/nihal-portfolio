package com.nihal_portfolio.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReplyMessageRequest {
	private String replyText;
}
