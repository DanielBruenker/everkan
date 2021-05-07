package com.example.everkan.auth;

import com.example.everkan.appuser.AppUserRepository;
import com.example.everkan.database.entities.AppUser;
import com.example.everkan.database.entities.AppUserRole;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Arrays;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;


@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Test
    void testSignInWithExistingAppUser() throws Exception {
        // GIVEN
        String uri = "/api/v1/auth/signin";

        String email = "Max.Mustermann@gmail.com";
        String password = "password";

        AppUser appUser = new AppUser(
                "Max",
                "Mustermann",
                email,
                bCryptPasswordEncoder.encode(password),
                AppUserRole.USER,
                false,
                true
        );
        appUserRepository.save(appUser);


        // WHEN
        MvcResult result = mockMvc.perform(post(uri)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .content(
                        EntityUtils.toString(
                                new UrlEncodedFormEntity(
                                        Arrays.asList(
                                                new BasicNameValuePair("username", email),
                                                new BasicNameValuePair("password", password)
                                        )
                                )
                        )
                )
                .accept(MediaType.APPLICATION_JSON))
                .andReturn();

        String responseContentAsString = result.getResponse().getContentAsString();
        JsonNode actualResult = new ObjectMapper().readTree(responseContentAsString);

        //THEN
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());

        // Check if the email key exist
        assertThat(actualResult.has("email")).isTrue();

        // Check if the returned email address equals to the sigin email address
        assertThat(actualResult.get("email").asText()).isEqualTo(email);

        // Check if the id key exist
        assertThat(actualResult.has("id")).isTrue();

        // Check if the returned id equals 1
        assertThat(actualResult.get("id").asInt()).isEqualTo(1);

        // Check if the token key exist
        assertThat(actualResult.has("token")).isTrue();

        // Check if the type key exist
        assertThat(actualResult.has("type")).isTrue();

        // Check if the type equals to "Bearer"
        assertThat(actualResult.get("type").asText()).isEqualTo("Bearer");
    }

    @Test
    void testSignInWithNotExistingAppUser() throws Exception {
        // GIVEN
        String uri = "/api/v1/auth/signin";

        String email = "Max.Mustermann@gmail.com";
        String password = "password";

        // WHEN
        MvcResult result = mockMvc.perform(post(uri)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .content(
                        EntityUtils.toString(
                                new UrlEncodedFormEntity(
                                        Arrays.asList(
                                                new BasicNameValuePair("username", email),
                                                new BasicNameValuePair("password", password)
                                        )
                                )
                        )
                )
                .accept(MediaType.APPLICATION_JSON))
                .andReturn();


        // THEN
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

}