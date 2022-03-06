package com.app.products.service;

import java.util.List;

public interface ICrudService<T> {

    List<T> readAll();

    T read(Integer id);

    void create(T t);

    void update(T t);

    void delete(Integer id);
}