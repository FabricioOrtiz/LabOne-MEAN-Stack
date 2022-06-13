import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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

  onAddPost(){
    const post : Post = {
      title : this.enteredTitle,
      content : this.enteredPost
    }

    this.postCreated.emit(post);
  }

}
