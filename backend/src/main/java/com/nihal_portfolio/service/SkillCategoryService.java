package com.nihal_portfolio.service;

import java.util.List;

import com.nihal_portfolio.request.SkillCategoryRequest;
import com.nihal_portfolio.response.SkillCategoryResponse;

public interface SkillCategoryService {

	SkillCategoryResponse create(SkillCategoryRequest request);

	SkillCategoryResponse update(Long id, SkillCategoryRequest request);

	List<SkillCategoryResponse> getAll();

	void delete(Long id);

}