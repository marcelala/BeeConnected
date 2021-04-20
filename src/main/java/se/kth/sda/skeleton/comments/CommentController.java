package se.kth.sda.skeleton.comments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import se.kth.sda.skeleton.exception.ResourceNotFoundException;
import se.kth.sda.skeleton.posts.Post;
import se.kth.sda.skeleton.posts.PostRepository;
import se.kth.sda.skeleton.user.User;
import se.kth.sda.skeleton.user.UserService;

import java.security.Principal;
import java.util.List;

/**
 * this class implements the controller functionality for comments
 * <p>
 *  this class outlines the HTTP methods, paths and requests
 *  persistence is implemented using Hibernate annotations
 * </p>
 *
 * @author Nicholas Hartman
 * @author Sujan Varma
 * @author Marcela Fortis Felix
 * @version 1.0
 *
 */


@RequestMapping("/comments")
@RestController
public class CommentController {

    CommentRepository commentRepository;
    PostRepository postRepository;
    UserService userService;
    CommentService commentService;

    @Autowired

    /**
     * initialises repositories and services for the comment controller functionality
     */
    public CommentController(CommentRepository commentRepository, PostRepository postRepository,
            UserService userService, CommentService commentService) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userService = userService;
        this.commentService = commentService;
    }

    /**
     *
     * lists all comments for a given post
     *
     * @param postId id of the post
     * @return the comments for the post with the corresponding id
     */
    @GetMapping("/{postId}")
    public ResponseEntity<List<Comment>> listAllCommentsOnPost(@PathVariable Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(ResourceNotFoundException::new);
        return ResponseEntity.ok(post.getComments());
    }

    /**
     *
     * creates a comment on a given post
     *
     * @param postId id of the post
     * @param comment object to hold the fields of the comment
     * @param principal object holding the user info
     * @return the created comment and HTTPs status
     */
    //
    @PostMapping("/{postId}")
    public ResponseEntity<Comment> createComment(@PathVariable Long postId, @RequestBody Comment comment,
            Principal principal) {
        Post post = postRepository.findById(postId).orElseThrow(ResourceNotFoundException::new);

        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        comment.setUserCommentOwner(user);

        comment.setCommentOwner(post);
        commentRepository.save(comment);

        return ResponseEntity.status(HttpStatus.CREATED).body(comment);
    }

    /**
     *
     * calls the update functionality from the CommentService class and passes the params
     *
     * @param commentId id of the comment to be updated
     * @param updatedComment object to hold the new state to update the comment with
     * @param principal object holding the user info
     * @return
     */
    @PutMapping("/{commentId}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long commentId, @RequestBody Comment updatedComment,
            Principal principal) {
        Comment comment = commentService.updateComment(commentId, updatedComment, principal);
        return ResponseEntity.ok(comment);
    }

    /**
     *
     * calls the delete functionality from the CommentService class and passes the params
     *
     * @param commentId id of the comment to be updated
     * @param principal object holding the user info
     */

    @DeleteMapping("/{commentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable Long commentId, Principal principal) {
        Comment comment = commentService.deleteComment(commentId, principal);
        commentRepository.delete(comment);
    }
}