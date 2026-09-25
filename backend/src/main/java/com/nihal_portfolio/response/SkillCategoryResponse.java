package com.nihal_portfolio.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SkillCategoryResponse {

    private Long id;

    private String name;

    private String icon;

    private Integer displayOrder;

}