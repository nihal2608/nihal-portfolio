package com.nihal_portfolio.enums;

public enum Role {
	// SUPER_ADMIN: full access to everything, and the only role that can
	//              create other admins / assign modules.
	// ADMIN:       an admin whose access is limited to whichever Modules
	//              have been assigned to them.
	// USER:        no admin panel access at all (reserved for future use,
	//              e.g. if you ever want non-admin registered accounts).
	SUPER_ADMIN,
	ADMIN,
	USER
}
