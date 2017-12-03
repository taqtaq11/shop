package shop.model.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import shop.model.entities.Category;
import shop.model.entities.Product;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;

public interface ProductsRepository extends PagingAndSortingRepository<Product, Integer> {
    List<Product> findByCategory_Id(int category_id);

    List<Product> findByCategory_Id(int category_id, Pageable pageable);

    List<Product> findByCategoryInAndPriceBetween(
            List<Category> categories,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Pageable pageable);

    List<Product> findByCategoryInAndPriceBetweenAndNameContaining(
            List<Category> categories,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String searchPhrase,
            Pageable pageable);
}
