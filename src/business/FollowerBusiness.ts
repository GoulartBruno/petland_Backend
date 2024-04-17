import { FollowerDatabase } from "../database/FollowerDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class FollowerBusiness {
  constructor(
    private followerDatabase: FollowerDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}
}
