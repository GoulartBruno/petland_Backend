export interface CommentDB {
  comment_id: string;
  post_id: string;
  text: string;
  created_at: string;
  user_id: string;
}

export interface CommentModel {
  commentId: string;
  postId: string;
  text: string;
  createdAt: string;
  creator: {
    creator_id: string;
    creator_name: string;
  };
}

export interface CommentDBWithCreatorName {
  comment_id: string;
  post_id: string;
  text: string;
  created_at: string;
  user_id: string;
  user_name: string;
}

export class Comment {
  constructor(
    private commentId: string,
    private postId: string,
    private text: string,
    private createdAt: string,
    private userId: string,
    private userName: string
  ) {}

  public getCommentId(): string {
    return this.commentId;
  }
  public setCommentId(value: string): void {
    this.commentId = value;
  }
  public getPostId(): string {
    return this.postId;
  }
  public setPostId(value: string): void {
    this.postId = value;
  }
  public getUserId(): string {
    return this.userId;
  }
  public setUserId(value: string): void {
    this.userId = value;
  }
  public getUsername(): string {
    return this.userName;
  }
  public setUsername(value: string): void {
    this.userName = value;
  }
  public getText(): string {
    return this.text;
  }
  public setText(value: string): void {
    this.text = value;
  }
  public getCreatedAt(): string {
    return this.createdAt;
  }
  public setCreatedAt(value: string): void {
    this.createdAt = value;
  }

  public toCommentDBModel(): CommentDB {
    return {
      comment_id: this.commentId,
      post_id: this.postId,
      text: this.text,
      created_at: this.createdAt,
      user_id: this.userId,
    };
  }

  public toBusinessModel(): CommentModel {
    return {
      commentId: this.commentId,
      postId: this.postId,
      text: this.text,
      createdAt: this.createdAt,
      creator: {
        creator_id: this.userId,
        creator_name: this.userName,
      },
    };
  }
}
