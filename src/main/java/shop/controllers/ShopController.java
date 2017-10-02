package shop.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ShopController {

    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @RequestMapping("/about")
    public String about() {
        return "about";
    }

    @RequestMapping("/contacts")
    public String contacts() {
        return "contacts";
    }

    @RequestMapping("/cart")
    public String cart() {
        return "cart";
    }
}
