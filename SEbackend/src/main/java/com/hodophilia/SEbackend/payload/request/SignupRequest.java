package com.hodophilia.SEbackend.payload.request;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.hodophilia.SEbackend.models.Provider;

public class SignupRequest {

    private final int USERNAME_MIN = 3;
    private final int USERNAME_MAX = 20;
    private final int NAME_MAX = 50;
    private final int PASS_MIN = 6;
    private final int PASS_MAX = 40;

	@NotBlank(message = "Username field cannot be blank.")
    @Size(min = USERNAME_MIN, max = USERNAME_MAX, message="Username must be between " + USERNAME_MIN + " and " + USERNAME_MAX + " characters.")
    private String username;
 
    @NotBlank(message = "Email field cannot be blank.")
    @Size(max = NAME_MAX, message="Email must be no more than " + NAME_MAX + " characters.")
    @Email(message = "Email field must be a valid email.")
    private String email;
    
    //private Set<String> role;
    
    @NotBlank(message = "First name field cannot be blank.")
    @Size(max = NAME_MAX, message = "First name must be at most " + NAME_MAX + " characters.")
    private String FName;
    
    @NotBlank(message = "Last name field cannot be blank.")
    @Size(max = NAME_MAX, message = "Last name must be at most " + NAME_MAX + " characters.")
    private String LName;
    
    
	public String getFName() {
		return FName;
	}

	public void setFName(String fName) {
		this.FName = fName;
	}

	public String getLName() {
		return LName;
	}

	public void setLName(String lName) {
		this.LName = lName;
	}
    
    @NotBlank(message = "Password field cannot be blank.")
    @Size(min = PASS_MIN, max = PASS_MAX, message = "Password must be between " + PASS_MIN + " and " + PASS_MAX
            + " characters.")
    private String password;
  
    public String getUsername() {
    	return username;
    }
 
    public void setUsername(String username) {
    	this.username = username;
    }
 
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
    }
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
    
}
