package com.simple.mind.useracess.models;

import java.util.Date;

import org.springframework.data.annotation.Id;

import com.google.gson.Gson;

import lombok.Data;

@Data
public class AdminInformation {
	@Id
	String id;
	String serviceId;
	String userName;
	String menuPath;
	Date regDate;
	Date expirationDate;

	@Override
	public String toString() {
		return new Gson().toJson(this);
	}
}
