package com.simple.mind.useracess.controllers;

import java.util.List;
import java.util.Optional;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.common.base.Strings;
import com.google.gson.Gson;
import com.simple.mind.useracess.bean.Response;
import com.simple.mind.useracess.models.MenuStructure;
import com.simple.mind.useracess.models.Organization;
import com.simple.mind.useracess.repositories.OrganizationRepository;

@Controller
public class OrganizationController {
	org.slf4j.Logger logger = LoggerFactory.getLogger(OrganizationController.class);

	@Autowired
	OrganizationRepository orgRepo;

	@GetMapping(value = "/org/list", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Organization>> getOrganizationList() {
		List<Organization> listOrg = orgRepo.findAllByDeletedIsNullOrDeletedFalse();
		for (Organization org : listOrg) {
			org.setMenuStructures(new MenuStructure());
		}
		return ResponseEntity.ok(listOrg);
	}

	@GetMapping(value = "/org/update", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Response<String>> update(String id, String orgName) {
		Optional<Organization> orgOptional = orgRepo.findById(id);
		if (orgOptional.isEmpty()) {
			return ResponseEntity.ok(Response.fail("Item does not exists anymore"));
		}
		Organization org = orgOptional.get();
		org.setDeleted(false);
		org.setOrganizationName(orgName);
		try {
			orgRepo.save(org);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			return ResponseEntity.ok(Response.fail("failed to update"));
		}
		return ResponseEntity.ok(Response.ok("Deleted"));
	}

	@PostMapping(value = "/org/add")
	public ResponseEntity<Response<Organization>> add( //
			@RequestParam(required = true) String orgId, //
			@RequestParam(required = true) String orgName) {
		if (Strings.isNullOrEmpty(orgId) || Strings.isNullOrEmpty(orgName)) {
			return ResponseEntity.ok(Response.fail("Empty Field"));
		}
		if (orgRepo.findByOrganizationId(orgId) != null) {
			return ResponseEntity.ok(Response.fail("Duplicate Entry"));
		}
		Organization org = new Organization();
		org.setId(null);
		org.setOrganizationId(orgId);
		org.setOrganizationName(orgName);
		org.setMenuStructures(null);
		orgRepo.insert(org);
		return ResponseEntity.ok(Response.ok("Organization added", org));
	}

	@PostMapping(value = "/org/remove")
	public ResponseEntity<Response<String>> remove( //
			@RequestParam(required = true, name = "id") String id) {
		Optional<Organization> orgOptional = orgRepo.findById(id);
		if (orgOptional.isEmpty()) {
			return ResponseEntity.ok(Response.fail("Item does not exists anymore"));
		}
		Organization org = orgOptional.get();

		try {
			org.setDeleted(true);
			orgRepo.save(org);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			return ResponseEntity.ok(Response.fail("Deleted"));
		}

		return ResponseEntity.ok(Response.ok("Deleted"));
	}

	@PostMapping(value = "/org/menu")
	public ResponseEntity<Response<MenuStructure>> orgMenu(@RequestParam() String id) {
		Optional<Organization> orgOpt = orgRepo.findById(id);
		if (orgOpt.isEmpty() == true) {
			return ResponseEntity.ok(Response.fail("Requested object not found"));
		}
		MenuStructure menu = orgOpt.get().getMenuStructures();
		if(menu == null) {
			menu = MenuStructure.getBase();
		}
		return ResponseEntity.ok(Response.ok(menu));
	}

	@PostMapping(value = "/org/menu/save")
	public ResponseEntity<Response<MenuStructure>> orgMenuSave(@RequestParam() String id, @RequestParam() String menuStruct ) {
		Optional<Organization> orgOpt = orgRepo.findById(id);
		if (orgOpt.isEmpty() == true) {
			return ResponseEntity.ok(Response.fail("Requested object not found"));
		}
		Gson gson = new Gson();
		MenuStructure mnObj = gson.fromJson(menuStruct, MenuStructure.class);
		orgOpt.get().setMenuStructures(mnObj);
		orgRepo.save(orgOpt.get());
		return ResponseEntity.ok(Response.ok(mnObj));
	}
}
