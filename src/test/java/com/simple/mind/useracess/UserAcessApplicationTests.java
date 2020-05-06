package com.simple.mind.useracess;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.simple.mind.useracess.models.Organization;
import com.simple.mind.useracess.repositories.OrganizationRepository;

@SpringBootTest
class UserAcessApplicationTests {

	@Autowired
	OrganizationRepository orgRepo;

	@Test
	void contextLoads() {
		String id = "5eaab670b2a6af18a14e9eb0";
		Optional<Organization> orgOptional = orgRepo.findById(id);
		if (!orgOptional.isEmpty())
			System.out.println(orgOptional.get().toString());
		else {
			System.out.println("fuck yall");
		}
	}
}
