package com.nihal_portfolio.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nihal_portfolio.entity.ProjectImage;

@Repository
public interface ProjectImageRepository extends JpaRepository<ProjectImage, Long> {

}