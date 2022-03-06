package com.app.products.data.mappers.implementations;

import com.app.products.data.dto.ProductDto;
import com.app.products.data.entities.Product;
import com.app.products.data.mappers.BaseMapper;
import org.springframework.stereotype.Component;

@Component("toProductDtoMapper")
public class ProductToProductDtoMapper extends BaseMapper<ProductDto, Product> {

    @Override
    public ProductDto convert(Product product) {
        return new ProductDto(
                product.getId(),
                product.getName(),
                product.getPrice()
        );
    }
}