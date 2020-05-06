package com.simple.mind.useracess.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.simple.mind.useracess.models.ClientsUserList;

public interface ClientsUserListRepository extends MongoRepository<ClientsUserList, String> {
	ClientsUserList findByClientId(String clientId);
}
