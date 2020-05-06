package com.simple.mind.useracess.models;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;

import com.google.gson.Gson;

import lombok.Data;

@Data
public class Organization {
	@Id
	String id;
	String organizationId;
	String organizationName;
	ArrayList<MenuStructure> menuStructures;
	Boolean deleted;
	@Override
	public String toString() {
		return new Gson().toJson(this);
	}
}
