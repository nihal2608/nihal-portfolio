package com.nihal_portfolio.respository;

import com.nihal_portfolio.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
	long countByReadFalse();
}
