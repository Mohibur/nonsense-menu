package com.simple.mind.useracess.models;

import java.util.ArrayList;

import com.google.gson.Gson;

import lombok.Data;

@Data
public class MenuStructure {
	String menuName;
	String menuTitle;
	boolean hasAdmin = false;
	ArrayList<MenuStructure> children;

	@Override
	public String toString() {
		return new Gson().toJson(this);
	}
}
