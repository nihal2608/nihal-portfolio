package com.nihal_portfolio.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nihal_portfolio.entity.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

	List<Project> findByActiveTrueOrderByDisplayOrderAsc();

	List<Project> findByCategoryIgnoreCaseAndActiveTrueOrderByDisplayOrderAsc(String category);

	List<Project> findByFeaturedTrueAndActiveTrueOrderByDisplayOrderAsc();

	List<Project> findTop6ByActiveTrueOrderByCreatedAtDesc();

}