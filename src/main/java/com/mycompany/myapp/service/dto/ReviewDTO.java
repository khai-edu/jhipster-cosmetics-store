package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Review} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ReviewDTO implements Serializable {

    private Long id;

    @NotNull
    @Min(value = 1)
    @Max(value = 5)
    private Integer rating;

    private String comment;

    private ProductDTO product;

    private CustomerDTO customer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }

    public CustomerDTO getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerDTO customer) {
        this.customer = customer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ReviewDTO)) {
            return false;
        }

        ReviewDTO reviewDTO = (ReviewDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, reviewDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ReviewDTO{" +
            "id=" + getId() +
            ", rating=" + getRating() +
            ", comment='" + getComment() + "'" +
            ", product=" + getProduct() +
            ", customer=" + getCustomer() +
            "}";
    }
}
