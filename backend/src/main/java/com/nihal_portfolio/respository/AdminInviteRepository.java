package com.nihal_portfolio.respository;

import com.nihal_portfolio.entity.AdminInvite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminInviteRepository extends JpaRepository<AdminInvite, Long> {
	Optional<AdminInvite> findByEmailAndAcceptedFalse(String email);
	Optional<AdminInvite> findByEmail(String email);
}
