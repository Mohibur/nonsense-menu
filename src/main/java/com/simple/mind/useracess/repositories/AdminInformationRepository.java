package com.simple.mind.useracess.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.simple.mind.useracess.models.AdminInformation;

public interface AdminInformationRepository extends MongoRepository<AdminInformation, String> {
	AdminInformation findByServiceIdAndUserName(String serviceid, String userName);
}
