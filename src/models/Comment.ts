export interface CommentDB {
  comment_id: string;
  post_id: string;
  user_id: string;
  name: string;
  text: string;
  created_at: string;
}

export interface CommentModel {
  commentId: string;
  postId: string;
  userId: string;
  name: string;
  text: string;
  createdAt: string;
}

export class Comment {
  constructor(
    private commentId: string,
    private postId: string,
    private userId: string,
    private name: string,
    private text: string,
    private createdAt: string
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
  public getName(): string {
    return this.name;
  }
  public setName(value: string): void {
    this.name = value;
  }
  public getText(): string {
    return this.text;
  }
  public setText(): string {
    return this.text;
  }
  public getCreatedAt(value: string): void {
    this.createdAt = value;
  }
  public setCreatedAt(): string {
    return this.createdAt;
  }

  public toDBModel(): CommentDB {
    return {
      comment_id: this.commentId,
      post_id: this.postId,
      user_id: this.userId,
      name: this.name,
      text: this.text,
      created_at: this.createdAt,
    };
  }

  public toBusinessModel(): CommentModel {
    return {
      commentId: this.commentId,
      postId: this.postId,
      userId: this.userId,
      name: this.name,
      text: this.text,
      createdAt: this.createdAt,
    };
  }
}
