package com.hodophilia.SEbackend.payload.response;

import lombok.AllArgsConstructor;

import lombok.Data;

@Data
public class SignupResponse {
    private boolean mfa;
    private String secretImageUri;
    
	public boolean isMfa() {
		return mfa;
	}
	public void setMfa(boolean mfa) {
		this.mfa = mfa;
	}
	public SignupResponse(boolean mfa, String secretImageUri) {
		super();
		this.mfa = mfa;
		this.secretImageUri = secretImageUri;
	}
	public String getSecretImageUri() {
		return secretImageUri;
	}
	public void setSecretImageUri(String secretImageUri) {
		this.secretImageUri = secretImageUri;
	}
}
