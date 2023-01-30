import RelationDatabaseService from "@services/rdb";
import { Inject } from "typedi";
import { EntityTarget, ObjectLiteral } from "typeorm";

/**
 * @description 모든 레포지토리의 base
 */
export default class BaseRepository {
  private rdbService: RelationDatabaseService;

  constructor(@Inject() rdbService: RelationDatabaseService) {
    this.rdbService = rdbService;
  }

  /**
   * @description 레포지토리 가져오기
   * @param target 엔티티(model) 객체
   */
  getRepository<T extends ObjectLiteral>(target: EntityTarget<T>) {
    return this.rdbService.getInstance().getRepository<T>(target);
  }
}
