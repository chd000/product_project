package com.app.products.data.dao;

import com.app.products.data.entities.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface ProductRepository extends CrudRepository<Product, Integer> {

    @Query("SELECT p FROM product p WHERE p.id=?1")
    Optional<Product> findById(Integer id);

}