package com.nihal_portfolio.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SkillRequest {

    @NotBlank
    private String skillName;

    @NotNull
    @Min(0)
    @Max(100)
    private Integer percentage;

    private String icon;

    private String color;

    private Integer displayOrder;

    @NotNull
    private Long categoryId;

}