package shop.model.entities;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    String imageUrl;

    String name;

    String description;

    BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "category_id")
    Category category;

    public Integer getId() {
        return id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getPrice() {
        return price;
    }
}
