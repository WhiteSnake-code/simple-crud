package com.todolist.crud.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todolist.crud.entity.Product;
import com.todolist.crud.repository.ProductRepository;

// Service class for managing Product entities.
 
@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    //  Save a product
    
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }
    //   Get all the products.
     
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    // Get one product by ID.
     
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }
    
    //Update a product
     
    public Product updateProduct(Long id, Product updatedProduct) {
        Optional<Product> existingProduct = productRepository.findById(id);
        if (existingProduct.isPresent()) {
            Product product = existingProduct.get();
            product.setName(updatedProduct.getName());
            product.setPrice(updatedProduct.getPrice());
            product.setQuantity(updatedProduct.getQuantity());
            return productRepository.save(product);
        } else {
            throw new RuntimeException("Product not found");
        }
    }
    // Delete the product by ID.
     
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
