package com.nihal_portfolio.controller;

import com.nihal_portfolio.entity.Module;
import com.nihal_portfolio.response.ModuleResponse;
import com.nihal_portfolio.respository.ModuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/modules")
@RequiredArgsConstructor
public class ModuleController {

	private final ModuleRepository moduleRepository;

	// Any authenticated user can read the list of modules that exist (it's
	// just static reference data). Only SUPER_ADMIN can actually *assign*
	// them — that check lives on the write endpoint in UserController.
	@GetMapping
	public List<ModuleResponse> getAll() {
		return moduleRepository.findAll().stream()
				.map(this::toResponse)
				.toList();
	}

	private ModuleResponse toResponse(Module module) {
		return ModuleResponse.builder()
				.id(module.getId())
				.name(module.getName())
				.description(module.getDescription())
				.build();
	}
}
