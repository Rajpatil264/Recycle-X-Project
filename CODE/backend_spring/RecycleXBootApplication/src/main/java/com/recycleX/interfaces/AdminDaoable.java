package com.recycleX.interfaces;

import java.util.List;

import com.recycleX.entities.Admin;

public interface AdminDaoable {
	public Admin findAdminByEmail(String email);

	public int save(Admin admin);

	public int update(int adminId, Admin admin);
	
	public List<Admin> findAllAdmins();
	
	public int delete(int adminId);
}