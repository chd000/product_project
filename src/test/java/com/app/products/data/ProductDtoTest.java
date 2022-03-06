package com.app.products.data;

import com.app.products.data.dto.ProductDto;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class ProductDtoTest {

    @Test
    void createNewProduct() {
        ProductDto productDto = new ProductDto();
        productDto.setId(1);
        productDto.setName("Test Name");
        productDto.setPrice(1000);

        assertNotNull(productDto);
        assertEquals("Test Name", productDto. getName());
    }
}
