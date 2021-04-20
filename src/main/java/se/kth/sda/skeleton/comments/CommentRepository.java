package se.kth.sda.skeleton.comments;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * this interface imports the Jpa functionality for the comment repository
 *
 * @author Nicholas Hartman
 * @author Sujan Varma
 * @author Marcela Fortis Felix
 * @version 1.0
 *
 */

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByCommentOwner(Long commentOwner);
}
