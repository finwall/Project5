package com.hodophilia.SEbackend.payload.request;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.hodophilia.SEbackend.models.Provider;

public class SignupRequest {
	@NotBlank
	@Size(max = 50)
    @Email
    private String username;
 
    
    @NotBlank
    @Size(max = 50)
    private String FName;
    
    @NotBlank
    @Size(max = 50)
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
    
    @NotBlank
    @Size(min = 6, max = 40)
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
