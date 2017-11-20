package shop.model.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import shop.model.entities.Category;
import shop.model.entities.Product;

import java.util.Collection;
import java.util.List;

public interface ProductsRepository extends PagingAndSortingRepository<Product, Integer> {
    List<Product> findByCategory_Id(int category_id);
    List<Product> findByCategory_Id(int category_id, Pageable pageable);
    List<Product> findByCategoryIn(List<Category> categories, Pageable pageable);
}
