package com.hodophilia.SEbackend.payload.request;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.hodophilia.SEbackend.models.Provider;

public class SignupRequest {

	@NotBlank(message = "Email field cannot be blank.")
	@Size(max = 50)
    @Email(max = NAME_MAX, message="Email must be no more than " + NAME_MAX + " characters.")
    private String username;
 

    
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
 
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
    
}
