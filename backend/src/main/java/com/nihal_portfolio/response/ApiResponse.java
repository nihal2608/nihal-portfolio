package com.nihal_portfolio.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApiResponse<T> {

	private Integer success;

	private String message;

	private T data;

}