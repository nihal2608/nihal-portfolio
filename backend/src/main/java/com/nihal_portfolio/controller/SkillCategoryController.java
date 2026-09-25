package com.nihal_portfolio.controller;

import com.nihal_portfolio.request.SkillCategoryRequest;
import com.nihal_portfolio.response.ApiResponse;
import com.nihal_portfolio.response.SkillCategoryResponse;
import com.nihal_portfolio.service.SkillCategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skill-categories")
@RequiredArgsConstructor
public class SkillCategoryController {

	private final SkillCategoryService service;

	@PostMapping
	public ResponseEntity<ApiResponse<SkillCategoryResponse>> create(@Valid @RequestBody SkillCategoryRequest request) {

		SkillCategoryResponse response = service.create(request);

		return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<SkillCategoryResponse>builder().success(200)
				.message("Category Created Successfully").data(response).build());
	}

	@PutMapping("/{id}")
	public ResponseEntity<ApiResponse<SkillCategoryResponse>> update(@PathVariable Long id,
			@Valid @RequestBody SkillCategoryRequest request) {

		return ResponseEntity.ok(ApiResponse.<SkillCategoryResponse>builder().success(200)
				.message("Category Updated Successfully").data(service.update(id, request)).build());
	}

	@GetMapping
	public ResponseEntity<ApiResponse<List<SkillCategoryResponse>>> getAll() {

		return ResponseEntity.ok(ApiResponse.<List<SkillCategoryResponse>>builder().success(200)
				.message("Category List").data(service.getAll()).build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {

		service.delete(id);

		return ResponseEntity
				.ok(ApiResponse.<Void>builder().success(200).message("Category Deleted Successfully").build());
	}

}