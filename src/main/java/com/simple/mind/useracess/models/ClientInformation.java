package com.simple.mind.useracess.models;

import java.util.HashMap;

import org.springframework.data.annotation.Id;

import com.google.gson.Gson;

import lombok.Data;

@Data
public class ClientInformation {
	@Id
	String clientId;
	String clientName;
	HashMap<String, String> additionaInfo;
	
	@Override
	public String toString() {
		return new Gson().toJson(this);
	}
}
