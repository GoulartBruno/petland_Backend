export interface FollowerDB {
  follower_id: string;
  user_id: string;
  followed_back: boolean;
}

export interface FollowerModel {
  followerId: string;
  userId: string;
  followedBack: boolean;
}

export class Follower {
  constructor(
    private followerId: string,
    private userId: string,
    private followedBack: boolean
  ) {}

  public getFollowerId(): string {
    return this.followerId;
  }
  public setFollowerId(value: string): void {
    this.followerId = value;
  }
  public getUserId(): string {
    return this.userId;
  }
  public setUserId(value: string): void {
    this.userId = value;
  }
  public getFollowedBack(): boolean {
    return this.followedBack;
  }
  public setFollowedBack(value: boolean): void {
    this.followedBack = value;
  }

  public toDBModel(): FollowerDB {
    return {
      follower_id: this.followerId,
      user_id: this.userId,
      followed_back: this.followedBack,
    };
  }

  public toBusinessModel(): FollowerModel {
    return {
      followerId: this.followerId,
      userId: this.userId,
      followedBack: this.followedBack,
    };
  }
}
