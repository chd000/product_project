package com.app.products.data.mappers.implementations;

import com.app.products.data.dto.ProductDto;
import com.app.products.data.entities.Product;
import com.app.products.data.mappers.BaseMapper;
import org.springframework.stereotype.Component;

@Component("toProductMapper")
public class ProductDtoToProductMapper extends BaseMapper<Product, ProductDto> {

    @Override
    public Product convert(ProductDto productDto) {
        return new Product(
                productDto.getId(),
                productDto.getName(),
                productDto.getPrice()
        );
    }
}