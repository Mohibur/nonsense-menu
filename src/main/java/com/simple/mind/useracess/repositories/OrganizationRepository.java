package com.simple.mind.useracess.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.simple.mind.useracess.models.Organization;

public interface OrganizationRepository extends MongoRepository<Organization, String> {
	Organization findByOrganizationId(String orgId);
	List<Organization> findAllByDeletedIsNullOrDeletedFalse();
}
