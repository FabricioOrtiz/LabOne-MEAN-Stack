import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle;
  enteredPost;
  constructor(public postsService: PostsService) { 
    this.enteredPost = '';
    this.enteredTitle = '';
  }

  ngOnInit(): void {
    
  }

  onAddPost(form: NgForm){
    if(!form.valid){
      return;
    }  

    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

}
