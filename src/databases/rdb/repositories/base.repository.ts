import { relationDatabaseClient } from "@loaders/database.loader";
import CError from "@utils/error";
import { EntityTarget, ObjectLiteral } from "typeorm";

/**
 * @description 모든 레포지토리의 base
 */
export default class BaseRepository<T extends ObjectLiteral> {
  private target?: EntityTarget<T>;

  static get relationDatabaseClient() {
    return relationDatabaseClient;
  }

  /**
   * @description 쿼리 빌더 가져오기
   * @param alias 테이블 별칭
   * @returns 쿼리 빌더
   */
  getQueryBuilder(alias?: string) {
    return this.getRepository().createQueryBuilder(alias);
  }

  /**
   * @description 레포지토리 가져오기
   * @returns 레포지토리
   */
  getRepository() {
    if (!this.target) {
      throw new CError("Target is not exist.. :(");
    }

    return BaseRepository.relationDatabaseClient.getInstance().getRepository<T>(this.target);
  }

  /**
   * @description 엔티티 설정하기
   * @param target 엔티티
   */
  protected setTarget(target: EntityTarget<T>) {
    this.target = target;
  }
}
