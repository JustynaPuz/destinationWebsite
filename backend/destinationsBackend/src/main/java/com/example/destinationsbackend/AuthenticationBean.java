package com.example.destinationsbackend;

import lombok.Getter;

@Getter
public class AuthenticationBean {

	private String message;

	public AuthenticationBean(String message) {
		this.message = message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "HelloWorldbean [message=" + message + "]";
	}
	
	

}
