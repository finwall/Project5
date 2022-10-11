package com.hodophilia.SEbackend.security.services;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hodophilia.SEbackend.models.User;

public class UserDetailsImpl implements UserDetails{
	
	private static final long serialVersionUID = 1L;

	private Long id;

	private String username;
	
	private String FName;
	
	private String LName;

	@JsonIgnore
	private String password;

	private Collection<? extends GrantedAuthority> authorities;
	
	private Map<String, Object> attributes;

	public Map<String, Object> getAttributes() {
		return attributes;
	}

	public void setAttributes(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	public UserDetailsImpl(Long id, String username, /*String email,*/ String password,
			String FName, String LName,Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.FName = FName;
		this.LName = LName;
		this.authorities = authorities;
	}

	public static UserDetailsImpl build(User user) {
		List<GrantedAuthority> authorities = Collections.
                singletonList(new SimpleGrantedAuthority("ROLE_USER"));

		return new UserDetailsImpl(
				user.getId(), 
				user.getUsername(),
				user.getPassword(), 
				user.getFName(),
				user.getLName(),
				authorities);
	}
	
	public static UserDetailsImpl create(User user, Map<String, Object> attributes) {
		UserDetailsImpl userDetailsImpl = UserDetailsImpl.build(user);
		userDetailsImpl.setAttributes(attributes);
        return userDetailsImpl;
    }

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

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public Long getId() {
		return id;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(id, user.id);
	}
}


