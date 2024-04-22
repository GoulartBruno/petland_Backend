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
        `${CommentDatabase.TABLE_COMMENTS}.post_id`,
        `${CommentDatabase.TABLE_COMMENTS}.text`,
        `${CommentDatabase.TABLE_COMMENTS}.created_at`,
        `${CommentDatabase.TABLE_COMMENTS}.user_id`,
        `${UserDatabase.TABLE_USERS}.user_name`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${CommentDatabase.TABLE_COMMENTS}.user_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.user_id`
      );

    return result as CommentDBWithCreatorName[];
  };

  public findCommentById = async (
    comment_id: string
  ): Promise<CommentDB | undefined> => {
    const [result] = await BaseDatabase.connection(
      CommentDatabase.TABLE_COMMENTS
    )
      .select()
      .where({ comment_id });

    return result as CommentDB | undefined;
  };
  public updateComment = async (commentDB: CommentDB): Promise<void> => {
    await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
      .update(commentDB)
      .where({ comment_id: commentDB.comment_id });
  };
}
