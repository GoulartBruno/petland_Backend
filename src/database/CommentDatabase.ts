import { CommentDB } from "../models/Comment";
import { BaseDatabase } from "./BaseDatabase";

export class CommentDatabase extends BaseDatabase {
  public static TABLE_COMMENTS = "comments";

  public insertComment = async (commentDB: CommentDB): Promise<void> => {
    await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).insert(
      commentDB
    );
  };
}
