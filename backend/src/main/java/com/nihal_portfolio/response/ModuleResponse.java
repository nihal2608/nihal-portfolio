package com.nihal_portfolio.response;

import com.nihal_portfolio.enums.ModuleName;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ModuleResponse {
	private Long id;
	private ModuleName name;
	private String description;
}
