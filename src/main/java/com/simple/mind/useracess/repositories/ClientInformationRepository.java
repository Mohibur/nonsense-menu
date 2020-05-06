package com.simple.mind.useracess.repositories;

import java.util.ArrayList;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.simple.mind.useracess.models.ClientInformation;

public interface ClientInformationRepository extends MongoRepository<ClientInformation, String> {
	ClientInformation findByClientId(String clientId);

	ArrayList<ClientInformation> findByClientName(String clientName);
}
