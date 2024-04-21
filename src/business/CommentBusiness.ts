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
import {
  EditCommentInputDTO,
  EditCommentOutputDTO,
} from "../dtos/comment/editComment.dto";
import { NotFoundError } from "../errors/NotFoundError";
import { ForbiddenError } from "../errors/ForbiddenError";

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
      text,
      new Date().toISOString(),
      payload.id,
      payload.user_name
    );

    const commentDB = comment.toDBModel();

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

  public editComment = async (
    input: EditCommentInputDTO
  ): Promise<EditCommentOutputDTO> => {
    const { text, token, idToEdit } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const commentDB = await this.commentDatabase.findCommentById(idToEdit);

    if (!commentDB) {
      throw new NotFoundError("Comment with this id does not exist.");
    }

    if (payload.id !== commentDB.user_id) {
      throw new ForbiddenError(
        "Only those who created the comment can edit it."
      );
    }

    const comment = new Comment(
      commentDB.comment_id,
      commentDB.post_id,
      commentDB.text,
      commentDB.created_at,
      payload.id,
      payload.user_name
    );

    comment.setText(text);

    const updateCommentDB = comment.toDBModel();
    await this.commentDatabase.updateComment(updateCommentDB);

    const output: EditCommentOutputDTO = undefined;

    return output;
  };
}
