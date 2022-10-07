package com.hodophilia.SEbackend.security.services;


import java.util.Optional;

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
	  
	  public void processOAuthPostLogin(String username, String name) {
		  System.out.print("here3");
		  String userName[] = username.split("@");
		  System.out.println(userName[0]);
	        
	                //.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
	        System.out.println("here7");
	        if (!userRepository.existsByEmail(username)) {
	        //if (existUser == null) {
	        	System.out.println("here6");
	        	System.out.println(username);
	        	
	            User newUser = new User(userName[0],username,"password@123",name,name,Provider.GOOGLE);

	            
	            System.out.println("here7");
	            userRepository.save(newUser);  
	        }  
	       // }
	         
	    }
}
