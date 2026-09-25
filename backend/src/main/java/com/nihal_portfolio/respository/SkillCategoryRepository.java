package com.nihal_portfolio.respository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nihal_portfolio.entity.SkillCategory;
@Repository
public interface SkillCategoryRepository extends JpaRepository<SkillCategory, Long> {

	Optional<SkillCategory> findByName(String name);

	boolean existsByName(String name);

	List<SkillCategory> findByActiveTrueOrderByDisplayOrderAsc();

}