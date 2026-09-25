package com.nihal_portfolio.config;

import com.nihal_portfolio.entity.Module;
import com.nihal_portfolio.enums.ModuleName;
import com.nihal_portfolio.respository.ModuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ModuleSeeder implements CommandLineRunner {

	private final ModuleRepository moduleRepository;

	@Override
	public void run(String... args) {
		for (ModuleName name : ModuleName.values()) {
			moduleRepository.findByName(name).orElseGet(() ->
					moduleRepository.save(
							Module.builder()
									.name(name)
									.description(defaultDescription(name))
									.build()
					)
			);
		}
	}

	private String defaultDescription(ModuleName name) {
		return switch (name) {
			case PROFILE -> "Edit profile info, photo and resume";
			case PROJECTS -> "Manage portfolio projects";
			case SKILLS -> "Manage skill categories and skills";
			case EXPERIENCE -> "Manage work experience timeline";
			case MESSAGES -> "View contact form submissions";
			case USERS -> "Manage admin accounts and their module access";
		};
	}
}
