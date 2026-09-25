package com.nihal_portfolio.entity;

import com.nihal_portfolio.enums.Role;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tbl_admin_invites")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminInvite {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true)
	private String email;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role; // ADMIN or SUPER_ADMIN — decided in advance

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "tbl_admin_invite_modules", joinColumns = @JoinColumn(name = "invite_id"), inverseJoinColumns = @JoinColumn(name = "module_id"))
	@Builder.Default
	private Set<Module> modules = new HashSet<>();

	// Who created this invite (just an email, for audit — not a hard FK so
	// deleting the inviter later doesn't cascade-break invite history).
	private String invitedByEmail;

	@Builder.Default
	private boolean accepted = false;

	private LocalDateTime createdAt;

	private LocalDateTime acceptedAt;
}
