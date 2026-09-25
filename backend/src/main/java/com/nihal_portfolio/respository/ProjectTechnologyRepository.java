package com.nihal_portfolio.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nihal_portfolio.entity.ProjectTechnology;

@Repository
public interface ProjectTechnologyRepository extends JpaRepository<ProjectTechnology, Long> {

}