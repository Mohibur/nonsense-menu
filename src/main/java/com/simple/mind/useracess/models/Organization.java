package com.simple.mind.useracess.models;

import org.springframework.data.annotation.Id;

import com.google.gson.Gson;

import lombok.Data;

@Data
public class Organization {
	@Id
	String id;
	String organizationId;
	String organizationName;
	MenuStructure menuStructures;
	Boolean deleted;
	@Override
	public String toString() {
		return new Gson().toJson(this);
	}
}
