
package se.kth.sda.skeleton.posts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.kth.sda.skeleton.comments.CommentRepository;
import se.kth.sda.skeleton.exception.ResourceNotFoundException;
import se.kth.sda.skeleton.user.User;
import se.kth.sda.skeleton.user.UserService;

import java.security.Principal;
import java.util.List;

/**
 * this class implements the controller functionality for posts
 * <p>
 *  this class outlines the HTTP methods, paths and requests
 *  persistence is implemented using Hibernate annotations
 *  only two methods were migrated to the service class due to most methods being short
 * </p>
 *
 * @author Sujan Varma
 * @author Nicholas Hartman
 * @author Marcela Fortis Felix
 * @version 1.0
 *
 */

@RequestMapping("/posts")
@RestController

public class PostController {

    PostRepository postRepository;
    PostService postService;
    UserService userService;
    CommentRepository commentRepository;

    /**
     * postcontroller constructor to initialise required repositories and services
     *
     * @param postRepository list of post table entities
     * @param postService postservice object for functionality situated in the postservice class
     * @param userService userservice object to import user data
     */
    @Autowired
    public PostController(PostRepository postRepository, PostService postService, UserService userService) {
        this.postRepository = postRepository;
        this.postService = postService;
        this.userService = userService;
    }

    // Return all posts.

    /**
     *returns all posts in the post table
     *
     * @return returns a list of posts
     */
    @GetMapping
    public List<Post> listAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts;
    }

    /**
     *return a specific post based on the postId or ResourceNot found if no post is found.
     *
     * @param id holds an entered id to identify a specific post
     * @return  returns a corresponding post and an HTTPs response
     */
    //
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPost(@PathVariable Long id) {
        Post post = postRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        return ResponseEntity.ok(post);
    }

    /**
     *
     * creates a new post on User given by Logged In User
     *
     * @param post  object to hold the entered data to create a new post
     * @param principal object holding the user info
     * @return returns the newly created post and HTTPs status
     */

    @PostMapping
    public ResponseEntity<Post> createUserPost(@RequestBody Post post, Principal principal) {
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        post.setPostOwner(user);
        postRepository.save(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(post);

    }

    /**
     *
     * calls the update functionality from the PostService class and passes the params
     *
     * @param id holds an entered id to a identify a specific post
     * @param updatedPost holds the object to replace the table entity being updated
     * @param principal object holding the user info
     * @return returns the updated post and HTTPs status
     */

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post updatedPost, Principal principal) {
        Post post = postService.updatePost(id, updatedPost, principal);
        return ResponseEntity.ok(post);
    }

    /**
     *
     * calls the delete functionality from the PostService class and passes the params
     *
     * @param id holds an entered id to a identify a specific post
     * @param principal object holding the user info
     */

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@PathVariable Long id, Principal principal) {
        Post post = postService.deletePost(id, principal);
        postRepository.delete(post);
    }
}
