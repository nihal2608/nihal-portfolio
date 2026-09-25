package com.nihal_portfolio.mapper;

import org.springframework.stereotype.Component;

import com.nihal_portfolio.entity.SkillCategory;
import com.nihal_portfolio.request.SkillCategoryRequest;
import com.nihal_portfolio.response.SkillCategoryResponse;

@Component
public class SkillCategoryMapper {

    public SkillCategory toEntity(SkillCategoryRequest request){

        return SkillCategory.builder()

                .name(request.getName())
                .icon(request.getIcon())
                .displayOrder(request.getDisplayOrder())
                .active(true)
                .build();

    }

    public void updateEntity(
            SkillCategory category,
            SkillCategoryRequest request){

        category.setName(request.getName());
        category.setIcon(request.getIcon());
        category.setDisplayOrder(request.getDisplayOrder());

    }

    public SkillCategoryResponse toResponse(
            SkillCategory category){

        return SkillCategoryResponse.builder()

                .id(category.getId())
                .name(category.getName())
                .icon(category.getIcon())
                .displayOrder(category.getDisplayOrder())
                .build();

    }

}