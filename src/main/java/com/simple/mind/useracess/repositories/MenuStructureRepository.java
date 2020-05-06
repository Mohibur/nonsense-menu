package com.simple.mind.useracess.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.simple.mind.useracess.models.MenuStructure;

public interface MenuStructureRepository extends MongoRepository<MenuStructure, String> {

}
