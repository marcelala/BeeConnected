package se.kth.sda.skeleton.posts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.kth.sda.skeleton.ResourceNotFoundException;

import java.util.List;

/*
    @TODO create the methods needed to implement the API.
    Don't forget to add necessary annotations.
 */
@RequestMapping("/posts")
@RestController
public class PostController {

    PostRepository postRepository;
    PostService postService;

    @Autowired
    public PostController(PostRepository postRepository, PostService postService) {
        this.postRepository = postRepository;
        this.postService = postService;
    }

    @GetMapping //should return all posts.
    public List<Post> listAllPosts(){
        List<Post> posts = postRepository.findAll();
        return posts;
    }

    @GetMapping("/{id}") //should return a specific post based on the provided id.
    public ResponseEntity<Post> getArticle(@PathVariable Long id){
        Post post = postRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        return ResponseEntity.ok(post);
    }

    @PostMapping //should create a new post
    public ResponseEntity<Post> createPost(@RequestBody Post post){
        postRepository.save(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(post);
    }

    @PutMapping("/{id}") //should update the post based on the provided id
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post updatedPost){
        Post post = postService.updatePost(id, updatedPost);
        return ResponseEntity.ok(post);
    }

    @DeleteMapping("/{id}") //should delete the post based on the provided id
    public ResponseEntity<Post> deleteArticle(@PathVariable Long id){
        Post post = postRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        postRepository.delete(post);
        return ResponseEntity.ok(post);
    }
}
