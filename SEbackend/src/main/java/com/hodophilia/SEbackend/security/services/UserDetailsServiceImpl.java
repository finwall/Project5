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
	  
	  public void processOAuthPostLogin(String username, String name) {
	        if (!userRepository.existsByUsername(username)) {
	        	User newUser = new User(username,"password@123",name,name,Provider.GOOGLE);   
	            userRepository.save(newUser);  
	        }  
	   }
}
