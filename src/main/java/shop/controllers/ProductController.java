package shop.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import shop.model.entities.Product;
import shop.model.repositories.ProductsRepository;

@Controller
public class ProductController {

    private ProductsRepository productsRepository;

    @Autowired
    public ProductController(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
    }

    @RequestMapping("/product")
    public String redirect() {
        return "redirect:/catalog/1";
    }

    @RequestMapping("/product/{id}")
    public String cart(
            @PathVariable(name = "id", required = false)
                    Integer productId,
            Model model) {

        if (productId < 0) {
            return "redirect:/catalog/1";
        }

        Product currentProduct = productsRepository.findOne(productId);

        if (currentProduct == null) {
            return "redirect:/catalog/1";
        }

        model.addAttribute("product", currentProduct);

        return "product";
    }
}
