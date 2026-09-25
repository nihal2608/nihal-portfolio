package com.nihal_portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_activity_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityLog {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// e.g. "MESSAGE_RECEIVED", "PROJECT_CREATED", "PROJECT_UPDATED",
	// "PROJECT_DELETED", "SKILL_CREATED", "LOGIN", "USER_REGISTERED"
	@Column(nullable = false)
	private String type;

	private String description;

	@Column(nullable = false)
	private LocalDateTime createdAt;
}
