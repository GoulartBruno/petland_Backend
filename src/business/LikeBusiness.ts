import { LikeDatabase } from "../database/LikeDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class LikeBusiness {
  constructor(
    private likeDatabase: LikeDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}
}
