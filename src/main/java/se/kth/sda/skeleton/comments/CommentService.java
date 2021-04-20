package se.kth.sda.skeleton.comments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.kth.sda.skeleton.exception.ResourceNotFoundException;
import se.kth.sda.skeleton.user.User;
import se.kth.sda.skeleton.user.UserService;

import java.security.Principal;

/**
 * this class implements the functionality for the put and delete HTTPS requests for comments
 * <p>
 *  deleted method and update method migrated to this class to balance functionality with the postcontroller
 *  initialises required repositories and services
 * </p>
 *
 * @author Nicholas Hartman
 * @author Sujan Varma
 * @author Marcela Fortis Felix
 * @version 1.0
 *
 */

@Service
public class CommentService {

    CommentRepository commentRepository;
    UserService userService;

    @Autowired
    /**
     * initialises the repository and service
     */
    public CommentService(CommentRepository commentRepository, UserService userService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
    }

    /**
     *
     * updates the comment and returns the updated comment and HTTPS response
     *
     * @param id holds an entered id to a identify a specific comment
     * @param updatedComment holds the object to replace the table entity being updated
     * @param principal object holding the user info
     * @return the updated comment
     */
    public Comment updateComment(Long id, Comment updatedComment, Principal principal) {
        Comment comment = commentRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        // Security measure to ensure a logged in User doesnt access the update Route
        // and update someone elses post.
        if (!userName.equals(comment.getUserCommentOwner().getEmail())) {
            throw new ResourceNotFoundException();

        }
        updatedComment.setId(id);
        updatedComment.setCommentOwner(comment.getCommentOwner());
        updatedComment.setUserCommentOwner(user);
        commentRepository.save(updatedComment);
        return updatedComment;
    }

    /**
     *
     * deletes the comment and returns the updated comment and HTTPS response
     *
     * @param id holds an entered id to a identify a specific comment
     * @param principal object holding the user info
     * @return
     */
    public Comment deleteComment(Long id, Principal principal) {
        Comment comment = commentRepository.findById(id).orElseThrow(ResourceNotFoundException::new);

        String userName = principal.getName();
        // Security measure to ensure a logged in User doesnt access the update Route
        // and update someone elses post.
        if (!userName.equals(comment.getUserCommentOwner().getEmail())) {
            throw new ResourceNotFoundException();
        }
        return comment;
    }
}
