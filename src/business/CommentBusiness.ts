import { CommentDatabase } from "../database/CommentDatabase";
import { Comment } from "../models/Comment";
import {
  CreateCommentInputDTO,
  CreateCommentOutputDTO,
} from "../dtos/comment/createComment.dto";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import {
  GetCommentInputDTO,
  GetCommentOutputDTO,
} from "../dtos/comment/getComment.dto";

export class CommentBusiness {
  constructor(
    private commentDatabase: CommentDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public createComment = async (
    input: CreateCommentInputDTO
  ): Promise<CreateCommentOutputDTO> => {
    const { post_id, text, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const id = this.idGenerator.generate();

    const comment = new Comment(
      id,
      post_id,
      payload.id,
      payload.user_name,
      text,
      new Date().toISOString()
    );

    const commentDB = comment.toCommentDBModel();

    await this.commentDatabase.insertComment(commentDB);

    const output: CreateCommentOutputDTO = undefined;
    return output;
  };

  public getComments = async (
    input: GetCommentInputDTO
  ): Promise<GetCommentOutputDTO> => {
    const { token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const commentsDBWithCreatorName =
      await this.commentDatabase.getCommentsWithCreatorName();
    const comments = commentsDBWithCreatorName.map(
      (commentsDBWithCreatorName) => {
        const post = new Comment(
          commentsDBWithCreatorName.comment_id,
          commentsDBWithCreatorName.post_id,
          commentsDBWithCreatorName.text,
          commentsDBWithCreatorName.created_at,
          commentsDBWithCreatorName.user_id,
          commentsDBWithCreatorName.user_name
        );
        return post.toBusinessModel();
      }
    );

    const output: GetCommentOutputDTO = comments;

    return output;
  };
}
