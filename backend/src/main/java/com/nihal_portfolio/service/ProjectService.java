package com.nihal_portfolio.service;

import java.util.List;

import com.nihal_portfolio.request.ProjectRequest;
import com.nihal_portfolio.response.ProjectResponse;

public interface ProjectService {

	ProjectResponse create(ProjectRequest request);

	ProjectResponse update(Long id, ProjectRequest request);

	ProjectResponse getById(Long id);

	List<ProjectResponse> getAll();

	void delete(Long id);

	List<ProjectResponse> getFeaturedProjects();

	List<ProjectResponse> getProjectsByCategory(String category);

	List<ProjectResponse> getLatestProjects();

}