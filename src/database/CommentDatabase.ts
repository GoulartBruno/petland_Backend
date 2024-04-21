import { CommentDB, CommentDBWithCreatorName } from "../models/Comment";
import { BaseDatabase } from "./BaseDatabase";
import { PostDatabase } from "./PostDatabase";
import { UserDatabase } from "./UserDatabase";

export class CommentDatabase extends BaseDatabase {
  public static TABLE_COMMENTS = "comments";

  public insertComment = async (commentDB: CommentDB): Promise<void> => {
    await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).insert(
      commentDB
    );
  };

  public getCommentsWithCreatorName = async (): Promise<
    CommentDBWithCreatorName[]
  > => {
    const result = await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
      .select(
        `${CommentDatabase.TABLE_COMMENTS}.comment_id`,
        `${PostDatabase.TABLE_POSTS}.post_id`,
        `${CommentDatabase.TABLE_COMMENTS}.text`,
        `${CommentDatabase.TABLE_COMMENTS}.created_at`,
        `${PostDatabase.TABLE_POSTS}.user_id`,
        `${UserDatabase.TABLE_USERS}.user_name`
      )
      .join(
        `${PostDatabase.TABLE_POSTS}`,
        `${CommentDatabase.TABLE_COMMENTS}.post_id`,
        "=",
        `${PostDatabase.TABLE_POSTS}.post_id`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${PostDatabase.TABLE_POSTS}.user_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.user_id`
      );

    return result as CommentDBWithCreatorName[];
  };
}
