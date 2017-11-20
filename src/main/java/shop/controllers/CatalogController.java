package shop.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import shop.model.entities.Category;
import shop.model.entities.Product;
import shop.model.repositories.CategoriesRepository;
import shop.model.repositories.ProductsRepository;

import java.util.ArrayList;
import java.util.List;

@Controller
public class CatalogController {

    private static final int PRODUCTS_PER_PAGE_COUNT = 18;
    private static final String SORTING_COLUMN = "name";

    private final CategoriesRepository categoriesRepository;
    private final ProductsRepository productsRepository;

    @Autowired
    public CatalogController(CategoriesRepository categoriesRepository,
                             ProductsRepository productsRepository) {
        this.categoriesRepository = categoriesRepository;
        this.productsRepository = productsRepository;
    }

    @RequestMapping("/catalog")
    public String redirect() {
        return "redirect:/catalog/1";
    }

    @RequestMapping("/catalog/{category_id}")
    public String display(
        @PathVariable(name = "category_id", required = false)
            Integer categoryId,
        @RequestParam(name = "page", required = false)
            Integer pageNum,
            Model model) {

        if (categoryId == null || categoryId < 1) {
            return "redirect:/catalog/1";
        }

        if (pageNum == null) {
            pageNum = 0;
        }

        Category currentCategory = categoriesRepository.findOne(categoryId);

        if (currentCategory == null) {
            return "redirect:/catalog/1";
        }

        List<Category> categoriesPath = getCategoriesPath(currentCategory);

        List<Category> ancestors = new ArrayList<Category>();
        ancestors.add(currentCategory);
        getAncestors(currentCategory, ancestors);

        List<Product> products = getProducts(ancestors, pageNum);

        model.addAttribute("categoriesPath", categoriesPath);
        model.addAttribute("subCategories", currentCategory.getChildren());
        model.addAttribute("products", products);

        return "catalog";
    }

    private List<Category> getCategoriesPath(Category currentCategory) {
        List<Category> categories = new ArrayList<Category>();

        while (currentCategory != null) {
            categories.add(0, currentCategory);
            currentCategory = currentCategory.getParent();
        }

        return categories;
    }

    private void getAncestors(Category parent, List<Category> ancestors) {
        List<Category> children = parent.getChildren();

        if (children != null && children.size() > 0) {
            ancestors.addAll(children);

            for (Category child : children) {
                getAncestors(child, ancestors);
            }
        }
    }

    private List<Product> getProducts(List<Category> categories, int pageNum) {
        Pageable pageable = createPagination(pageNum, Sort.Direction.ASC,
                SORTING_COLUMN);

        return productsRepository.findByCategoryIn(categories, pageable);
    }

    private Pageable createPagination(int pageNum,
                                      Sort.Direction sortDirection,
                                      String sortBy) {
        return new PageRequest(pageNum, PRODUCTS_PER_PAGE_COUNT,
                sortDirection, sortBy);
    }
}
