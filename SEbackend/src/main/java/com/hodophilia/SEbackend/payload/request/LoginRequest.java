package com.hodophilia.SEbackend.payload.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class LoginRequest {

	@NotBlank(message = "Email field cannot be blank.")
	@Email(message = "Email field must be a valid email.")
	private String username;
	
  @NotBlank(message = "Password field cannot be blank.")
	private String password;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
