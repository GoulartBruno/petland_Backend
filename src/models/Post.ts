export interface PostDB {
  post_id: string;
  text: string;
  image: string;
  likes: number;
  created_at: string;
  update_at: string;
  user_id: string;
}

export interface PostModel {
  post_id: string;
  text: string;
  image: string;
  likes: number;
  created_at: string;
  update_at: string;
  creator: {
    creator_id: string;
    creator_name: string;
  };
}

export interface PostDBWithCreatorName {
  post_id: string;
  text: string;
  image: string;
  likes: number;
  created_at: string;
  update_at: string;
  user_id: string;
  user_name: string;
}

export interface LikeDB {
  user_id: string;
  post_id: string;
  like: number;
}

export enum POST_LIKE {
  ALREADY_LIKED = "ALREADY LIKED ",
}

export class Post {
  constructor(
    private postId: string,
    private text: string,
    private image: string,
    private likes: number,
    private createdAt: string,
    private updateAt: string,
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

  public addLike = (): void => {
    this.likes++;
  };

  public removeLike = (): void => {
    this.likes--;
  };

  public getCreatedAt(): string {
    return this.createdAt;
  }
  public setCreatedAt(value: string): void {
    this.createdAt = value;
  }

  public getUpdateAt(): string {
    return this.updateAt;
  }
  public setUpdateAt(value: string): void {
    this.updateAt = value;
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
      update_at: this.updateAt,
      user_id: this.creatorId,
    };
  }

  public toBusinessModel(): PostModel {
    return {
      post_id: this.postId,
      text: this.text,
      image: this.image,
      likes: this.likes,
      created_at: this.createdAt,
      update_at: this.updateAt,
      creator: {
        creator_id: this.creatorId,
        creator_name: this.creatorName,
      },
    };
  }
}
