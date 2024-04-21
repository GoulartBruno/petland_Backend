import { PostDatabase } from "../database/PostDatabase";
import { EditCommentOutputDTO } from "../dtos/comment/editComment.dto";
import {
  CreatePostInputDTO,
  CreatePostOutputDTO,
} from "../dtos/post/createPost";
import {
  DeletePostInputDTO,
  DeletePostOutputDTO,
} from "../dtos/post/deletePost.dto";
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/post/editPost.dto";
import { GetPostInputDTO, GetPostOutputDTO } from "../dtos/post/getPost.dto";
import { LikePostInputDTO, LikePostOutputDTO } from "../dtos/post/likePost.dto";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { LikeDB, POST_LIKE, Post } from "../models/Post";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public createPost = async (
    input: CreatePostInputDTO
  ): Promise<CreatePostOutputDTO> => {
    const { text, image, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const id = this.idGenerator.generate();

    const post = new Post(
      id,
      text,
      image,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
      payload.id,
      payload.user_name
    );

    const postDB = post.toDBModel();

    await this.postDatabase.insertPost(postDB);

    const output: CreatePostOutputDTO = undefined;
    return output;
  };

  public getPosts = async (
    input: GetPostInputDTO
  ): Promise<GetPostOutputDTO> => {
    const { token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const postsDBWithCreatorName =
      await this.postDatabase.getPostsWithCreatorName();
    const posts = postsDBWithCreatorName.map((postsDBWithCreatorName) => {
      const post = new Post(
        postsDBWithCreatorName.post_id,
        postsDBWithCreatorName.text,
        postsDBWithCreatorName.image,
        postsDBWithCreatorName.likes,
        postsDBWithCreatorName.created_at,
        postsDBWithCreatorName.update_at,
        postsDBWithCreatorName.user_id,
        postsDBWithCreatorName.user_name
      );
      return post.toBusinessModel();
    });

    const output: GetPostOutputDTO = posts;

    return output;
  };

  public editPost = async (
    input: EditPostInputDTO
  ): Promise<EditPostOutputDTO> => {
    const { text, token, idToEdit } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const postDB = await this.postDatabase.findPostById(idToEdit);

    if (!postDB) {
      throw new NotFoundError("Post with this id does not exist.");
    }

    if (payload.id !== postDB.user_id) {
      throw new ForbiddenError("Only those who created the post can edit it.");
    }

    const post = new Post(
      postDB.post_id,
      postDB.text,
      postDB.image,
      postDB.likes,
      postDB.created_at,
      postDB.update_at,
      postDB.user_id,
      payload.user_name
    );

    post.setText(text);

    const updatePostDB = post.toDBModel();
    await this.postDatabase.updatePost(updatePostDB);

    const output: EditPostOutputDTO = undefined;

    return output;
  };

  public deletePost = async (
    input: DeletePostInputDTO
  ): Promise<DeletePostOutputDTO> => {
    const { token, idToDelete } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const postDB = await this.postDatabase.findPostById(idToDelete);

    if (!postDB) {
      throw new NotFoundError("Post with this id does not exist.");
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      if (payload.id !== postDB.user_id) {
        throw new ForbiddenError(
          "Only those who created the post can edit it."
        );
      }
    }

    await this.postDatabase.deletePostById(idToDelete);

    const output: DeletePostOutputDTO = undefined;

    return output;
  };

  public likePost = async (
    input: LikePostInputDTO
  ): Promise<LikePostOutputDTO> => {
    const { postId, token, like } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const postDBwithCreatorName =
      await this.postDatabase.findPostWithCreatorNameById(postId);

    if (!postDBwithCreatorName) {
      throw new NotFoundError("Post with this id does not exist");
    }

    const likeDB: LikeDB = {
      user_id: payload.id,
      post_id: postId,
      like: like ? 1 : 0,
    };

    const likeExists = await this.postDatabase.findLike(likeDB);

    const post = new Post(
      postDBwithCreatorName.post_id,
      postDBwithCreatorName.text,
      postDBwithCreatorName.image,
      postDBwithCreatorName.likes,
      postDBwithCreatorName.created_at,
      postDBwithCreatorName.update_at,
      postDBwithCreatorName.user_id,
      postDBwithCreatorName.user_name
    );

    if (like) {
      post.addLike();
      await this.postDatabase.insertLike(likeDB);
    } else {
      post.removeLike();
      await this.postDatabase.removeLike(likeDB);
    }

    await this.postDatabase.updatePost(post.toDBModel());

    const output: LikePostOutputDTO = undefined;

    return output;
  };
}
