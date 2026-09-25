package com.nihal_portfolio.serviceImpl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nihal_portfolio.entity.Skill;
import com.nihal_portfolio.entity.SkillCategory;
import com.nihal_portfolio.exception.ResourceNotFoundException;
import com.nihal_portfolio.mapper.SkillMapper;
import com.nihal_portfolio.request.SkillRequest;
import com.nihal_portfolio.response.SkillResponse;
import com.nihal_portfolio.respository.SkillCategoryRepository;
import com.nihal_portfolio.respository.SkillRepository;
import com.nihal_portfolio.service.SkillService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class SkillServiceImpl implements SkillService {

	private final SkillRepository skillRepository;
	private final SkillCategoryRepository categoryRepository;
	private final SkillMapper mapper;

	@Override
	public SkillResponse create(SkillRequest request) {

		SkillCategory category = categoryRepository.findById(request.getCategoryId())
				.orElseThrow(() -> new ResourceNotFoundException("Category not found"));

		Skill skill = mapper.toEntity(request);
		skill.setCategory(category);

		return mapper.toResponse(skillRepository.save(skill));
	}

	@Override
	public SkillResponse update(Long id, SkillRequest request) {

		Skill skill = skillRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Skill not found"));

		SkillCategory category = categoryRepository.findById(request.getCategoryId())
				.orElseThrow(() -> new ResourceNotFoundException("Category not found"));

		mapper.updateEntity(skill, request);
		skill.setCategory(category);

		return mapper.toResponse(skillRepository.save(skill));
	}

	@Override
	@Transactional(readOnly = true)
	public SkillResponse getById(Long id) {

		Skill skill = skillRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Skill not found"));

		return mapper.toResponse(skill);
	}

	@Override
	@Transactional(readOnly = true)
	public List<SkillResponse> getAll() {

		return skillRepository.findByActiveTrueOrderByDisplayOrderAsc().stream().map(mapper::toResponse).toList();
	}

	@Override
	public void delete(Long id) {

		Skill skill = skillRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Skill not found"));

		skillRepository.delete(skill);
	}

}