

package se.kth.sda.skeleton.posts;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import se.kth.sda.skeleton.comments.Comment;
import se.kth.sda.skeleton.user.User;

/**
 * this class implements the model for post objects and interactions with associated classes
 * <p>
 *  initialises the posts fields, getters and setter
 *  designates entity relationships using hibernate annotation
 *  dictates table constraints
 * </p>
 *
 * @author Sujan Varma
 * @author Nicholas Hartman
 * @author Marcela Fortis Felix
 * @version 1.0
 *
 */

@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String body;
    private String title;
    private Date created;
    private Date updated;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "email")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @NotNull
    private User postOwner;

    @OneToMany(mappedBy = "commentOwner")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Comment> comments;

    // stores the date created for every post
    @PrePersist
    protected void onCreate() {
        created = new Date();
    }

    // stores the date updated for every post
    @PreUpdate
    protected void onUpdate() {
        updated = new Date();
    }

    public Post() {
    }

    public Post(String body) {
        this.body = body;
    }

    /**
     *
     * sets the new data to update a post
     *
     * @param updatedPost an object holding the updated state of the post fields
     * @return returns the update post
     */
    public Post setUpdatePostValues(Post updatedPost) {
        if (updatedPost.getBody() == null) {
            updatedPost.setBody(this.getBody());
        }
        if (updatedPost.getTitle() == null) {
            updatedPost.setTitle(this.getTitle());
        }
        return updatedPost;
    }

    //returns the title field in the post object
    public String getTitle() {
        return title;
    }

    //sets the title field in the post object
    public void setTitle(String title) {
        this.title = title;
    }

    //returns the id field in the post object
    public Long getId() {
        return id;
    }

    //sets the id field in the post object
    public void setId(Long id) {
        this.id = id;
    }

    //returns the body field in the post object
    public String getBody() {
        return body;
    }

    //sets the body field in the post object
    public void setBody(String body) {
        this.body = body;
    }

    //returns the postowner(user) field in the post object
    public User getPostOwner() {
        return this.postOwner;
    }

    //sets the postowner(user) field in the post object
    public void setPostOwner(User postOwner) {
        this.postOwner = postOwner;
    }

    //returns a list of comments owned by a post
    public List<Comment> getComments() {
        return this.comments;
    }

    //sets a list of comments owned by a post
    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    //returns date created field in the post object
    public Date getCreated() {
        return this.created;
    }

    //sets date created field in the post object
    public void setCreated(Date created) {
        this.created = created;
    }

    //returns the date updated field in the post object
    public Date getUpdated() {
        return this.updated;
    }

    //sets the date updated field in the post object
    public void setUpdated(Date updated) {
        this.updated = updated;
    }

}
