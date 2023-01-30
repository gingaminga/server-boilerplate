import { ObjectLiteral, Repository, SelectQueryBuilder } from "typeorm";

export interface IRepository<T extends ObjectLiteral> {
  /**
   * @description 레포지토리 인스턴스 가져오기
   */
  getInstance(): Repository<T>;
  /**
   * @description 쿼리 빌더 가져오기
   * @param alias 별칭
   */
  getQueryBuilder(alias?: string): SelectQueryBuilder<T>;
}
