package com.simple.mind.useracess.models;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;

import com.google.gson.Gson;

import lombok.Data;

@Data
public class UserInformation {
	@Id
	String id;
	String userName;
	String lastName;
	String firstName;
	ArrayList<String> organizationIds;

	@Override
	public String toString() {
		return new Gson().toJson(this);
	}
}
