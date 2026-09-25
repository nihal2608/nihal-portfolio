package com.nihal_portfolio.respository;

import com.nihal_portfolio.entity.Module;
import com.nihal_portfolio.enums.ModuleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ModuleRepository extends JpaRepository<Module, Long> {
	Optional<Module> findByName(ModuleName name);
}
