package com.app.products.controllers;

import java.util.List;

public interface ICrudController<T> {

    List<T> readAll();

    T read(Integer id);

    void create(T t);

    void update(T t);

    void delete(Integer id);
}