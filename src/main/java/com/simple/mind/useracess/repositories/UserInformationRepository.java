package com.simple.mind.useracess.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.simple.mind.useracess.models.UserInformation;

public interface UserInformationRepository extends MongoRepository<UserInformation, String> {

}
