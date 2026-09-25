package com.nihal_portfolio.controller;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.nihal_portfolio.request.ProfileRequest;
import com.nihal_portfolio.response.ApiResponse;
import com.nihal_portfolio.response.ProfileResponse;
import com.nihal_portfolio.service.FileStorageService;
import com.nihal_portfolio.service.ProfileService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

	private final ProfileService profileService;
	private final FileStorageService fileStorageService;

	@PostMapping
	public ResponseEntity<ApiResponse<ProfileResponse>> create(@Valid @RequestBody ProfileRequest request) {

		return ResponseEntity.ok(

				ApiResponse.<ProfileResponse>builder().success(200).message("Profile Created Successfully")
						.data(profileService.create(request)).build()

		);

	}

	@PutMapping("/{id}")
	public ResponseEntity<ApiResponse<ProfileResponse>> update(@PathVariable Long id,
			@Valid @RequestBody ProfileRequest request) {

		return ResponseEntity.ok(

				ApiResponse.<ProfileResponse>builder().success(200).message("Profile Updated Successfully")
						.data(profileService.update(id, request)).build()

		);

	}

	@GetMapping
	public ResponseEntity<ApiResponse<ProfileResponse>> getProfile() {

		return ResponseEntity.ok(

				ApiResponse.<ProfileResponse>builder().success(200).message("Profile Found")
						.data(profileService.getProfile()).build()

		);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse<String>> delete(@PathVariable Long id) {

		profileService.delete(id);

		return ResponseEntity.ok(

				ApiResponse.<String>builder().success(200).message("Profile Deleted Successfully").data(null).build()

		);

	}

	@PostMapping("/upload/profile-image")
	public ResponseEntity<ApiResponse<String>> uploadProfileImage(@RequestParam MultipartFile file) {

		String path = fileStorageService.uploadProfileImage(file);

		return ResponseEntity.ok(

				ApiResponse.<String>builder().success(200).message("Image Uploaded Successfully").data(path).build()

		);

	}

	@PostMapping("/upload/resume")
	public ResponseEntity<ApiResponse<String>> uploadResume(@RequestParam MultipartFile file) {

		String path = fileStorageService.uploadResume(file);

		return ResponseEntity.ok(

				ApiResponse.<String>builder().success(200).message("Resume Uploaded Successfully").data(path).build()

		);

	}

}