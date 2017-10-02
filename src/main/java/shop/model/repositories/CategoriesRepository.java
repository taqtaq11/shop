package shop.model.repositories;

import org.springframework.data.repository.CrudRepository;
import shop.model.entities.Category;

import java.util.List;

public interface CategoriesRepository extends CrudRepository<Category, Integer> {
    List<Category> findByParent_Id(int parent_id);
}
