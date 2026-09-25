package com.nihal_portfolio.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SkillCategoryRequest {

    @NotBlank(message="Category Name Required")
    private String name;

    private String icon;

    private Integer displayOrder;

}