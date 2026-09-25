package com.nihal_portfolio.controller;

import com.nihal_portfolio.request.SkillRequest;
import com.nihal_portfolio.response.ApiResponse;
import com.nihal_portfolio.response.SkillResponse;
import com.nihal_portfolio.service.SkillService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
public class SkillController {

	private final SkillService skillService;

	@PostMapping
	public ResponseEntity<ApiResponse<SkillResponse>> create(@Valid @RequestBody SkillRequest request) {

		SkillResponse response = skillService.create(request);

		return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<SkillResponse>builder().success(200)
				.message("Skill Created Successfully").data(response).build());
	}

	@PutMapping("/{id}")
	public ResponseEntity<ApiResponse<SkillResponse>> update(@PathVariable Long id,
			@Valid @RequestBody SkillRequest request) {

		return ResponseEntity.ok(ApiResponse.<SkillResponse>builder().success(200).message("Skill Updated Successfully")
				.data(skillService.update(id, request)).build());
	}

	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<SkillResponse>> getById(@PathVariable Long id) {

		return ResponseEntity.ok(ApiResponse.<SkillResponse>builder().success(200).message("Skill Found")
				.data(skillService.getById(id)).build());
	}

	@GetMapping
	public ResponseEntity<ApiResponse<List<SkillResponse>>> getAll() {

		return ResponseEntity.ok(ApiResponse.<List<SkillResponse>>builder().success(200).message("Skill List")
				.data(skillService.getAll()).build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {

		skillService.delete(id);

		return ResponseEntity
				.ok(ApiResponse.<Void>builder().success(200).message("Skill Deleted Successfully").build());
	}

}