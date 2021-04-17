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

@RequestMapping("/posts")
@RestController
public class PostController {

    PostRepository postRepository;
    PostService postService;
    UserService userService;
    CommentRepository commentRepository;

    @Autowired
    public PostController(PostRepository postRepository, PostService postService, UserService userService) {
        this.postRepository = postRepository;
        this.postService = postService;
        this.userService = userService;
    }

    @GetMapping // should return all posts.
    public List<Post> listAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts;
    }

    @GetMapping("/{id}") // should return a specific post based on the provided id.
    public ResponseEntity<Post> getPost(@PathVariable Long id) {
        Post post = postRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        return ResponseEntity.ok(post);
    }

    // @PostMapping // should create a new post
    // public ResponseEntity<Post> createPost(@RequestBody Post post) {
    // postRepository.save(post);
    // return ResponseEntity.status(HttpStatus.CREATED).body(post);
    // }

    @PostMapping // Create a new post on User given by User
    public ResponseEntity<Post> createUserPost(@RequestBody Post post, Principal principal) {
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        post.setPostOwner(user);
        postRepository.save(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(post);

    }

    // @PostMapping // should create a new post
    // public ResponseEntity<Post> createPost(@RequestBody Post post, Principal
    // principal) {
    // String userName = principal.getName();
    // User user = userService.findUserByEmail(userName);
    // System.out.println(user.getName());
    // postRepository.save(post);
    // return ResponseEntity.status(HttpStatus.CREATED).body(post);
    // }

    // Need to test functionality
    // @PutMapping("/{id}") // should update the post based on the provided id
    // public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody
    // Post updatedPost, Principal principal) {
    // Post post = postService.updatePost(id, updatedPost, principal);
    // return ResponseEntity.ok(post);
    // }

    // should delete the post based on the provided id

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@PathVariable Long id, Principal principal) {
        Post post = postRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        String userName = principal.getName();
        if (!userName.equals(post.getPostOwner().getEmail())) {
            throw new ResourceNotFoundException();
        }
        postRepository.delete(post);
    }
}
