package com.nihal_portfolio.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nihal_portfolio.entity.Skill;

@Repository
public interface SkillRepository extends JpaRepository<Skill,Long>{

    List<Skill> findByActiveTrueOrderByDisplayOrderAsc();

}