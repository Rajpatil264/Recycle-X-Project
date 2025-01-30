package com.recycleX.controllers;

import com.recycleX.entities.Admin;
import com.recycleX.entities.ServiceZone;
import com.recycleX.interfaces.AdminServiceable;
import com.recycleX.models.Credentials;
import com.recycleX.models.ResponseStructure;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private AdminServiceable serviceable;

	@GetMapping(value = "/", produces = "application/json")
	public ResponseStructure getAllAdmin() {
		List<Admin> admins = serviceable.fetchAllAdmins();
		if (admins != null && !admins.isEmpty()) {
			return ResponseStructure.onSuccess(200, admins, "Admins fetched successfully.");
		} else {
			return ResponseStructure.onError(404, admins, "No admins found.");
		}
	}

	@PostMapping(value = "/signin", produces = "application/json")
	public ResponseStructure adminLogin(@RequestBody Credentials cred) {
		Admin admin = serviceable.verifyAdmin(cred.getEmail(), cred.getPassword());
		if (admin != null) {
			return ResponseStructure.onLoginSuccess(200, admin, "LoggedIn Successfully..!");
		} else {
			return ResponseStructure.onError(404, admin, "Invalid Credentails");
		}
	}

	@PostMapping(value = "/signup", produces = "application/json")
	public ResponseStructure adminRegister(@RequestBody Admin admin) {
		int status = serviceable.saveAdmin(admin);
		if (status > 0) {
			return ResponseStructure.onSuccess(201, status, "Admin added successfully..!");
		} else {
			return ResponseStructure.onError(404, status, "Something went wrong | Fields are not matching ");
		}
	}

	@PutMapping("/{adminId}")
	public ResponseStructure adminUpdate(@PathVariable int adminId, @RequestBody Admin admin) {
		int status = serviceable.updateAdmin(adminId, admin);
		if (status > 0) {
			return ResponseStructure.onSuccess(200, status, "Admin updated successfully");
		} else {
			return ResponseStructure.onError(404, status, "Admin not found");
		}
	}

	@DeleteMapping("/{adminId}")
	public ResponseStructure adminDelete(@PathVariable int adminId) {
		int status = serviceable.deleteAdmin(adminId);
		if (status > 0) {
			return ResponseStructure.onSuccess(200, status, "Admin deleted successfully");
		} else {
			return ResponseStructure.onError(404, status, "Admin not found");
		}
	}

	@GetMapping(value = "/servicezone", produces = "application/json")
	public ResponseStructure getAllServiceZone() {
		List<ServiceZone> servicezone = serviceable.fetchAllServiceZone();
		if (servicezone != null && !servicezone.isEmpty()) {
			return ResponseStructure.onSuccess(200, servicezone, "ServiceZones fetched successfully.");
		} else {
			return ResponseStructure.onError(404, servicezone, "No service zones found.");
		}
	}

	@PostMapping(value = "/servicezone", produces = "application/json")
	public ResponseStructure addServiceZone(@RequestBody ServiceZone zone) {
		int status = serviceable.addService(zone);
		if (status > 0) {
			return ResponseStructure.onLoginSuccess(200, status, "Zone added successfully..!");
		} else {
			return ResponseStructure.onError(404, status, "Failed to add zone..!");
		}
	}

	@PutMapping("/servicezone/{pincode}")
	public ResponseStructure updateServiceZone(@PathVariable int pincode, @RequestBody ServiceZone zone) {
		int status = serviceable.updateService(pincode, zone);
		if (status > 0) {
			return ResponseStructure.onSuccess(200, status, "Zone updated successfully..!");
		} else {
			return ResponseStructure.onError(404, status, "Zone not found");
		}
	}

	@DeleteMapping("/servicezone/{pincode}")
	public ResponseStructure deleteServiceZone(@PathVariable int pincode) {
		int status = serviceable.deleteService(pincode);
		if (status > 0) {
			return ResponseStructure.onSuccess(200, status, "Zone deleted successfully..!");
		} else {
			return ResponseStructure.onError(404, status, "Zone not found");
		}
	}

}
