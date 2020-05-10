package com.simple.mind.useracess.bean;

import lombok.Data;

@Data
public class Response<T> {
	Boolean success;
	String message;
	T data;

	public Response() {
	}

	public static <T> Response<T> ok(T d) {
		Response<T> res = new Response<T>();
		res.success = true;
		res.message = "success";
		res.data = d;
		return res;
	}
	
	public static <T> Response<T> ok(String message) {
		Response<T> res = new Response<T>();
		res.success = true;
		res.message = message;
		res.data = null;
		return res;
	}

	public static <T> Response<T> ok(String message, T d) {
		Response<T> res = new Response<T>();
		res.success = true;
		res.message = message;
		res.data = d;
		return res;
	}

	public static <T> Response<T> fail() {
		Response<T> res = new Response<T>();
		res.success = false;
		res.message = "failed";
		res.data = null;
		return res;

	}

	public static <T> Response<T> fail(String message) {
		Response<T> res = new Response<T>();
		res.success = false;
		res.message = message;
		res.data = null;
		return res;
	}

	public static <T> Response<T> fail(String message, T data) {
		Response<T> res = new Response<T>();
		res.success = false;
		res.message = message;
		res.data = data;
		return res;
	}
}
