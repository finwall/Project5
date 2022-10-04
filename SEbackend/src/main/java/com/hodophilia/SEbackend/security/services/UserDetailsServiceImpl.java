package com.hodophilia.SEbackend.security.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hodophilia.SEbackend.models.Provider;

import com.hodophilia.SEbackend.models.User;
import com.hodophilia.SEbackend.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	@Autowired
	  UserRepository userRepository;

	  @Override
	  @Transactional
	  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	    User user = userRepository.findByUsername(username)
	        .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

	    return UserDetailsImpl.build(user);
	  }
	  
	  public void processOAuthPostLogin(String username) {
		  System.out.print("here3");
	        User existUser = userRepository.findByUsername(username)
	                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
	         
	        if (existUser == null) {
	        	System.out.print("here6");
	            User newUser = new User(username,username,"Dummy","dummy","password@123");
	            newUser.setUsername(username);
	            newUser.setEmail(username);
	            newUser.setFName("Dummy");
	            newUser.setLName("Dummy");
	            newUser.setPassword("password@123");
	            newUser.setProvider(Provider.GOOGLE);
	            
	            
	            
	             
	            userRepository.save(newUser);        
	        }
	         
	    }
}
