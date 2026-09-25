package com.nihal_portfolio.respository;

import com.nihal_portfolio.entity.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
	List<ActivityLog> findByCreatedAtAfterOrderByCreatedAtAsc(LocalDateTime after);
}
