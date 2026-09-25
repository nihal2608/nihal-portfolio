package com.nihal_portfolio.controller;

import java.util.List;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.nihal_portfolio.request.ProjectRequest;
import com.nihal_portfolio.response.ApiResponse;
import com.nihal_portfolio.response.ProjectResponse;
import com.nihal_portfolio.service.FileStorageService;
import com.nihal_portfolio.service.ProjectService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@Validated
public class ProjectController {

    private final ProjectService projectService;
    private final FileStorageService fileStorageService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProjectResponse>> create(
            @Valid @RequestBody ProjectRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<ProjectResponse>builder()
                        .success(200)
                        .message("Project Created Successfully")
                        .data(projectService.create(request))
                        .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody ProjectRequest request) {

        return ResponseEntity.ok(
                ApiResponse.<ProjectResponse>builder()
                        .success(200)
                        .message("Project Updated Successfully")
                        .data(projectService.update(id, request))
                        .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectResponse>> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                ApiResponse.<ProjectResponse>builder()
                        .success(200)
                        .message("Project Found")
                        .data(projectService.getById(id))
                        .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProjectResponse>>> getAll() {

        return ResponseEntity.ok(
                ApiResponse.<List<ProjectResponse>>builder()
                        .success(200)
                        .message("Project List")
                        .data(projectService.getAll())
                        .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable Long id) {

        projectService.delete(id);

        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(200)
                        .message("Project Deleted Successfully")
                        .build());
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<ProjectResponse>>> featured() {

        return ResponseEntity.ok(
                ApiResponse.<List<ProjectResponse>>builder()
                        .success(200)
                        .message("Featured Projects")
                        .data(projectService.getFeaturedProjects())
                        .build());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse<List<ProjectResponse>>> category(
            @PathVariable String category) {

        return ResponseEntity.ok(
                ApiResponse.<List<ProjectResponse>>builder()
                        .success(200)
                        .message("Category Projects")
                        .data(projectService.getProjectsByCategory(category))
                        .build());
    }

    @GetMapping("/latest")
    public ResponseEntity<ApiResponse<List<ProjectResponse>>> latest() {

        return ResponseEntity.ok(
                ApiResponse.<List<ProjectResponse>>builder()
                        .success(200)
                        .message("Latest Projects")
                        .data(projectService.getLatestProjects())
                        .build());
    }

    @PostMapping("/upload/thumbnail")
    public ResponseEntity<ApiResponse<String>> uploadThumbnail(
            @RequestParam MultipartFile file) {

        String path = fileStorageService.uploadProjectThumbnail(file);

        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .success(200)
                        .message("Thumbnail Uploaded Successfully")
                        .data(path)
                        .build());
    }

    @PostMapping("/upload/image")
    public ResponseEntity<ApiResponse<String>> uploadImage(
            @RequestParam MultipartFile file) {

        String path = fileStorageService.uploadProjectImage(file);

        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .success(200)
                        .message("Project Image Uploaded Successfully")
                        .data(path)
                        .build());
    }

}