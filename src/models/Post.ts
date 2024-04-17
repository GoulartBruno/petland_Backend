export interface PostDB {
  post_id: string;
  user_id: string;
  name: string;
  text: string;
  image: string;
  likes: number;
  created_at: string;
  updated_at: string;
}

export interface PostModel {
  post_id: string;
  user_id: string;
  name: string;
  text: string;
  image: string;
  likes: number;
  created_at: string;
  updated_at: string;
  creator: {
    post_id: string;
    name: string;
  };
}

export class Post {
  constructor(
    private postId: string,
    private userId: string,
    private name: string,
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

  public getCreatorIdt(): string {
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
      user_id: this.userId,
      name: this.name,
      text: this.text,
      image: this.image,
      likes: this.likes,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }

  public toBusinessModel(): PostModel {
    return {
      post_id: this.postId,
      user_id: this.userId,
      name: this.name,
      text: this.text,
      image: this.image,
      likes: this.likes,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      creator: {
        post_id: this.creatorId,
        name: this.creatorName,
      },
    };
  }
}
