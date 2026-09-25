package com.nihal_portfolio.entity;

import com.nihal_portfolio.common.BaseEntity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="tbl_skills")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Skill extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false,length=100)
    private String skillName;

    @Column(nullable=false)
    private Integer percentage;

    private String icon;

    private String color;

    @Column(name="display_order")
    @Builder.Default
    private Integer displayOrder=1;

    @Builder.Default
    private Boolean active=true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="category_id")
    private SkillCategory category;

}