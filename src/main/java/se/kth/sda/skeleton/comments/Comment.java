
package se.kth.sda.skeleton.comments;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import se.kth.sda.skeleton.posts.Post;
import se.kth.sda.skeleton.user.User;

/**
 * this class implements the model for comment objects and interactions with associated classes
 * <p>
 *  initialises the comment fields, getters and setter
 *  designates entity relationships using hibernate annotation
 *  dictates table constraints
 * </p>
 *
 * @author Nicholas Hartman
 * @author Sujan Varma
 * @author Marcela Fortis Felix
 * @version 1.0
 *
 */

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String body;
    private Date created;
    private Date updated;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @NotNull
    private Post commentOwner;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "email")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(nullable = false)
    @NotNull
    private User userCommentOwner;

    // stores the date created for every comment
    @PrePersist
    protected void onCreate() {
        created = new Date();
    }

    // stores the date updated for every comment
    @PreUpdate
    protected void onUpdate() {
        updated = new Date();
    }

    public Comment() {
    }

    //sets the body field in the comment object
    public Comment(String body) {
        this.body = body;
    }

    //returns the id field in the comment object
    public Long getId() {
        return this.id;
    }

    //sets the id field in the comment object
    public void setId(Long id) {
        this.id = id;
    }

    //returns the body field in the comment object
    public String getBody() {
        return this.body;
    }

    //sets the body field in the comment object
    public void setBody(String body) {
        this.body = body;
    }

    //returns the comment owner in the comment object
    public Post getCommentOwner() {
        return this.commentOwner;
    }

    //sets the body comment owner in the post object
    public void setCommentOwner(Post commentOwner) {
        this.commentOwner = commentOwner;
    }

    //returns the user comment owner in the comment object
    public User getUserCommentOwner() {
        return this.userCommentOwner;
    }

    //sets the user comment owner field in the comment object
    public void setUserCommentOwner(User userCommentOwner) {
        this.userCommentOwner = userCommentOwner;
    }

    //returns the date of the comment object
    public Date getCreated() {
        return this.created;
    }

    //sets the date created field in the comment object
    public void setCreated(Date created) {
        this.created = created;
    }

    //returns the update date of the comment object
    public Date getUpdated() {
        return this.updated;
    }

    //sets the date for comment objects
    public void setUpdated(Date updated) {
        this.updated = updated;
    }

}