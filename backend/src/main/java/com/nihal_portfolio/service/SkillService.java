package com.nihal_portfolio.service;

import java.util.List;

import com.nihal_portfolio.request.SkillRequest;
import com.nihal_portfolio.response.SkillResponse;

public interface SkillService {

	SkillResponse create(SkillRequest request);

	SkillResponse update(Long id, SkillRequest request);

	SkillResponse getById(Long id);

	List<SkillResponse> getAll();

	void delete(Long id);

}