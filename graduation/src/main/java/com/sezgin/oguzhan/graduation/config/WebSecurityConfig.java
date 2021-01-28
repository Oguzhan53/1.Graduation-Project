package com.sezgin.oguzhan.graduation.config;

import com.google.common.collect.ImmutableList;
import com.sezgin.oguzhan.graduation.model.MyUserDeatils;
import com.sezgin.oguzhan.graduation.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

import static javax.servlet.http.HttpServletResponse.*;

//@EnableWebSecurity
//public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//
//        http.cors().and().csrf().disable();
//    }
//
//
//    @Bean
//    CorsConfigurationSource corsConfigurationSource() {
//
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("*"));
//        configuration.setAllowedMethods(Arrays.asList("*"));
//        configuration.setAllowedHeaders(Arrays.asList("*"));
//        configuration.setAllowCredentials(true);
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
//}

@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(
        prePostEnabled = true,
        securedEnabled = true,
        jsr250Enabled = true
)
public class WebSecurityConfig {

    private static final String[] AUTH_WHITELIST = { //
            "/h2-console", //
            "/h2-console/**", //
            "/v2/api-docs", //
            "/swagger-resources", //
            "/swagger-resources/**", //
            "/configuration/ui", //
            "/configuration/security", //
            "/swagger-ui.html", //
            "/webjars/**", //
            "/graphiql", //
            "/api/graphql", //

    };

    @Configuration
    public static class AdminSecuriyConfig extends WebSecurityConfigurerAdapter {

        @Autowired
        private AdminService adminService;


        @Bean
        protected UserDetailsService userDetailsService() {

            return adminService;
        }


        @Autowired
        private PasswordEncoder encoder;


        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception {

            auth.userDetailsService(userDetailsService()).passwordEncoder(encoder);
        }


        @Override
        protected void configure(HttpSecurity http) throws Exception {

            http.cors().and().authorizeRequests()
                    .antMatchers(AUTH_WHITELIST).permitAll()
                    .antMatchers("/api/admin/**").access("hasRole('ROLE_ADMIN')")
                    .antMatchers("/api/lecturer/**").access("hasRole('ROLE_LECTURER')")
                    .antMatchers("/api/student/**").access("hasRole('ROLE_STUDENT')")
                    .anyRequest().hasAnyRole("ADMIN", "STUDENT", "LECTURER")
                    .and()
                    .exceptionHandling()
                    .accessDeniedHandler((req, resp, ex) -> resp.setStatus(
                            SC_FORBIDDEN)) // if someone tries to access protected resource but doesn't have enough permissions
                    .authenticationEntryPoint((req, resp, ex) -> resp.setStatus(SC_UNAUTHORIZED)).and()
                    .formLogin()
                    .loginProcessingUrl("/login")
                    .successHandler(successHandler()) // success authentication
                    .failureHandler((req, resp, ex) -> resp.setStatus(SC_FORBIDDEN)).and() // bad credentials
                    .sessionManagement()
                    .invalidSessionStrategy((req, resp) -> resp.setStatus(SC_UNAUTHORIZED))
                    .and()
                    .logout()
                    .logoutUrl("/logout")
                    .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler())
                    .and()
                    .csrf().disable();
        }


        private AuthenticationSuccessHandler successHandler() {

            return new AuthenticationSuccessHandler() {

                @Override
                public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                                    Authentication authentication)
                        throws IOException, ServletException {

                    response.setStatus(200);
                    MyUserDeatils obj = (MyUserDeatils) authentication.getPrincipal();
                    if("ROLE_ADMIN".equals(obj.getUserRole().getName())) {
                        response.setIntHeader("User", 0);
                    } else if("ROLE_LECTURER".equals(obj.getUserRole().getName())) {
                        response.setIntHeader("User", 1);
                    } else if("ROLE_STUDENT".equals(obj.getUserRole().getName())) {
                        response.setIntHeader("User", 2);
                    } else {
                        response.setIntHeader("User", -1);
                    }
                }
            };
        }
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(ImmutableList.of("*"));
        configuration.setAllowedMethods(ImmutableList.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(
                ImmutableList.of("Authorization", "Cache-Control", "Content-Type", "Cookie", "Referer", "User-Agent",
                        "Set-Cookie", "User"));
        configuration.setExposedHeaders(
                ImmutableList.of("Authorization", "Cache-Control", "Content-Type", "Cookie", "Referer", "User-Agent",
                        "Set-Cookie", "User"));
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}








