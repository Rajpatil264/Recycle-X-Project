package com.recycleX.interfaces;

import java.util.List;

import com.recycleX.entities.Admin;

public interface AdminServiceable {
	public Admin verifyAdmin(String email, String rawPasswd);

	public int saveAdmin(Admin admin);

	public int updateAdmin(int adminId, Admin admin);
	
	public List<Admin> fetchAllAdmins();
	
	public int deleteAdmin(int adminId);
}
