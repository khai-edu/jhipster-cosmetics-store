package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Review;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Review entity.
 */
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    default Optional<Review> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Review> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Review> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct review from Review review left join fetch review.product left join fetch review.customer",
        countQuery = "select count(distinct review) from Review review"
    )
    Page<Review> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct review from Review review left join fetch review.product left join fetch review.customer")
    List<Review> findAllWithToOneRelationships();

    @Query("select review from Review review left join fetch review.product left join fetch review.customer where review.id =:id")
    Optional<Review> findOneWithToOneRelationships(@Param("id") Long id);
}
