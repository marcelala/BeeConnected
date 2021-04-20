package se.kth.sda.skeleton.posts;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * this interface imports the Jpa functionality for the post repository
 *
 * @author Sujan Varma
 * @author Nicholas Hartman
 * @author Marcela Fortis Felix
 * @version 1.0
 *
 */

public interface PostRepository extends JpaRepository<Post, Long> {
}
