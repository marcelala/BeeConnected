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

/*
    @TODO create the methods needed to implement the API.
    Don't forget to add necessary annotations.
 */
@RequestMapping("/comments")
@RestController
public class CommentController {

    CommentRepository commentRepository;
    PostRepository postRepository;
    UserService userService;

    @Autowired
    public CommentController(CommentRepository commentRepository, PostRepository postRepository,
            UserService userService) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userService = userService;
    }


    @GetMapping("/{postId}") // list all comments for a given post
    public ResponseEntity <List<Comment>> listAllCommentsOnPost(@PathVariable Long postId) {
        //should it be accessing the posts
        Post post =postRepository.findById(postId).orElseThrow(ResourceNotFoundException::new);
        return ResponseEntity.ok(post.getComments());
    }

//      Redundant and impractical mapping will be deleted
//    @GetMapping("/{id}")
//    public ResponseEntity<Comment> getComment(@PathVariable Long id) {
//        Comment comment = commentRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
//        return ResponseEntity.ok(comment);
//    }

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

    @DeleteMapping("/{id}")
    public ResponseEntity<Comment> deleteComment(@PathVariable Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        commentRepository.delete(comment);
        return ResponseEntity.ok(comment);
    }
}