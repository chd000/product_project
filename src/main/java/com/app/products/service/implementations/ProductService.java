package com.app.products.service.implementations;

import com.app.products.data.dao.ProductRepository;
import com.app.products.data.dto.ProductDto;
import com.app.products.data.entities.Product;
import com.app.products.data.mappers.IMapper;
import com.app.products.exciptions.ResourceAlreadyExistsException;
import com.app.products.exciptions.ResourceNotFoundException;
import org.apache.commons.lang3.RandomUtils;
import com.app.products.service.ICrudService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service("productService")
public class ProductService implements ICrudService<ProductDto> {

    private final ProductRepository productRepository;
    private final IMapper<ProductDto, Product> toProductDtoMapper;
    private final IMapper<Product, ProductDto> toProductMapper;
    private final Environment environment;


    public ProductService(ProductRepository productRepository,
                          @Qualifier("toProductDtoMapper") IMapper<ProductDto, Product> toProductDtoMapper,
                          @Qualifier("toProductMapper") IMapper<Product, ProductDto> toProductMapper,
                          Environment environment
    ) {
        this.productRepository = productRepository;
        this.toProductDtoMapper = toProductDtoMapper;
        this.toProductMapper = toProductMapper;
        this.environment = environment;
    }

    @Override
    public List<ProductDto> readAll() {
        List<ProductDto> result = new LinkedList<>();
        for (Product product : productRepository.findAll())
            result.add(toProductDtoMapper.convert(product));
        return result;
    }

    @Override
    public ProductDto read(Integer id) {
        Optional<Product> productOptional = productRepository.findById(id);
        if (productOptional.isEmpty()) {
            Product product = createRandomProduct(id);
            Product savedProduct = productRepository.save(product);
            return toProductDtoMapper.convert(savedProduct);
        } else {
            return toProductDtoMapper.convert(productOptional.get());
        }
    }

    @Override
    public void create(ProductDto productDto) {
        Optional<Product> optionalProduct = productRepository.findById(productDto.getId());
        if (optionalProduct.isPresent())
            throw new ResourceAlreadyExistsException(String.format("Product with id:%d already exists.", productDto.getId()));
        else {
            Product product = toProductMapper.convert(productDto);
            productRepository.save(product);
        }
    }

    @Override
    public void update(ProductDto productDto) {
        Optional<Product> productOptional = productRepository.findById(productDto.getId());
        if (productOptional.isEmpty())
            throw new ResourceNotFoundException(String.format("Product with id: %d doesn't exists.", productDto.getId()));
        else {
            Product foundProduct = productOptional.get();
            foundProduct.setName(productDto.getName());
            foundProduct.setPrice(productDto.getPrice());
            productRepository.save(foundProduct);
        }
    }

    @Override
    public void delete(Integer id) {
        Optional<Product> productOptional = productRepository.findById(id);
        if (productOptional.isEmpty())
            throw new ResourceNotFoundException(String.format("Product with id: %d doesn't exists.", id));
        else
            productRepository.delete(productOptional.get());
    }

    private Product createRandomProduct(Integer id) {
        Product product = new Product();
        product.setName(String.format("Product %d", id));
        product.setPrice(getRandomProductPrice());
        return product;
    }

    private int getRandomProductPrice() {
        return RandomUtils.nextInt(
                Integer.parseInt(environment.getProperty("price.min")),
                Integer.parseInt(environment.getProperty("price.max"))
        );
    }
}