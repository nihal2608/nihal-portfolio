package com.nihal_portfolio.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SkillResponse {

    private Long id;

    private String skillName;

    private Integer percentage;

    private String icon;

    private String color;

    private Integer displayOrder;

    private String category;

}