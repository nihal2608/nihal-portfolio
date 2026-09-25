package com.nihal_portfolio.serviceImpl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nihal_portfolio.entity.Project;
import com.nihal_portfolio.entity.ProjectImage;
import com.nihal_portfolio.entity.ProjectTechnology;
import com.nihal_portfolio.exception.ResourceNotFoundException;
import com.nihal_portfolio.mapper.ProjectMapper;
import com.nihal_portfolio.request.ProjectRequest;
import com.nihal_portfolio.response.ProjectResponse;
import com.nihal_portfolio.respository.ProjectRepository;
import com.nihal_portfolio.service.ProjectService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjectServiceImpl implements ProjectService {

	private final ProjectRepository repository;

	private final ProjectMapper mapper;

	@Override
	public ProjectResponse create(ProjectRequest request) {

		Project project = mapper.toEntity(request);

		if (request.getImages() != null) {

			for (String image : request.getImages()) {

				ProjectImage img = ProjectImage.builder().imageUrl(image).project(project).build();

				project.getImages().add(img);

			}

		}

		if (request.getTechnologies() != null) {

			for (String tech : request.getTechnologies()) {

				ProjectTechnology technology = ProjectTechnology.builder().technology(tech).project(project).build();

				project.getTechnologies().add(technology);

			}

		}

		return mapper.toResponse(repository.save(project));

	}

	@Override
	public ProjectResponse update(Long id, ProjectRequest request) {

		Project project = repository.findById(id)

				.orElseThrow(() -> new ResourceNotFoundException("Project Not Found"));

		mapper.updateEntity(project, request);

		project.getImages().clear();

		if (request.getImages() != null) {

			request.getImages().forEach(image -> {

				project.getImages().add(

						ProjectImage.builder().imageUrl(image).project(project).build()

				);

			});

		}

		project.getTechnologies().clear();

		if (request.getTechnologies() != null) {

			request.getTechnologies().forEach(tech -> {

				project.getTechnologies().add(

						ProjectTechnology.builder().technology(tech).project(project).build()

				);

			});

		}

		return mapper.toResponse(repository.save(project));

	}

	@Override
	@Transactional(readOnly = true)
	public ProjectResponse getById(Long id) {

		Project project = repository.findById(id)

				.orElseThrow(() -> new ResourceNotFoundException("Project Not Found"));

		return mapper.toResponse(project);

	}

	@Override
	@Transactional(readOnly = true)
	public List<ProjectResponse> getAll() {

		return repository.findByActiveTrueOrderByDisplayOrderAsc()

				.stream()

				.map(mapper::toResponse)

				.toList();

	}

	@Override
	public void delete(Long id) {

		Project project = repository.findById(id)

				.orElseThrow(() -> new ResourceNotFoundException("Project Not Found"));

		repository.delete(project);

	}

	@Override
	@Transactional(readOnly = true)
	public List<ProjectResponse> getFeaturedProjects() {

		return repository.findByFeaturedTrueAndActiveTrueOrderByDisplayOrderAsc().stream().map(mapper::toResponse)
				.toList();

	}

	@Override
	@Transactional(readOnly = true)
	public List<ProjectResponse> getProjectsByCategory(String category) {

		return repository.findByCategoryIgnoreCaseAndActiveTrueOrderByDisplayOrderAsc(category).stream()
				.map(mapper::toResponse).toList();

	}

	@Override
	@Transactional(readOnly = true)
	public List<ProjectResponse> getLatestProjects() {

		return repository.findTop6ByActiveTrueOrderByCreatedAtDesc().stream().map(mapper::toResponse).toList();

	}

}