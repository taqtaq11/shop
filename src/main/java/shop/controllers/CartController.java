package shop.controllers;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import shop.model.entities.Product;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class CartController {

    @RequestMapping("/cart")
    public String cart(
            @CookieValue(name = "products")
                    String productsCookie,
            Model model) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.enable(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT);

        Map productsMap = mapper.readValue(productsCookie, HashMap.class);

        List<Product> products = new ArrayList<Product>();
        Map<Integer, BigDecimal> counts = new HashMap<Integer, BigDecimal>();
        Map<Integer, BigDecimal> costs = new HashMap<Integer, BigDecimal>();
        BigDecimal totalCost = BigDecimal.ZERO;

        for (Object key : productsMap.keySet()) {
            Map value = (Map)productsMap.get(key);

            Integer id = Integer.parseInt((String) value.get("id"));
            String name = (String) value.get("name");
            BigDecimal price = new BigDecimal((String) value.get("price"));
            BigDecimal count = BigDecimal.valueOf((Integer) value.get("count"));

            BigDecimal cost = price.multiply(count);

            products.add(new Product(id, name, price));
            counts.put(id, count);
            costs.put(id, cost);

            totalCost = totalCost.add(cost);
        }

        model.addAttribute("products", products);
        model.addAttribute("counts", counts);
        model.addAttribute("costs", costs);
        model.addAttribute("totalCost", totalCost);

        return "buy";
    }
}
