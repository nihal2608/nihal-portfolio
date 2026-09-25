package com.nihal_portfolio.serviceImpl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nihal_portfolio.entity.SkillCategory;
import com.nihal_portfolio.exception.DuplicateResourceException;
import com.nihal_portfolio.exception.ResourceNotFoundException;
import com.nihal_portfolio.mapper.SkillCategoryMapper;
import com.nihal_portfolio.request.SkillCategoryRequest;
import com.nihal_portfolio.response.SkillCategoryResponse;
import com.nihal_portfolio.respository.SkillCategoryRepository;
import com.nihal_portfolio.service.SkillCategoryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class SkillCategoryServiceImpl implements SkillCategoryService {

	private final SkillCategoryRepository repository;
	private final SkillCategoryMapper mapper;

	@Override
	public SkillCategoryResponse create(SkillCategoryRequest request) {

		if (repository.existsByName(request.getName())) {
			throw new DuplicateResourceException("Skill category already exists.");
		}

		SkillCategory category = mapper.toEntity(request);

		return mapper.toResponse(repository.save(category));
	}

	@Override
	public SkillCategoryResponse update(Long id, SkillCategoryRequest request) {

		SkillCategory category = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Category not found"));

		mapper.updateEntity(category, request);

		return mapper.toResponse(repository.save(category));
	}

	@Override
	public List<SkillCategoryResponse> getAll() {

		return repository.findByActiveTrueOrderByDisplayOrderAsc()

				.stream()

				.map(mapper::toResponse)

				.toList();

	}

	@Override
	public void delete(Long id) {

		SkillCategory category = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Category not found"));

		repository.delete(category);

	}

}