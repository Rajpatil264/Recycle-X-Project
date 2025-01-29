package com.recycleX.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.recycleX.entities.Supplier;
import com.recycleX.interfaces.SupplierServiceable;
import com.recycleX.models.ResponseStructure;

@RestController
@CrossOrigin
@RequestMapping("/admin/supplier")
public class SupplierAdminController {

    @Autowired
    private SupplierServiceable serviceable;

    @GetMapping(value = "/" , produces = "application/json")
    public ResponseStructure getAllSuppliers() {
        List<Supplier> suppliers = serviceable.fetchAllSuppliers();
        if (!suppliers.isEmpty()) {
            return ResponseStructure.onSuccess(200, suppliers, "Suppliers fetched successfully");
        } else {
            return ResponseStructure.onError(404, null, "No suppliers found");
        }
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseStructure getSupplierById(@PathVariable("id") int id) {
        Supplier supplier = serviceable.fetchSupplierById(id);
        if (supplier != null) {
            return ResponseStructure.onSuccess(200, supplier, "Supplier fetched successfully");
        } else {
            return ResponseStructure.onError(404, null, "Supplier not found");
        }
    }
}
