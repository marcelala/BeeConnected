package se.kth.sda.skeleton.comments;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import se.kth.sda.skeleton.posts.Post;
import se.kth.sda.skeleton.user.User;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String body;

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

    public Comment() {
    }

    public Comment(String body) {

        this.body = body;

    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBody() {
        return this.body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Post getCommentOwner() {
        return this.commentOwner;
    }

    public void setCommentOwner(Post commentOwner) {
        this.commentOwner = commentOwner;
    }

    public User getUserCommentOwner() {
        return this.userCommentOwner;
    }

    public void setUserCommentOwner(User userCommentOwner) {
        this.userCommentOwner = userCommentOwner;
    }

}