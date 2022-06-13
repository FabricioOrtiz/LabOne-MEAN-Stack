import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle;
  enteredPost;
  @Output() postCreated;
  constructor() { 
    this.enteredPost = '';
    this.enteredTitle = '';
    this.postCreated = new EventEmitter<Post>();
  }

  ngOnInit(): void {
  }

  onAddPost(form: NgForm){
    if(!form.valid){
      return;
    }  
    const post : Post = {
      title : form.value.title,
      content : form.value.content
    }

    this.postCreated.emit(post);
  }

}
