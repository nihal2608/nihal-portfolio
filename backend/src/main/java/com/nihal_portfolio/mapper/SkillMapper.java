package com.nihal_portfolio.mapper;

import org.springframework.stereotype.Component;

import com.nihal_portfolio.entity.Skill;
import com.nihal_portfolio.request.SkillRequest;
import com.nihal_portfolio.response.SkillResponse;

@Component
public class SkillMapper {

	public Skill toEntity(SkillRequest request) {

		return Skill.builder().skillName(request.getSkillName()).percentage(request.getPercentage())
				.icon(request.getIcon()).color(request.getColor()).displayOrder(request.getDisplayOrder()).active(true)
				.build();
	}

	public void updateEntity(Skill skill, SkillRequest request) {

		skill.setSkillName(request.getSkillName());
		skill.setPercentage(request.getPercentage());
		skill.setIcon(request.getIcon());
		skill.setColor(request.getColor());
		skill.setDisplayOrder(request.getDisplayOrder());
	}

	public SkillResponse toResponse(Skill skill) {

		return SkillResponse.builder().id(skill.getId()).skillName(skill.getSkillName())
				.percentage(skill.getPercentage()).icon(skill.getIcon()).color(skill.getColor())
				.displayOrder(skill.getDisplayOrder()).category(skill.getCategory().getName()).build();
	}

}