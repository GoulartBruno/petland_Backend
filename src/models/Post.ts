export interface PostDB {
  post_id: string;
  text: string;
  image: string;
  likes: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  user_name: string;
}

export interface PostModel {
  post_id: string;
  text: string;
  image: string;
  likes: number;
  created_at: string;
  updated_at: string;
  creator: {
    creator_id: string;
    creator_name: string;
  };
}

export class Post {
  constructor(
    private postId: string,
    private text: string,
    private image: string,
    private likes: number,
    private createdAt: string,
    private updatedAt: string,
    private creatorId: string,
    private creatorName: string
  ) {}

  public getPostId(): string {
    return this.postId;
  }
  public setPostId(value: string): void {
    this.postId = value;
  }

  public getText(): string {
    return this.text;
  }
  public setText(value: string): void {
    this.text = value;
  }

  public getImage(): string {
    return this.image;
  }
  public setImage(value: string): void {
    this.image = value;
  }

  public getLikes(): number {
    return this.likes;
  }
  public setLikes(value: number): void {
    this.likes = value;
  }

  public getCreatedAt(): string {
    return this.createdAt;
  }
  public setCreatedAt(value: string): void {
    this.createdAt = value;
  }

  public getUpdatedAt(): string {
    return this.updatedAt;
  }
  public setUpdatedAt(value: string): void {
    this.updatedAt = value;
  }

  public getCreatorId(): string {
    return this.creatorId;
  }
  public setCreatorId(value: string): void {
    this.creatorId = value;
  }
  public getCreatorName(): string {
    return this.creatorName;
  }
  public setCreatorName(value: string): void {
    this.creatorName = value;
  }

  public toDBModel(): PostDB {
    return {
      post_id: this.postId,
      text: this.text,
      image: this.image,
      likes: this.likes,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      user_id: this.creatorId,
      user_name: this.creatorName,
    };
  }

  public toBusinessModel(): PostModel {
    return {
      post_id: this.postId,
      text: this.text,
      image: this.image,
      likes: this.likes,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      creator: {
        creator_id: this.creatorId,
        creator_name: this.creatorName,
      },
    };
  }
}
