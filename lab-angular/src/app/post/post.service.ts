import { Post } from './post.model';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn:"root"})
export class PostsService{
    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient){

    }

    getPosts(){
        this.http
            .get<{message: string, posts: any}>('http://localhost:3000/api/posts')
            .pipe(map((postData) => {
                return postData.posts.map((post: { title: any; content: any; _id: any; }) => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id
                    };
                });
            }))
            .subscribe((transformedPosts) => {
                this.posts = transformedPosts;
                this.postUpdated.next([...this.posts]);
            });
        
    }

    getPostUpdateListener(){
        return this.postUpdated.asObservable();
    }

    addPost(title: string, content: string){
        const post: Post = {
            id: 'null',
            title: title,
            content: content
        };

        this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
            .subscribe((responseData) =>{
                post.id = responseData.postId;     
                this.posts.push(post);
                this.postUpdated.next([...this.posts]); 
            });
    }

    deletePost(postId: string){
        this.http.delete('http://localhost:3000/api/posts/' + postId)
            .subscribe(() => {
                const updatedPosts = this.posts.filter(x => x.id !== postId);
                console.log(updatedPosts);
                this.posts = updatedPosts;
                this.postUpdated.next([...this.posts]);
            });
    }
}