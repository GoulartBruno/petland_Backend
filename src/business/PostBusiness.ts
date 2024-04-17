import { PostDatabase } from "../database/PostDatabase";
import {
  CreatePostInputDTO,
  CreatePostOutputDTO,
} from "../dtos/post/createPost";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { Post } from "../models/Post";
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
}
