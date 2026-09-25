package com.nihal_portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String email;

	@Column(nullable = false, length = 2000)
	private String message;

	@Builder.Default
	@Column(name = "is_read")
	private boolean read=false;


	@Builder.Default
	private boolean replied = false;

	@Column(length = 2000)
	private String replyText;

	private LocalDateTime repliedAt;

	private LocalDateTime createdAt;
}
