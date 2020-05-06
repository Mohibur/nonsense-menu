package com.simple.mind.useracess.bean;

import lombok.Data;

@Data
public class Response<T> {
	Boolean success;
	String message;
	T data;

	public Response(Boolean b, String m, T d) {
		success = b;
		message = m;
		data = d;
	}
}
