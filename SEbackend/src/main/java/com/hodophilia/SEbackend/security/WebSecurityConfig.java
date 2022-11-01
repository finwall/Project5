package com.hodophilia.SEbackend.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.hodophilia.SEbackend.payload.response.MessageResponse;
import com.hodophilia.SEbackend.security.jwt.AuthEntryPointJwt;
//import com.hodophilia.SEbackend.security.jwt.AuthTokenFilter;
import com.hodophilia.SEbackend.security.oauth2.OAuth2AuthenticationFailureHandler;
import com.hodophilia.SEbackend.security.oauth2.OAuth2AuthenticationSuccessHandler;
import com.hodophilia.SEbackend.security.services.CustomOAuth2User;
import com.hodophilia.SEbackend.security.services.CustomOAuth2UserService;
import com.hodophilia.SEbackend.security.services.CustomUserDetailsService;
import com.hodophilia.SEbackend.security.services.HttpCookieOAuth2AuthorizationRequestRepository;
//import com.hodophilia.SEbackend.security.services.UserDetailsServiceImpl;

@Configuration
@EnableGlobalMethodSecurity(
		securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true)
public class WebSecurityConfig {
	@Autowired
    private CustomUserDetailsService customUserDetailsService;

    
	
	@Autowired
    private CustomOAuth2UserService oAuthUserService;

	@Autowired
	private AuthEntryPointJwt unauthorizedHandler;
	
	@Autowired
    private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    @Autowired
    private OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

//	@Bean
//	public AuthTokenFilter authenticationJwtTokenFilter() {
//		return new AuthTokenFilter();
//	}
//	
	@Bean
    public TokenAuthenticationFilter tokenAuthenticationFilter() {
        return new TokenAuthenticationFilter();
    }

	
	@Bean
    public HttpCookieOAuth2AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
        return new HttpCookieOAuth2AuthorizationRequestRepository();
    }
	
//	@Override
//    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
//        authenticationManagerBuilder
//                .userDetailsService(customUserDetailsService)
//                .passwordEncoder(passwordEncoder());
//    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
	
    

	@Bean
	  public DaoAuthenticationProvider authenticationProvider() {
	      DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
	       
	      authProvider.setUserDetailsService(customUserDetailsService);
	      authProvider.setPasswordEncoder(passwordEncoder());
	   
	      return authProvider;
	  }


		
	  @Bean
	  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
	    return authConfig.getAuthenticationManager();
	  }

		
	


		@Bean
	  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	    http.cors().and().csrf().disable()
	        .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
	        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
	        .authorizeRequests().antMatchers("/api/**","/api/users/**","/oauth/**").permitAll()
	        .antMatchers("/api/users/test/**","/api/test/**","/api/**").permitAll()
	        .antMatchers("api/**","api/users/**","/auth/**", "/oauth2/**","api/users/oauth2","/**","api/oauth2").permitAll()
	        .anyRequest().authenticated().and().formLogin().permitAll().and().oauth2Login()
	        .authorizationEndpoint()
	        .baseUri("/oauth2/authorize")
	        .authorizationRequestRepository(cookieAuthorizationRequestRepository())
	        .and()
         	.redirectionEndpoint()
         	.baseUri("/oauth2/callback/*")
            .and()
	        .userInfoEndpoint().userService(oAuthUserService).and()
	        .successHandler(oAuth2AuthenticationSuccessHandler)
	        .failureHandler(oAuth2AuthenticationFailureHandler);
//	        .successHandler(new AuthenticationSuccessHandler() {
//	            
//
//                @Override
//                public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
//                        Authentication authentication) throws IOException, ServletException {
//                    
//              
//                    CustomOAuth2User oauthUser = (CustomOAuth2User) authentication.getPrincipal();
//                    System.out.println(oauthUser.getEmail());
//                    userDetailsService.processOAuthPostLogin(oauthUser.getEmail(),oauthUser.getName());
//                   
//                    response.sendRedirect("/login");
//                    
//                    
//                }
//	        })
//	        .failureHandler(new SimpleUrlAuthenticationFailureHandler() {
//        		@Override
//        		public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) 
//        				throws IOException, ServletException {
//        		}
//        });
    
	    http.authenticationProvider(authenticationProvider());

	    http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
	    
	    return http.build();
	  }

		
}
