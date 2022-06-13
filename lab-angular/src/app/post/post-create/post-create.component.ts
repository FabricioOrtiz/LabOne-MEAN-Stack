import { Component, OnInit, EventEmitter, Output } from '@angular/core';

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
    this.postCreated = new EventEmitter();
  }

  ngOnInit(): void {
  }

  onAddPost(){
    const post = {
      title : this.enteredTitle,
      content : this.enteredPost
    }

    this.postCreated.emit(post);
  }

}
