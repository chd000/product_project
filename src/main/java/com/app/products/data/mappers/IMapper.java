package com.app.products.data.mappers;

import java.util.List;

public interface IMapper<D, B> {

    D convert(B b);

    List<D> convertList(List<B> list);
}