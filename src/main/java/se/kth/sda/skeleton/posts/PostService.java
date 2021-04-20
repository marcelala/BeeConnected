

package se.kth.sda.skeleton.posts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.kth.sda.skeleton.exception.ResourceNotFoundException;
import se.kth.sda.skeleton.user.User;
import se.kth.sda.skeleton.user.UserService;

import java.security.Principal;

/**
 * this class implements the functionality for the put and delete HTTPS requests for posts
 * <p>
 *  deleted method and update method migrated to this class to balance functionality with the postcontroller
 *  initialises required repositories and services
 * </p>
 *
 * @author Sujan Varma
 * @author Nicholas Hartman
 * @author Marcela Fortis Felix
 * @version 1.0
 *
 */

@Service
public class PostService {

    PostRepository postRepository;
    UserService userService;

    /**
     * postservice constructor to initialise the repositories and services
     * @param postRepository list containing the post table entities
     * @param userService object holding the user data
     */
    @Autowired
    public PostService(PostRepository postRepository, UserService userService) {
        this.postRepository = postRepository;
        this.userService = userService;
    }

    /**
     *
     * updates the post and returns the updated comment and HTTPS response
     *
     * @param id holds an entered id to a identify a specific post
     * @param updatedPost holds the object to replace the table entity being updated
     * @param principal object holding the user info
     * @return the updated post
     */
    public Post updatePost(Long id, Post updatedPost, Principal principal) {
        Post post = postRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        String userName = principal.getName();
        User user = userService.findUserByEmail(userName);
        // Security measure to ensure a logged in User doesnt access the update Route
        // and update someone elses post.
        if (!userName.equals(post.getPostOwner().getEmail())) {
            throw new ResourceNotFoundException();

        }
        updatedPost = post.setUpdatePostValues(updatedPost);
        updatedPost.setId(id);
        updatedPost.setPostOwner(user);
        postRepository.save(updatedPost);
        return updatedPost;
    }

    /**
     *
     * deletes the post and returns the updated comment and HTTPS response
     *
     * @param id holds an entered id to a identify a specific post
     * @param principal object holding the user info
     * @return returns the deleted post
     */
    public Post deletePost(Long id, Principal principal) {
        Post post = postRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        String userName = principal.getName();
        // Security measure to ensure a logged in User doesnt access the update Route
        // and update someone elses post.
        if (!userName.equals(post.getPostOwner().getEmail())) {
            throw new ResourceNotFoundException();
        }
        return post;
    }
}
