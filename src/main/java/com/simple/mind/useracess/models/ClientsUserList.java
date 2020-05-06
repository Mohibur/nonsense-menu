package com.simple.mind.useracess.models;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;

import com.google.gson.Gson;

public class ClientsUserList {
	@Id
	String id;
	String organizationId;
	String clientId;
	ArrayList<String> userName;

	@Override
	public String toString() {
		return new Gson().toJson(this);
	}
}
