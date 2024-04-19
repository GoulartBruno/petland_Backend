import { PostDB, PostDBWithCreatorName } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostDatabase extends BaseDatabase {
  public static TABLE_POSTS = "posts";
  public static TABLE_LIKES = "likes";

  public insertPost = async (postDB: PostDB): Promise<void> => {
    await BaseDatabase.connection(PostDatabase.TABLE_POSTS).insert(postDB);
  };

  public getPostsWithCreatorName = async (): Promise<
    PostDBWithCreatorName[]
  > => {
    const result = await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
      .select(
        `${PostDatabase.TABLE_POSTS}.post_id`,
        `${PostDatabase.TABLE_POSTS}.text`,
        `${PostDatabase.TABLE_POSTS}.image`,
        `${PostDatabase.TABLE_POSTS}.likes`,
        `${PostDatabase.TABLE_POSTS}.created_at`,
        `${PostDatabase.TABLE_POSTS}.update_at`,
        `${PostDatabase.TABLE_POSTS}.user_id`,
        `${UserDatabase.TABLE_USERS}.user_name`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${PostDatabase.TABLE_POSTS}.user_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.user_id`
      );

    return result as PostDBWithCreatorName[];
  };

  public findPostById = async (
    post_id: string
  ): Promise<PostDB | undefined> => {
    const [result] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
      .select()
      .where({ post_id });

    return result as PostDB | undefined;
  };

  public updatePost = async (postDB: PostDB): Promise<void> => {
    await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
      .update(postDB)
      .where({ post_id: postDB.post_id });
  };

  public deletePostById = async (id: string): Promise<void> => {
    await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
      .delete()
      .where({ post_id: id });
  };
}
